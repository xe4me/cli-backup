import {
    Component,
    trigger,
    state,
    style,
    animate,
    transition,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Renderer,
    Input,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    SafeResourceUrl,
    DomSanitizationService
} from '@angular/platform-browser';
import { DomAdapter } from '@angular/platform-browser/esm/src/dom/dom_adapter';
import { Environments } from '../../../../../';
import { AmpGreenIdServices } from './services/amp-greenid-service';
import { ResponseObject } from './interfaces/responseObject';
import { IGreenIdFormModel } from './interfaces/formModel';

@Component({
    selector: 'amp-greenid-block',
    host: {
        '[@slideUp]': 'slideUp'
    },
    providers: [AmpGreenIdServices],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template : require( './amp-greenid-block.html' ),
    styles: [require('./amp-greenid-block.component.scss').toString()],
    animations: [
        trigger(
            'slideUp',
            [
                state('collapsed, void', style({ height: '0px', opacity: '0', display: 'none' })),
                state('expanded', style({ height: '*', opacity: '1', display: 'block' })),
                transition(
                    'collapsed <=> expanded', [animate(800)])
            ])
    ],
    encapsulation : ViewEncapsulation.None
})
export class AmpGreenIdBlockComponent implements OnInit, OnDestroy {
    public static verificationStatuses = {
        VERIFIED: 'VERIFIED',
        VERIFIED_WITH_CHANGES: 'VERIFIED_WITH_CHANGES',
        VERIFIED_ADMIN: 'VERIFIED_ADMIN',
        IN_PROGRESS: 'IN_PROGRESS',
        PENDING: 'PENDING',
        LOCKED_OUT: 'LOCKED_OUT'
    };

    @Input() id : string = 'green-id-identity-check';
    @Input() form : IGreenIdFormModel; // form model input
    @Input() keepControl : boolean = false;
    @Input() controlGroup : FormGroup;
    @Input() checkboxLabel : string;
    @Input() showOnReady = false;
    private greenIdControlGroup : FormGroup;
    private loadApiScripts : Promise<any>;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = true;
    private greenIdSettings : any;
    private configScriptUrl : string = Environments.property.GreenId.configScriptUrl;
    private uiScriptUrl : string = Environments.property.GreenId.uiScriptUrl;
    private styleUrl : string = Environments.property.GreenId.styleUrl;
    private safeStyleUrl : SafeResourceUrl;
    private environment : string = Environments.property.GreenId.environment;
    private accountId : string = Environments.property.GreenId.accountId;
    private password : string = Environments.property.GreenId.password;
    private termsAndConditionsText : string = `
        By accepting these terms and conditions you give consent for AMP Bank to disclose your name, residential
        address and date of birth to a credit reporting agency and ask the credit reporting agency to provide an
        assessment of whether the personal information so provided matches (in whole or in part) personal information
        contained in a credit information file in the possession or control of the credit reporting agency to assist in
        verifying your identity for the purposes of the Anti-Money Laundering and Counter-Terrorism Act 2006. The
        credit reporting agency may prepare and provide AMP Bank with such an assessment and may use your personal
        information including the names, residential addresses and dates of birth contained in credit information files
        of you and other individuals for the purposes of preparing such an assessment. If you disagree with having your
        identity verified by a credit reporting agency, please select another data source or contact AMP Bank so that
        we can discuss other options with you.
    `;

    constructor(
        private ampGreenIdServices : AmpGreenIdServices,
        private fb : FormBuilder,
        private _cd : ChangeDetectorRef,
        private _render : Renderer,
        private sanitizer : DomSanitizationService) {
    }

    public getGreenIdControlGroup() : FormGroup {
        return this.greenIdControlGroup;
    }

    public getVerificationStatusControl() : FormControl {
        return <FormControl> this.verificationStatusControl;
    }

    public ngOnInit() : any {
        this.greenIdSettings = {
            environment: this.environment,
            frameId: 'greenid-div',
            enableBackButtonWarning: false
        };

        if (this.styleUrl) {
            this.safeStyleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.styleUrl);
        }

        this.createControls();

        if (this.isVerificationRequired) {
            this.loadApiScripts = new Promise<any>(this.loadApiScriptsHandler).then(() => {
                this.setupGreenId();
                if (!this.isAlreadyRegistered) {
                    this.registerUser()
                        .subscribe((response) => {
                            if (response) {
                                this.updateModel(response.payload);

                                if (this.showOnReady) {
                                    this.showGreenId();
                                }
                            }
                        });
                }
            });
        }
    }

    public ngOnDestroy() {
        if (!this.keepControl && this.controlGroup && this.id) {
            this.controlGroup.removeControl(this.id);
        }
    }

    public showGreenId() : void {
        this.getToken()
            .subscribe((response) => {
                if (response) {
                    const verificationToken = response.payload.verificationToken;

                    if (verificationToken) {
                        this.showGreenIdInternal(verificationToken);
                    } else {
                        // TODO: Some error handling
                        // GitLab Issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/6
                    }
                }
            });
    }

    private get verificationStatusControl() : FormControl {
        return <FormControl> this.greenIdControlGroup.controls['verificationStatus'];
    }

    private get verificationIdControl() : FormControl {
        return <FormControl> this.greenIdControlGroup.controls['verificationId'];
    }

    private get isVerificationRequired() : boolean {
        const verificationStatus = this.verificationStatusControl;

        return !verificationStatus.value ||
            verificationStatus.value === AmpGreenIdBlockComponent.verificationStatuses.PENDING;
    }

    private get isAlreadyRegistered() : boolean {
        return !!this.verificationIdControl.value;
    }

    private createControls() {
        if (this.controlGroup) {
            if (this.controlGroup.contains(this.id)) {
                this.greenIdControlGroup = <FormGroup> this.controlGroup.get(this.id);
                this.revalidateControlGroup(this.greenIdControlGroup);
            } else {
                this.greenIdControlGroup = this.createGreenIdControlGroup();
                this.controlGroup.addControl(this.id, this.greenIdControlGroup);
            }
        } else {
            this.greenIdControlGroup = this.createGreenIdControlGroup();
        }
        this.greenIdControlGroup.markAsTouched();
    }

    private revalidateControlGroup( controlGroup : FormGroup ) {
        Object.keys(controlGroup.controls).map( (key) => {
            let control = controlGroup.controls[key];
            control.setValidators(Validators.required);
            control.updateValueAndValidity({onlySelf: false});
        });
    }

    private registerUser() {
        return this.ampGreenIdServices
            .registerUser(this.form);
    }

    private getToken() {
        return this.ampGreenIdServices
            .getToken(this.verificationIdControl.value);
    }

    private showGreenIdInternal(verificationToken : string) {
        window['greenidUI'].show(this.accountId, this.password, verificationToken);
    }

    private loadApiScriptsHandler = (resolve, reject) => {
        if (this.greenIdLoaded) {
            resolve();
            return;
        }
        if (!this.greenIdLoaded && this.configScriptUrl && this.uiScriptUrl) {
            this.getScript(this.configScriptUrl)
                .then(() => this.getScript(this.uiScriptUrl))
                .then(() => {
                    resolve();
                });
            return;
        }
        reject('Script urls were not provided');
    };

    private onSessionComplete = (token : string, verificationStatus : string) => {
        this.getVerificationStatusControl().setValue(verificationStatus);
        this.greenIdShowing = false;
        this._cd.markForCheck();
    };

    private createGreenIdControlGroup() {
        return new FormGroup({
            verificationId: new FormControl(null, Validators.required),
            verificationStatus: new FormControl(null, Validators.required),
        });
    }

    private get greenIdLoaded() {
        return window['greenidUI'] && window['greenidConfig'];
    }

    private setupGreenId() : void {
        let options = Object.assign(this.greenIdSettings, {
            sessionCompleteCallback: this.onSessionComplete
        });
        window['greenidConfig'].setOverrides({
            'enable_save_and_complete_later' : false,
            'dnb_tandc_text'                 : this.termsAndConditionsText
        });
        window['greenidUI'].setup(options);
    }

    private getScript(stringUrl : string) : Promise<string> {
        return new Promise((resolve) => {
            this.loadScript(stringUrl).onload = () => {
                resolve(stringUrl);
            };
        });
    }

    private loadScript(urlString : string) : HTMLScriptElement {
        let node = document.createElement('script');
        node.src = urlString;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
        return node;
    }

    private updateModel(response : ResponseObject) : void {
        this.verificationIdControl.setValue(response.verificationId);
    }
}
