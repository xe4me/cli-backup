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
let greenIdLoaded = false;
@Component({
    selector: 'amp-greenid-block',
    host: {
        '[@slideUp]': 'slideUp'
    },
    providers: [AmpGreenIdServices],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
                <div class='grid__container 1/1 palm-1/1' *ngIf='greenIdShowing'>
                    <div class='grid__item_floated utils__align&#45;&#45;left' >
                                <ng-content></ng-content>
                       <div class='grid__item_floated mh mv'>
                            <amp-checkbox
                                [isInSummaryState]='isInSummaryState'
                                [controlGroup]='greenIdControlGroup'
                                [required]='acknowledge.required'
                                [checked]='acknowledge.checked'
                                [disabled]='acknowledge.disabled'
                                [scrollOutOn]='acknowledge.scrollOutOn'
                                [id]='acknowledge.id'
                                (select)='onAcknowledgeSelect($event)'>
                                {{ checkboxLabel }}
                            </amp-checkbox>

                       </div>
                       <div class='grid__item_floated mh mv'>
                         <amp-button [disabled]='!acceptTerms || isSubmitting' (click)='onContinue($event)' class='btn btn-ok mt0'>
                                Continue
                         </amp-button>
                       </div>
                    </div>
                </div>
                <link *ngIf="styleUrl" type="text/css" media="screen" rel="stylesheet" [href]="styleUrl">
                <div id='greenid-div'>
                </div>
    ` ,
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
export class AmpGreenidBlockComponent implements OnInit, AfterContentInit, OnDestroy {
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
    private acceptTerms : boolean = false;
    private okAccepted : boolean = false;
    private isSubmitting : boolean = false;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = false;
    private userRegistered : boolean = false;

    private greenIdSettings;

    private greenIdCredentials = {
        accountId: 'amp_au',
        password: '69h-xEt-PSW-vGn'
    };

    private acknowledge = {
        id: 'acknowledge',
        disabled: false,
        required: true,
        checked: false,
        scrollOutOn: null
    };

    constructor(
        private _AmpGreenIdServices : AmpGreenIdServices,
        private fb : FormBuilder,
        private _cd : ChangeDetectorRef,
        private _render : Renderer,
        private sanitizer : DomSanitizationService) {
    }

    /**
     * Update the model with the verification ID
     */
    public onSessionComplete = (token : string, verificationStatus : string) => {
        (<FormControl> this.greenIdControlGroup.controls['verificationStatus']).setValue(verificationStatus);
        this._cd.markForCheck();
    }

    public createGreenIdControlGroup() {
        return new FormGroup({
            verificationId: new FormControl(null, Validators.required),
            verificationToken: new FormControl(null, Validators.required),
            verificationStatus: new FormControl(null, Validators.required),
        });
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
        this.greenIdShowing = true;
        this.loadApiScripts = new Promise<boolean>((resolve, reject) => {
            if (greenIdLoaded) {
                resolve();
                return;
            }

            if (!greenIdLoaded && this.configScriptUrl && this.uiScriptUrl) {
                this.getScript(this.configScriptUrl)
                    .then(() => this.getScript(this.uiScriptUrl))
                    .then(() => {
                        greenIdLoaded = true;
                        resolve();
                    });
                return;
            }
            reject('Script urls were not provided');
        });
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

        this._cd.detectChanges();
    }

    public ngOnDestroy() {
        if (!this.keepControl && this.controlGroup && this.id) {
            this.controlGroup.removeControl(this.id);
        }
    }
    /**
     * Once we have the scripts loaded, we need to init the green id stuff, set it up
     */
    public ngAfterContentInit() : void {
        this.loadApiScripts.then(() => {
            this.setupGreenId();
        });
    }

    private setupGreenId() : void {
        if (window['greenidUI'] && window['greenidConfig']) {
            let options = Object.assign(this.greenIdSettings, {
                sessionCompleteCallback: this.onSessionComplete
            });
            window['greenidConfig'].setOverrides({"enable_save_and_complete_later" : false});
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
     * Trigger terms and conditions
     */
    private onAcknowledgeSelect(value : boolean) : void {
        this.acceptTerms = value;
    }

    /**
     * Call the service and then update the model with the new token and verfication id
     */
    private onContinue(value : Event) : void {
        this.isSubmitting = true;
        this._AmpGreenIdServices
            .getTheToken(this.form)
            .subscribe((respo) => {
                this.isSubmitting = false;
                if (respo) {
                    this.userRegistered = true;
                    this.updateModel(respo.payload);
                    this._cd.markForCheck();
                    this.showGreenId(respo.payload.verificationToken);
                }
            });
    }
    /**
     * Update the value in the form model with the response from the API
     */
    private updateModel(respo : ResponseObject) : void {
        if (respo.hasOwnProperty('verificationId') || respo.hasOwnProperty('verificationToken')) {
            (<FormControl> this.greenIdControlGroup.controls['verificationId']).setValue(respo.verificationId);
            (<FormControl> this.greenIdControlGroup.controls['verificationToken']).setValue(respo.verificationToken);
            this.greenIdShowing = false; // hide the orginal block content
        }
    }
}
