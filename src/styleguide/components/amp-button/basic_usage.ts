import { Component , AfterViewInit , ChangeDetectorRef , provide } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { FormBlock , provideParent } from '../../../app/blocks/formBlock';
import { BlockID } from 'amp-ddc-ui-core/ui-core';
import { ThemeService } from '../../services/theme';
import{ Highlight } from '../../highlight'
@Component( {
    selector   : 'some-form-block' ,
    template   : `
            <div class="title">Same as above, but the button are in a FormBlock Component, the data-automation-id should be aware of it parent</div>
            <div class='content'>
              <amp-button [attr.theme]="themeService.theme.attr" *ngIf='true' (click)='clickMethod(1)' [class]="'btn btn-secondary mt0 mb'" [data-automation-id]='"abcd"'>
              OK
              </amp-button>
                <amp-button [attr.theme]="themeService.theme.attr" *ngIf='true' (click)='clickMethod(1)' [class]="'btn btn-secondary mt0 mb'" [data-automation-id]='"abcd"'>
                    Full
                </amp-button>
            </div>
        ` ,
    directives : [ AmpButton ] ,
    providers  : [
        provideParent( SomeFormBlockComponent )
    ]
} )
class SomeFormBlockComponent extends FormBlock implements FormBlock {
    static CLASS_NAME : string = 'SomeFormBlockComponent';
    public blockType           = 'SomeFormBlockComponent';
    public _id                 = new BlockID( 'whatever' , 1 );

    constructor ( ) {
        super(  );
    }

    public preBindControls ( _formBlockDef ) {
    }

    public postBindControls () : void {
    }
}
@Component( {
    selector    : 'amp-button-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpButton , CORE_DIRECTIVES , SomeFormBlockComponent ]
} )

export default class AMPButtonComponentBasicUsage {
    isInSummaryState = false;

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    clickMethod ( id : number ) {
        console.log( 'Clicked on button number ' + id );
    }

    // ngAfterViewInit () {
    //
    //     // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
    //     this._cd.detectChanges();
    // }
    // private onAcknowledgeSelect ( value ) {
    //     console.log( 'onAcknowledgeSelect value' , value );
    // }
}
