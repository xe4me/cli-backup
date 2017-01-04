import { Component } from '@angular/core';
import {
    FormControl,
    FormBuilder
} from '@angular/forms';
@Component( {
    providers   : [ FormBuilder ],
    selector    : 'amp-block-loader-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' ) ]
} )

export default class AmpBlockLoaderDirectiveBasicUsage {
    control : FormControl         = new FormControl();
    public fullyDistinguishedName = [ 'Application' ];
    public childBlocks            = {
        name        : 'AmpButtonComponentSection',
        blockType   : 'PageSectionComponent',
        blockLayout : 'SECTION',
        commonBlock : true,
        path        : 'sections/page-section.component',
        custom      : { label : 'Beneficiaries' },
        blocks      : [
            {
                name        : 'ampButton',
                blockType   : 'AmpGroupButtonComponent',
                blockLayout : 'INLINE',
                commonBlock : false,
                path        : 'components/amp-group-button/amp-group-button.component',
                custom      : {
                    parentControl : new FormControl(),
                    id            : 'ApplicantDetails-gender',
                    label         : 'Gender',
                    buttons       : [
                        { id      : 'ApplicantDetails-femaleId',
                            value : 'F',
                            label : 'Female'
                        },
                        { id      : 'ApplicantDetails-maleId',
                            value : 'M',
                            label : 'Male'
                        }
                    ]
                }
            }
        ]
    };
}
