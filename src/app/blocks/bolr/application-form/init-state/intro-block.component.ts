import { FormBlock, provideParent } from '../../../formBlock';
import { Component , ElementRef , DynamicComponentLoader } from '@angular/core';
import { ThemeIDDirective } from '../../../../directives/themeId.directive';
import { FormModelService , LicenseesAbstract } from 'amp-ddc-ui-core/ui-core';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
@Component( {
    selector   : 'bolr-intro-block' ,
    template   : `
    <div class='ng-animate bolr-intro bolr-right-padding' [class.hidden]='formModelService.getFlags("introIsDone")'>
        <div class='bolr-intro-logo mb-60' ampLicenseeThemeID></div>
        <div class='bolr-intro-main'>
            <div class='bolr-intro-main__title practice-title mb3'>
                <span class='mr'>{{ practiceName }}</span>
                <span class='mr'>Practice ID: {{ payeeID }}</span>
                <span>Practice principal: {{ practicePrincipal }}</span>
            </div>
            <p  class='bolr-intro-main__body mb3'>
                Hi {{ practicePrincipalFirstName }}<br/>
                You're about to complete your application and deed of undertaking for full {{ licenseeBuybackFacility
                 }}.
            </p>
            <p class='bolr-intro-main__notes mb3'>We need a few details, this will take some time to complete, but you can save and continue at any time.</p>
            <amp-button class='btn btn-ok' (click)='ok()' data-automation-id='btn_bolr-intro-block'>
                OK
            </amp-button>
        </div>
    </div>
  ` ,
    // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './intro-block.component.scss' ).toString() ] ,
    directives : [ ThemeIDDirective , AmpButton ],
    providers  : [ provideParent( IntroBlockComponent ) ]
} )
export class IntroBlockComponent extends FormBlock implements FormBlock {
    static CLASS_NAME = 'IntroBlockComponent';

    constructor ( private loader : DynamicComponentLoader ,
                  private elementRef : ElementRef ,
                  private formModelService : FormModelService ) {
        super();
    }

    public ok () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'introIsDone' ,
            flagValue : true
        } );
    }

    public preBindControls ( _formBlockDef ) {
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }

    private get context () {
        return this.formModelService.context;
    }

    private get payeeID () {
        return this.context.payeeID;
    }

    private get practiceName () {
        return this.context.practiceName;
    }

    private get practicePrincipalLastName () {
        return this.context.practicePrincipalLastName;
    }

    private get practicePrincipalFirstName () {
        return this.context.practicePrincipalFirstName;
    }

    private get practicePrincipal () {
        return this.practicePrincipalFirstName + ' ' + this.practicePrincipalLastName;
    }
}
