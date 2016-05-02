import { FormBlock , NamedControl } from '../../formBlock';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone } from 'angular2/core';
import { ThemeIDDirective } from '../../../directives/themeId.directive';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { ScrollService } from 'amp-ddc-ui-core/src/app/services/scroll/scroll.service';
import { I18nSelectPipe } from 'angular2/common';
@Component( {
    selector   : 'bolr-intro-block' ,
    template   : `
    <div class='ng-animate bolr-intro bolr-right-padding' [class.hidden]='formModelService.getFlags().introIsDone'>
        <div class='bolr-intro-logo mb4' ampLicenseeThemeID></div>
        <div class='bolr-intro-main'>
            <div class='bolr-intro-main__title practice-title mb3'>
                <span class='mr'>{{formModelService.getModel().context.practiceName}}</span>
                <span class='mr'>Practice ID: {{formModelService.getModel().context.payeeID}}</span>
                <span>Practice principal: {{formModelService.getModel().context.practicePrincipal_firstName + ' ' + formModelService.getModel().context.practicePrincipal_lastName }}</span>
            </div>
            <p  class='bolr-intro-main__body mb3'>
                Hi {{formModelService.getModel().context.practicePrincipal_firstName}},<br/>
                You're about to request access to the {{ formModelService.getModel().context.licensee | i18nSelect: licenseeFormName}} facility.
            </p>
            <p class='bolr-intro-main__notes mb3'>We just need a few details, it won't take long.</p>
            <button class='btn btn--secondary btn-ok' (click)='ok()' data-automation-id='btn_bolr-intro-block'>
                OK
            </button>
        </div>
    </div>
  ` ,
    // encapsulation: ViewEncapsulation.Emulated
    styles     : [ require( './intro-block.component.scss' ).toString() ] ,
    directives : [ ThemeIDDirective ] ,
    pipes      : [ I18nSelectPipe ]
} )
export class IntroBlockComponent extends FormBlock {
    static CLASS_NAME             = 'IntroBlockComponent';
           licenseeFormName : any = {
               LIC_AMPFP    : 'Buyer of last resort' ,
               LIC_HILLROSS : 'Licensee / Enhanced buyback' ,
               LIC_CHARTER  : 'Buy out option' ,
               null         : 'Buyer of last resort'
           };
    // TODO: Update the title of the form based on the licensee @ViewChild
    constructor ( private el : ElementRef ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ) {
        super();
    }

    // TODO: Move this to the parent FormBlock class, as this should be common to all FormBlock components
    public ok () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : 'introIsDone' ,
            flagValue : true
        } );
    }

    public preBindControls ( _formBlockDef ) {
    }
}
