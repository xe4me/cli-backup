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
export class AmpGreenidBlockComponent implements OnInit, OnDestroy {
    @Input() id : string = 'green-id-identity-check';
    @Input() form : IGreenIdFormModel; // form model input
    @Input() configScriptUrl; // all the api urls that need to be imported, the js is loaded asnyc
    @Input() uiScriptUrl;
    @Input() styleUrl;
    @Input() keepControl = false;
    @Input() controlGroup : FormGroup;
    @Input() environment : string = 'test';
    @Input() checkboxLabel : string;
    private greenIdControlGroup : FormGroup;
    private loadApiScripts : Promise<any>;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = false;
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

    /**
     * Get the array of greenid scripts that we need to submit with the model
     */
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
                        this.showGreenId(response.payload.verificationToken);
                        this._cd.markForCheck();
                    }
                }
            );
        });
        this.greenIdShowing = true;
    }

    public createControls() {
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
    }

    public ngOnDestroy() {
        if (!this.keepControl && this.controlGroup && this.id) {
            this.controlGroup.removeControl(this.id);
        }
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
        (<FormControl> this.greenIdControlGroup.controls['verificationStatus']).setValue(verificationStatus);
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
        if (window['greenidUI'] && window['greenidConfig']) {
            let options = Object.assign(this.greenIdSettings, {
                sessionCompleteCallback: this.onSessionComplete
            });
            window['greenidConfig'].setOverrides({'enable_save_and_complete_later' : false});
            window['greenidUI'].setup(options);
        }
    }

    private showGreenId(verificationToken : string) : void {
        if (window['greenidUI']) {
            window['greenidUI'].show(this.greenIdCredentials.accountId, this.greenIdCredentials.password, verificationToken);
        }
    }

    /**
     * Load all of the scripts async
     */
    private getScript(stringUrl : string) : Promise<string> {
        return new Promise((resolve) => {
            this.loadScript(stringUrl).onload = () => {
                resolve(stringUrl);
            };
        });
    }

    /**
     * Create the element in the DOM
     */
    private loadScript(urlString : string) : HTMLScriptElement {
        let node = document.createElement('script');
        node.src = urlString;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
        return node;
    }

    /**
     * Update the value in the form model with the response from the API
     */
    private updateModel(respo : ResponseObject) : void {
        if (respo.hasOwnProperty('verificationId') || respo.hasOwnProperty('verificationToken')) {
            (<FormControl> this.greenIdControlGroup.controls['verificationId']).setValue(respo.verificationId);
            (<FormControl> this.greenIdControlGroup.controls['verificationToken']).setValue(respo.verificationToken);
        }
    }
}
