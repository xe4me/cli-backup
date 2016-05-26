import { FormBlock , provideParent } from '../../../formBlock';
import { ThemeIDDirective } from '../../../../directives/themeId.directive';
import { Component , OnInit , ElementRef , ViewEncapsulation } from 'angular2/core';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract
} from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector      : 'confirmation-block' ,
    template      : `
            <div *ngIf='showConfirmationBlock' class='confirmation-block mb-80' id='confirmation-block'>
                <div class='confirmation-block--logo mb-60' ampLicenseeThemeID></div>
                <div class='grid__item 1/6'></div>
                <section class='grid__item 2/3'>
                    <div class='heading heading-contxtual-label'>
                        Thank you, your request has been submitted.
                    </div>
                    <h3 class='heading heading-intro mt-30'>Like more information?</h3>
                    <div *ngIf='isAMPFPP' class='heading heading-micro-intro mt-35 mb-10'>
                        You can find more details on extending your notice period and / or withdrawing your notification in the AMP Financial Planning Buyer of last resort policy
                    </div>
                    <div *ngIf='isHILLROSS' class='heading heading-micro-intro mt-35 mb-10'>
                        You can find more details on extending your notice period and / or withdrawing your notification in the Hillross Buyback booklet.<br>
                        If you have any questions, please speak to your partnership manager.
                    </div>
                    <div class='heading heading-micro-intro mb-10'>
                        If you have any questions, please speak to your partnership manager.
                    </div>
                    <amp-button (click)='download()' class='btn btn-submit mt-40'>
                        Download a copy
                    </amp-button>
                </section>
            </div>
          ` ,
    styles        : [ require( './confirmation-block.component.scss' ).toString() ] ,
    directives    : [ ThemeIDDirective ] ,
    encapsulation : ViewEncapsulation.None ,
    providers     : [ provideParent( ConfirmationBlockComponent ) ]
} )
export class ConfirmationBlockComponent extends FormBlock implements OnInit {
    static CLASS_NAME             = 'ConfirmationBlockComponent';
    private showConfirmationBlock = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControlGroupName = 'confirmation';
    }

    ngOnInit () : any {
        let visibleFlag = this.getMyVisibleFlagString();
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes[ visibleFlag ] ) {
                this.showConfirmationBlock = true;
                this.formModelService.$flags.unsubscribe();
            }
        } );
        return undefined;
    }

    preBindControls ( _formBlockDef ) {
    }

    private download () {
        alert( 'Begin downloading the form ...' );
    }

    private get isAMPFPP () {
        return this.formModelService.licensee === 'DEA_AMPFP';
    }

    private get isHILLROSS () {
        return this.formModelService.licensee === 'DEA_HILLROSS';
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }
}
