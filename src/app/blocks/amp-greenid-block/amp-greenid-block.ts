import {
    Component ,
    trigger ,
    state ,
    style ,
    animate ,
    transition,
    OnInit,
    AfterContentInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy ,
} from '@angular/core';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { FormControl , FormGroup, FormBuilder } from '@angular/forms';
@Component( {
    selector   : 'amp-greenid-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    providers: [AmpGreenIdServices],
    changeDetection : ChangeDetectionStrategy.OnPush,
    template   : `
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align&#45;&#45;left' >
                                <ng-content></ng-content>
                       <div class="grid__item_floated mb">
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
                       <div class="grid__item_floated">
                         <amp-button [disabled]='!acceptTerms || isSubmitting' (click)='onContinue($event)' [class]="'btn btn-ok mt0'"
                                    [data-automation-id]='"abcd"'>
                                Continue
                            </amp-button>
                       </div>
                    </div>

                </div>
                <form method="POST" action="{{formAction}}" id="theform" role="form">
                    <div style="display: none;">
                        <input id="accountId" value="amp_au" name="accountId" type="hidden">
                        <input id="apiCode" value="69h-xEt-PSW-vGn" name="apiCode" type="hidden">
                        <input id="usethiscountry" value="AU" name="country" type="hidden">
                        <input id="givenNames" name="givenNames" [ngModel]="modelValue.firstName" class="form-control"
                               type="text">
                        <input id="middleNames" name="middleNames" [ngModel]="modelValue.middleNames" class="form-control"
                               type="text">
                        <input type="text" id="surname" name="surname" [ngModel]="modelValue.lastName"
                               class="form-control"/>
                        <input id="flatNumber" name="flatNumber" [ngModel]="modelValue.address.flatNumber" class="form-control"
                               type="text">
                        <input id="streetNumber" name="streetNumber" [ngModel]="modelValue.address.streetNumber"
                               class="form-control" type="text">
                        <input id="streetName" name="streetName" [ngModel]="modelValue.address.streetName" class="form-control"
                               type="text">
                        <input id="streetType" name="streetType" [ngModel]="modelValue.address.streetType" class="form-control"
                               type="text">
                        <input id="suburb" name="suburb" [ngModel]="modelValue.address.streetType" class="form-control" type="text">
                        <input id="state" name="state" [ngModel]="modelValue.address.state" class="form-control" type="text">
                        <input id="postcode" name="postcode" [ngModel]="modelValue.address.postcode" class="form-control"
                               type="text">
                        <input name="dob" id="dob" class="form-control" [ngModel]="modelValue.dateOfBirth2" aria-required="true"
                               type="text">
                        <input id="email" name="email" class="form-control" [ngModel]="modelValue.email" type="text">
                    </div>
                    <input value="Submit details" id="submitbob" name="submitbob" class="btn btn-primary" type="submit">
                </form>
                <div id="greenid-div">
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

    private controlGroup : FormGroup = new FormGroup( {} );
    private loadApiScripts : Promise<any>;
    private scriptUrls   : string[] =['//test2.edentiti.com/df/javascripts/greenidConfig.js','//test2.edentiti.com/df/javascripts/greenidui.min.js'];
    private formAction   : string  = '/verification/simpleui-finish.seam';
    private acceptTerms  : boolean = false;
    private okAccepted   : boolean = false;
    private isSubmitting : boolean = false;
    private greenIdSettings = {
        environment: 'test',
        formId: "theform",
        frameId: "greenid-div",
        country: "usethiscountry",
        debug: false
    };
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    private modelValue = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        honorific: 'Mr',
        dateOfBirth2: '27/11/2013',
        dateOfBirth:  '2001-04-12',
        email: 'sample@test.com',
        verificationId: "1FDW6whT1",
        verificationToken: '75b7ad90aac03bb7295f67c1044de1040d365b34',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
        }
    };

    constructor ( private _AmpGreenIdServices : AmpGreenIdServices,
                  private fb : FormBuilder,
                  private _cd : ChangeDetectorRef) {

    }
    /**
     * Get the array of greenid scripts that we need to submit with the model
     */
    ngOnInit() : any {

        if (this.scriptUrls) {
            for (var stringUrl of this.scriptUrls) {
                this.loadAllScripts(stringUrl);
            }
        }

        this.controlGroup = new FormGroup({
          verificationId : new FormControl('verificationId',null),
          verificationToken : new FormControl('verificationToken',null),
          verificationToken : new FormControl('verificationToken',null),
        });

        this._cd.detectChanges();
    }
    /**
     * Once we have the scripts loaded, we need to init the green id stuff, set it up
     */
    ngAfterContentInit() : void {

        setTimeout(() => {
            if (window.greenidUI) {
                greenidUI.setup(this.greenIdSettings);
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

    private onAcknowledgeSelect ( value ) {
        this.acceptTerms = value;
       if (value) {

       }
    }

    private onContinue( value ) {
        this.isSubmitting = true;
        this._AmpGreenIdServices
            .getTheToken(this.modelValue)
            .subscribe( ( respo ) => {
                this.isSubmitting = false;
                this._cd.markForCheck();

                console.log(respo.payload);
                (<FormControl>this.controlGroup.controls['verificationId']).updateValue(respo.payload);
            });
    }

}
