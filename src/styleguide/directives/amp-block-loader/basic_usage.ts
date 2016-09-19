import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormBuilder } from '@angular/forms';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
import{ Highlight } from '../../highlight';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
@Component( {
    providers   : [ FormSectionService , FormBuilder ] ,
    directives  : [ Highlight , AmpBlockLoaderDirective ] ,
    selector    : 'amp-block-loader-basic-usage' ,
    templateUrl : 'src/styleguide/directives/amp-block-loader/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpBlockLoaderDirectiveBasicUsage {
    control : FormControl          = new FormControl();
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
                    parentControl : new FormControl() ,
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
