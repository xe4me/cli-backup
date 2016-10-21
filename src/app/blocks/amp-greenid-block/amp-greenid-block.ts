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
                       <div class="grid__item_floated">
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

                            <amp-button [disabled]='!acceptTerms' (click)='onOk(1)' [class]="'btn btn-ok mt0'"
                                    [data-automation-id]='"abcd"'>
                                Continue
                            </amp-button>
                       </div>

                    </div>

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
    private scriptUrls : string[] =['//test2.edentiti.com/df/javascripts/greenidConfig.js','//test2.edentiti.com/df/javascripts/greenidui.min.js'];
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
    private acceptTerms        = false;

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

    }
}
