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
    ViewChild, Renderer, Input,
} from '@angular/core';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { ResponseObject } from '../amp-greenid-block/interfaces/responseObject';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DomAdapter } from '@angular/platform-browser/esm/src/dom/dom_adapter';
@Component( {
    selector   : 'amp-greenid-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    providers: [AmpGreenIdServices],
    changeDetection : ChangeDetectionStrategy.OnPush,
    template   : `
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
                         <amp-button [disabled]='!acceptTerms || isSubmitting' (click)='onContinue($event)' [class]=''btn btn-ok mt0''
                                    [data-automation-id]=''greenid_accept_terms''>
                                Continue
                            </amp-button>
                       </div>
                    </div>
                </div>
                <!--
                This probably should be an ajax request, for the sake of getting it out the door its a form instead.
                -->
                <form method='POST' action='{{formAction}}' id='theform' role='form' class='mb'>
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
                        <input name='dob' id='dob' class='form-control' [ngModel]='form.dateOfBirth2' aria-required='true'
                               type='text'>
                        <input id='email' name='email' class='form-control' [ngModel]='form.email' type='text'>
                    </div>
                    <input value='Submit details' style='display:none;' #btnSubmit id='btnSubmit' name='btnSubmit' class='btn btn-primary' type='submit'>
                </form>
                <div id='greenid-div'>
                </div>
    ` ,
    styles     : [ require( './amp-greenid-block.component.scss' ).toString() ] ,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , display : 'block' } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )

export class AmpGreenidBlockComponent implements OnInit, AfterContentInit {
    @Input() form; // form model input
    @Input() scriptUrls; // all the api urls that need to be imported, the js is loaded asnyc
    @Input() formAction; // The form action
    @ViewChild('btnSubmit') btnSubmit : ElementRef;
    private controlGroup : FormGroup = new FormGroup( {} );
    private loadApiScripts : Promise<any>;
    private acceptTerms  : boolean = false;
    private okAccepted   : boolean = false;
    private isSubmitting : boolean = false;
    private domAdapter : DomAdapter;
    private greenIdShowing : boolean = false;

    // TODO pass this in from an external source, as an example another component
    private greenIdSettings = {
        environment: 'test',
        formId: 'theform',
        frameId: 'greenid-div',
        country: 'usethiscountry',
        debug: false,
        sessionCompleteCallback: this.onSessionComplete,
    };

    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private _AmpGreenIdServices : AmpGreenIdServices,
                  private fb : FormBuilder,
                  private _cd : ChangeDetectorRef,
                  private _render : Renderer) {

    }
    /**
     * Get the array of greenid scripts that we need to submit with the model
     */
    ngOnInit() : any {

        this.greenIdShowing = true;
        if (this.scriptUrls) {
            for (let stringUrl of this.scriptUrls) {
                this.loadAllScripts(stringUrl);
            }
        }

        this.controlGroup = new FormGroup({
          verificationId : new FormControl('verificationId', null),
          verificationToken : new FormControl('verificationToken', null)
        });

        this._cd.detectChanges();
    }
    /**
     * Once we have the scripts loaded, we need to init the green id stuff, set it up
     */
    ngAfterContentInit() : void {

        setTimeout(() => {
            if (window['greenidUI']) {
                window['greenidUI'].setup(this.greenIdSettings);
            }
        }, 1000);

    }
    /**
     * Load all of the scripts async
     */
    private loadAllScripts (stringUrl : string) : void {
        this.loadApiScripts = new Promise((resolve) => {
            this.loadScript(stringUrl);
        });
    }
    /**
     * Create the element in the DOM
     */
    private loadScript(urlString : string) : void  {
        let node = document.createElement('script');
        node.src = urlString;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    /**
     * Trigger terms and conditions
     */
    private onAcknowledgeSelect ( value : boolean ) : void {
        this.acceptTerms = value;
    }

    /**
     * Call the service and then update the model with the new token and verfication id
     * trigger the form submission as we have a form in the template
     */
    private onContinue( value : Event ) : void {
        let event = new MouseEvent('click', {bubbles: true});

        this.isSubmitting = true;
        this._AmpGreenIdServices
            .getTheToken(this.form)
            .subscribe( ( respo ) => {
               this.isSubmitting = false;
               if (respo) {
                 this.updateModel(respo.payload);
                 this._render.invokeElementMethod(this.btnSubmit.nativeElement, 'dispatchEvent', [event]);
               }
               this._cd.markForCheck();
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

    private onSessionComplete() : void {
        console.log('onSessionComplete');
    }
}
