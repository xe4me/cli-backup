import { Component , ElementRef , OnInit } from '@angular/core';
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
import { ModelActions , Payload } from "../../../app/redux/actions/model.action";
import { Store } from "@ngrx/store";
@Component( {
    selector   : 'sample-array-experience-block' ,
    template   : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <div *ngFor="let group of controlGroupArray.controls ; let i = index;">
                <amp-form-row [attr.theme]="themeService.theme.attr" [title]="__custom.controls[0].title+' '+i">
                    <button (click)="remove(i)" class="btn btn-anchor">x</button>
                    <div class="grid__item_floated 1/3">
                       <amp-redux [fdn]="__fdn.concat(['ages', i, 'age'])">  
                           <amp-input
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                [id]="__custom.controls[0].id+i"
                                [label]="'Your age '+i"
                                [controlGroup]="group"
                                [isInSummaryState]="isInSummaryState"
                                [isRequired]="true"
                                [valPattern]="__custom.controls[0].regex"
                                [valMaxLength]="__custom.controls[0].maxLengh">
                            </amp-input>
                        </amp-redux>
                    </div>
                </amp-form-row>
            </div>
            <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                <amp-input
                    #ampReduxRef
                    [attr.theme]="themeService.theme.attr"
                    [id]="__custom.controls[0].id"
                    [label]="'Your age '"
                    [controlGroup]="__controlGroup"
                    [isInSummaryState]="isInSummaryState"
                    [isRequired]="true"
                    [valPattern]="__custom.controls[0].regex"
                    [valMaxLength]="__custom.controls[0].maxLengh">
                </amp-input>
            </amp-redux>
            <button (click)="addMore()" class="btn btn-anchor">Add +</button>
        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , AmpInputComponent , AmpFormRowComponent ]
} )
export class SampleArrayExperienceBlock extends FormBlock implements OnInit {
    private controlGroupArray : FormArray = new FormArray( [] );

    constructor ( private themeService : ThemeService ,
                  private store : Store<any> ,
                  private modelActions : ModelActions ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , progressObserver , scrollService );
    }

    ngOnInit () : any {
        this.__controlGroup.addControl( 'ages' , this.controlGroupArray );
        let payload : Payload = {
            query : [] ,
            fdn   : this.__fdn.concat( [ 'ages' ] )
        };
        this.store.dispatch( this.modelActions.updateModel( payload ) );
        return undefined;
    }

    context () {
        return this;
    }

    private addMore () {
        let controlGroup = new FormGroup( {} );
        this.controlGroupArray.push( controlGroup );
        let payload : Payload = {
            query : {} ,
            fdn   : this.__fdn.concat( [ 'ages' ] )
        };
        this.store.dispatch( this.modelActions.push( payload ) );
    }

    private remove ( _index : number ) {
        this.controlGroupArray.removeAt( _index );
        let payload : Payload = {
            query : _index ,
            fdn   : this.__fdn.concat( [ 'ages' ] )
        };
        this.store.dispatch( this.modelActions.removeAt( payload ) );
    }
}
