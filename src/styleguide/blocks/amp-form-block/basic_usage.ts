import { Component , ChangeDetectorRef , ViewChild } from '@angular/core';
import { FormSectionService } from 'amp-ddc-ui-core/ui-core';
import { AmpBlockLoaderDirective } from "../../../app/amp-block-loader.directive";
import { Store , provideStore } from '@ngrx/store';
import { FormGroup , FormBuilder } from "@angular/forms";
import { FDN } from "./Application.fdn";
var formDef = require( './form-definition.fdn.json' );
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
        //this.model = this.store.select();
        //this.createMassiveBlocks();
    }

    private createMassiveBlocks () {
        for ( let i = 0 ; i < 20 ; i ++ ) {
            (<any>this.childBlocks).blocks[ 0 ].blocks[ 1 ].blocks.push( {
                name        : 'InsuranceDetailsSection' + i ,
                blockType   : 'PageSectionComponent' ,
                blockLayout : 'SECTION' ,
                commonBlock : false ,
                path        : 'sections/page-section.component' ,
                custom      : { label : 'Beneficiaries' } ,
                blocks      : [
                    {
                        name        : 'anotherSampleExperienceBlock' + i ,
                        blockType   : 'AnotherSampleExperienceBlock' ,
                        blockLayout : 'INLINE' ,
                        commonBlock : false ,
                        path        : 'blocks/amp-form-block/another-sample-experience-block' ,
                        custom      : {
                            id            : 'FullOrPartial' + i ,
                            blockTitle    : 'Which one , full or partial ? ' + i ,
                            buttons       : [
                                {
                                    id    : 'fullId' + i ,
                                    value : 'full' + i ,
                                    label : 'Full sale' + i
                                } ,
                                {
                                    id    : 'partialId' + i ,
                                    value : 'partial' + i ,
                                    label : 'Partial sale' + i
                                }
                            ] ,
                            fullOrPartial : 'fullOrPartial' + i
                        }
                    }
                    , {
                        name        : 'sampleExperienceBlock' + i ,
                        blockType   : 'SampleExperienceBlock' ,
                        blockLayout : 'INLINE' ,
                        commonBlock : false ,
                        path        : 'blocks/amp-form-block/sample-experience-block' ,
                        custom      : {
                            blockTitle : 'Let\'s get your name, shall we ?' + i ,
                            firstname  : {
                                title  : "What's your first name?" + i ,
                                errors : {
                                    required : 'First name is a required thing :)' + i
                                }
                            } ,
                            lastname   : {
                                title  : "What's your last name?" + i ,
                                errors : {
                                    required : 'Last name is a required thing :)' + i
                                }
                            } ,
                            age        : {
                                title    : "What about your age?" + i ,
                                errors   : {
                                    required : 'Apparently even age is a required thing :) , what a wonderful time to be' + i
                                } ,
                                regex    : '^([0-9])*$' ,
                                maxLengh : 3
                            }
                        }
                    }
                ]
            } )
        }
    }
}
