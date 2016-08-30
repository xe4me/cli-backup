import { Component , ChangeDetectorRef , ViewChild } from '@angular/core';
import { Control , ControlGroup } from "@angular/common";
import { FormSectionService , UIControlService } from 'amp-ddc-ui-core/ui-core';
import { ThemeService } from "../../services/theme";
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
                name        : 'sampleExperienceBlock' ,
                blockType   : 'SampleExperienceBlock' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/sample-experience-block' ,
                custom      : {
                    firstnameControl : new Control() ,
                    id               : 'FirstName' ,
                    label            : 'First name'
                }
            } ,
            {
                name        : 'anotherSampleExperienceBlock' ,
                blockType   : 'AnotherSampleExperienceBlock' ,
                blockLayout : 'INLINE' ,
                commonBlock : false ,
                path        : 'blocks/amp-form-block/another-sample-experience-block' ,
                custom      : {
                    fullOrPartialControl : new Control() ,
                    id                   : 'FullOrPartial' ,
                    label                : 'Full or partial' ,
                    buttons              : [
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
                    fullOrPartial        : 'fullOrPartial'
                }
            }
        ]
    };
    @ViewChild( 'form' ) form;
}
