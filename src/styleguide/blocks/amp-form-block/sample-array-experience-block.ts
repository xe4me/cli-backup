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
           <amp-form-row [attr.theme]="themeService.theme.attr" *ngFor="let group of controlGroupArray.controls ; let i = index;">
              <button (click)="remove(i)" class="btn btn-anchor"> <span class="icon icon--close" aria-hidden="true"></span> Remove this field</button>
                <label class='grid__item_floated palm-1/1 tablet-2/3 lap-and-up-4/12 form-row-label'>Mobile</label>
                    <div class="grid__item_floated palm-1/1 tablet-2/3 lap-and-up-3/12 mr+ mt0">
                        <label class='1/1 sr-only'>What's your mobile number?</label>
                       <amp-redux [fdn]="__fdn.concat(['ages', i, 'age'])">  
                           <amp-input
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                [id]="__custom.controls[0].id+i"
                                [label]="'Your age '+i"
                                [controlGroup]="group"
                                [isInSummaryState]="isInSummaryState"
                                [required]="true"
                                [pattern]="__custom.controls[0].regex"
                                [maxLength]="__custom.controls[0].maxLengh">
                            </amp-input>
                        </amp-redux>
                     </div>
            </amp-form-row>
          <button (click)="addMore()" class="btn btn-anchor"> <span class="icon icon--plus-filled" aria-hidden="true"></span> Add another field</button>
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
        this.store.dispatch( this.modelActions.update( payload ) );
        this.addMore();
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
