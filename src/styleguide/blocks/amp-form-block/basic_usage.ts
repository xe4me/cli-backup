import { Component , ChangeDetectorRef , ViewChild } from '@angular/core';
import { Control , ControlGroup , FormBuilder } from "@angular/common";
import { FormSectionService , UIControlService } from 'amp-ddc-ui-core/ui-core';
import { AmpBlockLoaderDirective } from "../../../app/amp-block-loader.directive";
@Component( {
    selector    : 'amp-form-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-form-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    providers   : [ FormSectionService , UIControlService ] ,
    directives  : [ AmpBlockLoaderDirective ]
} )

export default class AmpFormBlockBasicUsage {
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
                name        : 'introBlockComponent' ,
                blockType   : 'IntroBlockComponent' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/intro/intro-block.component'
            } ,
            {
                name        : 'anotherSampleExperienceBlock' ,
                blockType   : 'AnotherSampleExperienceBlock' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/another-sample-experience-block' ,
                custom      : {
                    id            : 'FullOrPartial' ,
                    label         : 'Full or partial' ,
                    buttons       : [
                        {
                            id    : 'fullId' ,
                            value : 'full' ,
                            label : 'Full sale'
                        } ,
                        {
                            id    : 'partialId' ,
                            value : 'partial' ,
                            label : 'Partial sale'
                        }
                    ] ,
                    fullOrPartial : 'fullOrPartial'
                }
            }
            , {
                name        : 'sampleExperienceBlock' ,
                blockType   : 'SampleExperienceBlock' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/sample-experience-block' ,
                custom      : {
                    firstname : {
                        errors : {
                            required : 'First name is a required thing :)'
                        }
                    } ,
                    lastname  : {
                        errors   : {
                            required : 'Apparently even last name is a required thing :) , what a wonderful time to be'
                        } ,
                        regex    : '^([0-9])*$' ,
                        maxLengh : 12
                    }
                }
            }
        ]
    };
    private form : ControlGroup;

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
        //this.createMassiveBlocks();
    }

    private createMassiveBlocks () {
        for ( let i = 0 ; i < 100 ; i ++ ) {
            this.childBlocks.blocks.push( {
                name        : 'sampleExperienceBlock' + i ,
                blockType   : 'SampleExperienceBlock' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/sample-experience-block' ,
                custom      : {
                    firstname : {
                        errors : {
                            required : 'First name is a required thing :)' + i
                        }
                    } ,
                    lastname  : {
                        errors   : {
                            required : 'Apparently even last name is a required thing :) , what a wonderful time to be' + i
                        } ,
                        regex    : '^([0-9])*$' ,
                        maxLengh : 12
                    }
                }
            } )
        }
    }
}
