import { Component , ChangeDetectorRef , ViewChild } from '@angular/core';
import { AmpBlockLoaderDirective } from '../../../app/amp-block-loader.directive';
import { Store , provideStore } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
var formDef = require( './form-def.def.json' );
@Component( {
    selector    : 'amp-form-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-form-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    providers   : [ FormSectionService ] ,
    directives  : [ AmpBlockLoaderDirective ]
} )
export default class AmpFormBlockBasicUsage {
    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> , private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
        //this.createMassiveBlocks();
    }

    private createMassiveBlocks () {
        for ( let i = 0 ; i < 15 ; i ++ ) {
            (<any>this.childBlocks).blocks[ 0 ].blocks[ 1 ].blocks.push(
                {
                    "name"        : "FirstInsuranceDetailsSection" + i ,
                    "blockType"   : "PageSectionComponent" ,
                    "blockLayout" : "SECTION" ,
                    "commonBlock" : false ,
                    "path"        : "sections/page-section.component" ,
                    "custom"      : {
                        "label" : "First Insurance Details Section"
                    } ,
                    "blocks"      : [
                        {
                            "name"        : "samplefieldsblock" + i ,
                            "blockType"   : "SampleFieldsBlock" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/sample-fields-block" ,
                            "custom"      : {
                                "blockTitle" : "Multiple text fields " + i ,
                                "controls"   : [
                                    {
                                        "id" : "contactNumber" + i
                                    } ,
                                    {
                                        "id" : "email" + i
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"        : "anotherSampleExperienceBlock" + i ,
                            "blockType"   : "AnotherSampleExperienceBlock" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/another-sample-experience-block" ,
                            "custom"      : {
                                "blockTitle" : "Group buttons " + i ,
                                "controls"   : [
                                    {
                                        "id"      : "FullOrPartial" + i ,
                                        "buttons" : [
                                            {
                                                "id"    : "fullId" + i ,
                                                "value" : "full" + i ,
                                                "label" : "Full sale" + i
                                            } ,
                                            {
                                                "id"    : "partialId" + i ,
                                                "value" : "partial" + i ,
                                                "label" : "Partial sale" + i
                                            }
                                        ]
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"       : "sampleArrayExperienceBlock" + i ,
                            "blockType"  : "SampleArrayExperienceBlock" ,
                            "blockLayou" : "INLINE" ,
                            "commonBloc" : false ,
                            "path"       : "/amp-form-block/blocks/sample-array-experience-block" ,
                            "custom"     : {
                                "blockTitle" : "This block has dynamic controls" + i ,
                                "controls"   : [
                                    {
                                        "id"       : "age" + i ,
                                        "title"    : "What about your age?" + i ,
                                        "errors"   : {
                                            "required" : "Apparently even age is a required thing ) , what a wonderful time to be" + i
                                        } ,
                                        "regex"    : "^([0-9])*$" ,
                                        "maxLengh" : 20
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"        : "samplefieldsblock3" + i ,
                            "blockType"   : "SampleFieldsBlock3" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/sample-fields-block3" ,
                            "custom"      : {
                                "blockTitle" : "Are there other equity holders? " + i ,
                                "controls"   : [
                                    {
                                        "id"      : "Title" + i ,
                                        "options" : [
                                            {
                                                "value" : "1" + i ,
                                                "label" : "1" + i
                                            } ,
                                            {
                                                "value" : "2" + i ,
                                                "label" : "2" + i
                                            } ,
                                            {
                                                "value" : "3" + i ,
                                                "label" : "3" + i
                                            } ,
                                            {
                                                "value" : "4" + i ,
                                                "label" : "4" + i + i
                                            } ,
                                            {
                                                "value" : "5" + i ,
                                                "label" : "5" + i
                                            }
                                        ]
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"        : "BlockWithRadios" + i ,
                            "blockType"   : "BlockWithRadios" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/block-with-radios" ,
                            "custom"      : {
                                "blockTitle" : "Let's test the radio buttons" + i ,
                                "controls"   : [
                                    {
                                        "id"      : "radios" + i ,
                                        "buttons" : [
                                            {
                                                "id"    : "five_years2" + i ,
                                                "value" : "five_years2" + i ,
                                                "label" : "At least five years" + i
                                            } ,
                                            {
                                                "id"    : "fewer_than_five_years" + i ,
                                                "value" : "fewer_than_five_years" + i ,
                                                "label" : "Fewer than five years" + i
                                            } ,
                                            {
                                                "id"    : "more_than_five_years" + i ,
                                                "value" : "more_than_five_years" + i ,
                                                "label" : "More than five years" + i
                                            } ,
                                            {
                                                "id"    : "amazing_value" + i ,
                                                "value" : "amazing_value" + i ,
                                                "label" : "How amazing this radio button is" + i
                                            }
                                        ]
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"        : "BlockWithCheckbox" + i ,
                            "blockType"   : "BlockWithCheckbox" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/block-with-checkbox" ,
                            "custom"      : {
                                "blockTitle" : "Checkbox " + i ,
                                "controls"   : [
                                    {
                                        "id"      : "radios" + i ,
                                        "buttons" : [
                                            {
                                                "id"    : "five_years2" + i ,
                                                "value" : "five_years2" + i ,
                                                "label" : "At least five years" + i
                                            } ,
                                            {
                                                "id"    : "fewer_than_five_years" + i ,
                                                "value" : "fewer_than_five_years" + i ,
                                                "label" : "Fewer than five years" + i
                                            } ,
                                            {
                                                "id"    : "more_than_five_years" + i ,
                                                "value" : "more_than_five_years" + i ,
                                                "label" : "More than five years" + i
                                            } ,
                                            {
                                                "id"    : "amazing_value" + i ,
                                                "value" : "amazing_value" + i ,
                                                "label" : "How amazing this radio button is" + i
                                            }
                                        ]
                                    }
                                ]
                            }
                        } ,
                        {
                            "name"        : "BlockWithTextarea" + i ,
                            "blockType"   : "BlockWithTextarea" ,
                            "blockLayout" : "INLINE" ,
                            "commonBlock" : false ,
                            "path"        : "/amp-form-block/blocks/block-with-textarea" ,
                            "custom"      : {
                                "blockTitle" : "This is a text area, it's nice isn't it " + i ,
                                "controls"   : [
                                    {
                                        "id" : "textarea" + i
                                    }
                                ]
                            }
                        }
                    ]
                } ,
            );
        }

        console.log(JSON.stringify(this.childBlocks));
    }
}
