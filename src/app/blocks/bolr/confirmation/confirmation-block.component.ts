import { FormBlock } from '../../formBlock';
import { Component , ElementRef  , ViewEncapsulation } from 'angular2/core';
import { ThemeIDDirective } from '../../../directives/themeId.directive';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract
} from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector      : 'confirmation-block' ,
    template      : `
            <div class='confirmation-block' id='confirmation-block'>
                <div class='confirmation-block--logo mb-60' ampLicenseeThemeID></div>
                <div class='grid__item 1/6'></div>
                <section class='grid__item 2/3'>
                    <div class='heading heading-contxtual-label'>
                        Thank you, your request has been submitted.
                    </div>
                    <h3 class='heading heading-intro mt-30'>Like more information?</h3>
                    <div class='heading heading-micro-intro mt-35 mb-10'>
                        You can find details about the impact of extending your notice period and/or withdrawing your notification in the
                        {{ licensee }} {{ licenseeBuybackFacility }} policy terms.
                    </div>
                    <div class='heading heading-micro-intro mb-10'>
                        If you have any questions, please contact your partnership manager.
                    </div>
                    <amp-button (click)='download()' class='btn btn-submit mt-40'>
                        Download a copy
                    </amp-button>
                </section>
            </div>
          ` ,
    styles        : [ require( './confirmation-block.component.scss' ).toString() ] ,
    directives    : [ ThemeIDDirective ] ,
    encapsulation : ViewEncapsulation.None
} )
export class ConfirmationBlockComponent extends FormBlock {
    static CLASS_NAME = 'ConfirmationBlockComponent';

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
    }

    preBindControls ( _formBlockDef ) {
    }

    private download () {
        alert( 'Begin downloading the form ...' );
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }
}

