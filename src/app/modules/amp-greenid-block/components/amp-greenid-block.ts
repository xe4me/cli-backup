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
} from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { AmpGreenIdServices } from '../components/services/amp-greenid-service';
import { ResponseObject } from '../components/interfaces/responseObject';
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
                                [controlGroup]='controlGroup'
                                [required]='acknowledge.required'
                                [checked]='acknowledge.checked'
                                [disabled]='acknowledge.disabled'
                                [scrollOutOn]='acknowledge.scrollOutOn'
                                [id]='acknowledge.id'
                                (select)='onAcknowledgeSelect($event)'>
                            </amp-checkbox>

                       </div>
                       <div class='grid__item_floated mh mv'>
                         <amp-button [disabled]='!acceptTerms || isSubmitting' (click)='onContinue($event)' class='btn btn-ok mt0'>
                                Continue
                         </amp-button>
                       </div>
                    </div>
                </div>
                <!--
                This should be an ajax request, for the sake of getting it out the door its a form instead.
                -->
                <form method='GET' action='' id='theform' role='form' class='mb'>
                    <div style='display: none;'>
                        <input id='accountId' value='amp_au' name='accountId' type='hidden'>
                        <input id='apiCode' value='69h-xEt-PSW-vGn' name='apiCode' type='hidden'>
                        <input id='usethiscountry' value='AU' name='country' type='hidden'>
                        <input id='givenNames' name='givenNames' [ngModel]='form.firstName' class='form-control'
                               type='text'>
                        <input id='middleNames' name='middleNames' [ngModel]='form.middleNames' class='form-control'
                               type='text'>
                        <input type='text' id='surname' name='surname' [ngModel]='form.lastName'
                               class='form-control'/>
                        <input id='flatNumber' name='flatNumber' [ngModel]='form.address.flatNumber' class='form-control'
                               type='text'>
                        <input id='streetNumber' name='streetNumber' [ngModel]='form.address.streetNumber'
                               class='form-control' type='text'>
                        <input id='streetName' name='streetName' [ngModel]='form.address.streetName' class='form-control'
                               type='text'>
                        <input id='streetType' name='streetType' [ngModel]='form.address.streetType' class='form-control'
                               type='text'>
                        <input id='suburb' name='suburb' [ngModel]='form.address.streetType' class='form-control' type='text'>
                        <input id='state' name='state' [ngModel]='form.address.state' class='form-control' type='text'>
                        <input id='postcode' name='postcode' [ngModel]='form.address.postcode' class='form-control'
                               type='text'>
                        <input name='dob' id='dob' class='form-control' [ngModel]='form.dateOfBirth' aria-required='true'
                               type='text'>
                        <input id='email' name='email' class='form-control' [ngModel]='form.email' type='text'>
                    </div>
                    <input value='Submit details' style='display:none;' #btnSubmit id='btnSubmit' name='btnSubmit' class='btn btn-primary' type='submit'>
                </form>
                <link *ngIf="styleUrl" type="text/css" rel="stylesheet" [href]="styleUrl">
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
export class AmpGreenidBlockComponent implements OnInit, AfterContentInit {
    @Input() form; // form model input
    @Input() configScriptUrl; // all the api urls that need to be imported, the js is loaded asnyc
    @Input() uiScriptUrl;
    @Input() styleUrl;
    @ViewChild('btnSubmit') btnSubmit : ElementRef;
    private controlGroup : FormGroup = new FormGroup({});
    private loadApiScripts : Promise<any>;
    private acceptTerms : boolean = false;
    private okAccepted : boolean = false;
    private isSubmitting : boolean = false;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = false;

    // TODO pass this in from an external source, as an example another component
    // TODO pass in api code and password from an external source
    private greenIdSettings = {
        environment: 'test',
        formId: 'theform',
        frameId: 'greenid-div',
        country: 'usethiscountry',
        debug: false,
        sessionCompleteCallback: this.onSessionComplete
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
    public onSessionComplete(token : string, verificationStatus : any) : void {
        if (verificationStatus instanceof String) {
            (<FormControl> this.controlGroup.controls['verificationStatus']).setValue(verificationStatus);
        }
    }

    /**
     * Get the array of greenid scripts that we need to submit with the model
     */
    public ngOnInit() : any {
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

        this.controlGroup = new FormGroup({
            verificationId: new FormControl('verificationId', Validators.required),
            verificationToken: new FormControl('verificationToken', Validators.required),
            verificationStatus: new FormControl('verificationStatus', Validators.required),
        });

        this._cd.detectChanges();
    }
    /**
     * Once we have the scripts loaded, we need to init the green id stuff, set it up
     */
    public ngAfterContentInit() : void {
        this.loadApiScripts.then(() => {
            if (window['greenidUI']) {
                window['greenidUI'].setup(this.greenIdSettings);
            }
        });
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
     * trigger the form submission as we have a form in the template
     */
    private onContinue(value : Event) : void {
        let event = new MouseEvent('click', { bubbles: true });
        this.isSubmitting = true;
        this._AmpGreenIdServices
            .getTheToken(this.form)
            .subscribe((respo) => {
                this.isSubmitting = false;
                if (respo) {
                    this.updateModel(respo.payload);
                    this._cd.markForCheck();
                    this._render.invokeElementMethod(this.btnSubmit.nativeElement, 'dispatchEvent', [event]);
                }

            });
    }
    /**
     * Update the value in the form model with the response from the API
     */
    private updateModel(respo : ResponseObject) : void {
        if (respo.hasOwnProperty('verificationId') || respo.hasOwnProperty('verificationToken')) {
            (<FormControl> this.controlGroup.controls['verificationId']).setValue(respo.verificationId);
            (<FormControl> this.controlGroup.controls['verificationToken']).setValue(respo.verificationToken);
            this.greenIdShowing = false; // hide the orginal block content
        }
    }

}
