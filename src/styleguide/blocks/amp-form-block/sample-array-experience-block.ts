import { Component , ChangeDetectorRef , ElementRef , OnInit } from '@angular/core';
import { AmpFormBlockComponent } from "../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../services/theme";
import { FormBlock } from "../../../app/form-block";
import {
    Action ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { AmpInputComponent } from "../../../app/components/amp-input/amp-input.component";
import { AmpFormRowComponent } from "../../../app/blocks/amp-form-row/amp-form-row.component";
import { FormArray , FormGroup } from "@angular/forms";

@Component( {
    selector   : 'sample-array-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr">
            <div *ngFor="let group of controlGroupArray.controls ; let i = index;">
                <amp-form-row [attr.theme]="themeService.theme.attr" [title]="__custom.age.title+' '+i">
                    <button (click)="remove(i)" class="btn btn-anchor">x</button>
                    <div class="grid__item_floated 1/3">
                       <amp-input
                            [attr.theme]="themeService.theme.attr"
                            [id]="'age-'+i"
                            [label]="'Your age '+i"
                            [controlGroup]="group"
                            [isInSummaryState]="isInSummaryState"
                            [isRequired]="true"
                            [valPattern]="__custom.age.regex"
                            [valMaxLength]="__custom.age.maxLengh">
                        </amp-input>
                    </div>
                </amp-form-row>
            </div>
            <button (click)="addMore()" class="btn btn-anchor">Add +</button>
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent ]
} )
export class SampleArrayExperienceBlock extends FormBlock implements OnInit {
    private controlGroupArray : FormArray = new FormArray( [] );

    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , progressObserver , scrollService );
    }

    ngOnInit () : any {
        //console.log( 'this.form' ,
        // this.__form.controls.Application.controls.InsuranceDetailsSection.controls.anotherSampleExperienceBlock.value );
        this.__controlGroup.addControl( 'ages' , this.controlGroupArray );
        return undefined;
    }

    context () {
        return this;
    }

    private addMore () {
        let controlGroup = new FormGroup( {} );
        this.controlGroupArray.push( controlGroup );
    }

    private remove ( _index : number ) {
        this.controlGroupArray.removeAt( _index );
    }
}
