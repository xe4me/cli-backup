import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    ViewContainerRef,
    ComponentRef,
    OnDestroy
} from "@angular/core";
import { SectionRepeaterComponent } from "../../../../sections/section-repeater/section-repeater.component";
import { FormBlock } from "../../../../form-block";
import { SaveService, ScrollService } from "../../../../services";
import { AmpRowRepeaterComponent } from "../../../amp-row-repeater";
@Component( {
    selector        : 'amp-single-joint-block',
    template        : require( './amp-single-joint-block.component.html' ),
    styles          : [ require( './amp-single-joint-block.component.scss' ).toString() ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpSingleJointBlockComponent extends FormBlock implements OnInit, AfterViewInit, OnDestroy {

    protected __custom = {
        blockTitle     : 'Who\'s this account for?',
        controls       : {
            singleOrJoint : {
                'id'    : 'singleOrJoint',
                options : [
                    {
                        id    : 'single',
                        value : 'single',
                        label : 'Just me'
                    },
                    {
                        id    : 'joint',
                        value : 'joint',
                        label : 'Me and someone else'
                    }
                ]
            }
        },
        optionalBlocks : {
            repeater : {
                "name"        : "Applicants",
                "blockType"   : "SectionRepeaterComponent",
                "blockLayout" : "INLINE",
                "commonBlock" : false,
                "path"        : "sections/section-repeater/section-repeater.component",
                "blocks"      : [
                    {
                        "name"        : "personalDetails",
                        "blockType"   : "PageSectionComponent",
                        "blockLayout" : "SECTION",
                        "commonBlock" : false,
                        "path"        : "sections/page-section.component",
                        "custom"      : {
                            "label" : "Personal Details"
                        },
                        "blocks"      : [
                            {
                                "name"        : "basicInfo",
                                "blockType"   : "AmpBasicInfoBlockComponent",
                                "blockLayout" : "INLINE",
                                "commonBlock" : false,
                                "path"        : "modules/amp-basic-info-block/components/amp-basic-info-block/amp-basic-info-block.component",
                                "custom"      : {
                                    "blockTitle" : "Tell us about yourself",
                                    "controls"   : [
                                        {
                                            "id" : "title"
                                        },
                                        {
                                            "id" : "firstName"
                                        },
                                        {
                                            "id" : "middleName"
                                        },
                                        {
                                            "id" : "surName"
                                        },
                                        {
                                            "id" : "dateOfBirth"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
    private repeater : AmpRowRepeaterComponent;

    constructor( saveService : SaveService,
                 _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 private viewContainerRef : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit() {
        this.__loadNext( this.__custom.optionalBlocks.repeater, this.viewContainerRef )
            .then( ( componentRef : ComponentRef<SectionRepeaterComponent> ) => {
                this.repeater = componentRef.instance.repeater;
            } );
    }


    public onSingleOrJointSelect( singleJointIndicator : string ) {
        let jointValue = this.__custom.controls.singleOrJoint.options[ 1 ].value;
        if ( singleJointIndicator === jointValue ) {
            this.repeater.addIfLt( 2 );
        } else {
            if ( this.repeater.rowCount > 1 ) {
                this.repeater.removeLast();
            }
        }

        this.onNext();
    }

}
