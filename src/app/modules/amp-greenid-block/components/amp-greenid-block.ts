import {
    Component,
    trigger,
    state,
    style,
    animate,
    transition,
    OnInit,
    AfterContentInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    Renderer,
    Input,
    OnDestroy
} from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { AmpGreenIdServices } from './services/amp-greenid-service';
import { ResponseObject } from './interfaces/responseObject';
import { IGreenIdFormModel } from './interfaces/formModel';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators
} from '@angular/forms';
import { DomAdapter } from '@angular/platform-browser/esm/src/dom/dom_adapter';
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
    ]
})
export class AmpGreenIdBlockComponent implements OnInit, OnDestroy {
    @Input() id : string = 'green-id-identity-check';
    @Input() form : IGreenIdFormModel; // form model input
    @Input() configScriptUrl; // all the api urls that need to be imported, the js is loaded asnyc
    @Input() uiScriptUrl;
    @Input() styleUrl;
    @Input() keepControl = false;
    @Input() controlGroup : FormGroup;
    @Input() environment : string = 'test';
    @Input() checkboxLabel : string;
    @Input() showOnReady = false;
    private greenIdControlGroup : FormGroup;
    private loadApiScripts : Promise<any>;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = true;
    private greenIdSettings : any;

    private greenIdCredentials = {
        accountId: 'amp_au',
        password: '69h-xEt-PSW-vGn'
    };

    constructor(
        private AmpGreenIdServices : AmpGreenIdServices,
        private fb : FormBuilder,
        private _cd : ChangeDetectorRef,
        private _render : Renderer,
        private sanitizer : DomSanitizationService) {
    }

    public getGreenIdControlGroup() : FormGroup {
        return this.greenIdControlGroup;
    }

    public get getVerificationStatusControl() : FormControl {
        return <FormControl> this.greenIdControlGroup.controls['verificationStatus'];
    }

    public ngOnInit() : any {
        this.greenIdSettings = {
            environment: this.environment,
            frameId: 'greenid-div',
            enableBackButtonWarning: false
        };
        if (this.styleUrl) {
            this.styleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.styleUrl);
        }
        this.createControls();
        this.loadApiScripts = new Promise<any>(this.loadApiScriptsHandler).then(() => {
            this.setupGreenId();
            this.AmpGreenIdServices
                .getTheToken(this.form)
                .subscribe((response) => {
                        if (response) {
                            this.updateModel(response.payload);
                            if (this.showOnReady) {
                                this.showGreenId();
                            }
                        }
                    }
                );
        });
    }

    public ngOnDestroy() {
        if (!this.keepControl && this.controlGroup && this.id) {
            this.controlGroup.removeControl(this.id);
        }
    }

    public showGreenId() : void {
        const verificationToken = this.greenIdControlGroup.controls['verificationToken'];
        if (verificationToken.value) {
            this.showGreenIdInternal();
        } else {
            let changes = verificationToken.valueChanges.subscribe(() => {
                this.showGreenIdInternal();
                changes.unsubscribe();
            });
        }
    }

    private createControls() {
        if (this.controlGroup) {
            if (this.controlGroup.contains(this.id)) {
                this.greenIdControlGroup = <FormGroup> this.controlGroup.get(this.id);
            } else {
                this.greenIdControlGroup = this.createGreenIdControlGroup();
                this.controlGroup.addControl(this.id, this.greenIdControlGroup);
            }
        } else {
            this.greenIdControlGroup = this.createGreenIdControlGroup();
        }
        this.greenIdControlGroup.markAsTouched();
    }

    private showGreenIdInternal() {
        window['greenidUI'].show(this.greenIdCredentials.accountId, this.greenIdCredentials.password, this.greenIdControlGroup.controls['verificationToken'].value);
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

    /**
     * Update the model with the verification ID
     */
    private onSessionComplete = (token : string, verificationStatus : string) => {
        this.greenIdControlGroup.controls['verificationStatus'].setValue(verificationStatus);
        this.greenIdShowing = false;
        this._cd.markForCheck();
    }

    private createGreenIdControlGroup() {
        return new FormGroup({
            verificationId: new FormControl(null, Validators.required),
            verificationToken: new FormControl(null, Validators.required),
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
        window['greenidConfig'].setOverrides({'enable_save_and_complete_later' : false});
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
        this.greenIdControlGroup.controls['verificationId'].setValue(response.verificationId);
        this.greenIdControlGroup.controls['verificationToken'].setValue(response.verificationToken);
    }
}
