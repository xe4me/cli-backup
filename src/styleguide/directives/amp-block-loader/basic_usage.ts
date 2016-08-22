import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpBlockLoaderDirective } from '../../../app/amp-block-loader.directive';
import { FormSectionService } from 'amp-ddc-ui-core/ui-core';
import{ Highlight } from '../../highlight'
@Component( {
    providers   : [ FormSectionService ] ,
    directives  : [ Highlight , AmpBlockLoaderDirective ] ,
    selector    : 'amp-block-loader-basic-usage' ,
    templateUrl : 'src/styleguide/directives/amp-block-loader/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpBlockLoaderDirectiveBasicUsage {
    control : Control              = new Control();
    private fullyDistinguishedName = [ 'Application' ];
    private childBlocks            = {
        name        : 'AmpButtonComponentSection' ,
        blockType   : 'PageSectionComponent' ,
        blockLayout : 'SECTION' ,
        commonBlock : true ,
        path        : 'sections/page-section.component' ,
        custom      : { label : 'Beneficiaries' } ,
        blocks      : [
            {
                name        : 'ampButton' ,
                blockType   : 'AmpGroupButtonComponent' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'components/amp-group-button/amp-group-button.component' ,
                custom      : {
                    parentControl : new Control() ,
                    id            : 'ApplicantDetails-gender' ,
                    label         : 'Gender' ,
                    buttons       : [
                        { id : 'ApplicantDetails-femaleId' , value : 'F' , label : 'Female' } ,
                        { id : 'ApplicantDetails-maleId' , value : 'M' , label : 'Male' }
                    ]
                }
            }
        ]
    };

    constructor ( private _cd : ChangeDetectorRef ) {
    }
}
