import { Component , AfterViewInit , ChangeDetectorRef , provide } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpPrimaryButton } from '../../../app/components/amp-primary-button/amp-primary-button.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { FormBlock , provideParent } from '../../../app/blocks/formBlock';
import { MockUIControlService } from '../../services/mock-ui-control.service';
import { UIControlService , BlockID } from 'amp-ddc-ui-core/ui-core';
import { ThemeService } from '../../services/theme';
@Component( {
    selector   : 'some-form-block' ,
    template   : `
            <div class="title">Same as above, but the button are in a FormBlock Component, the data-automation-id should be aware of it parent</div>
            <div class='content'>
                <amp-button id='toggleChecked'class='btn btn-change btn-full'>OK</amp-button>
                <amp-button class='btn btn-change btn-full' [data-automation-id]='"abcd"'>
                    Full
                </amp-button>
            </div>
        ` ,
    directives : [ AmpPrimaryButton ] ,
    providers  : [
        provideParent( SomeFormBlockComponent ) ,
        provide( UIControlService , { useClass : MockUIControlService } )
    ]
} )
class SomeFormBlockComponent extends FormBlock implements FormBlock {
    static CLASS_NAME : string = 'SomeFormBlockComponent';
    public blockType           = 'SomeFormBlockComponent';
    public _id                 = new BlockID( 'whatever' , 1 );

    constructor ( controlService : UIControlService ) {
        super( controlService );
    }

    public preBindControls ( _formBlockDef ) {
    }

    public postBindControls () : void {
    }
}
@Component( {
    selector    : 'amp-button-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-primary-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ FORM_DIRECTIVES , AmpPrimaryButton , CORE_DIRECTIVES , SomeFormBlockComponent ]
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
