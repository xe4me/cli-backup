import { Component, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../services/theme';
@Component( {
    selector : 'some-form-block',
    template : `
            <div class="title">Same as above, but the button are in a FormBlock Component, the data-automation-id should be aware of it parent</div>
            <div class='content'>
              <amp-button [attr.theme]="themeService.theme.attr" *ngIf='true' (click)='clickMethod(1)' [class]="'btn btn-secondary mt0 mb'" [data-automation-id]='"abcd"'>
              OK
              </amp-button>
                <amp-button [attr.theme]="themeService.theme.attr" *ngIf='true' (click)='clickMethod(1)' [class]="'btn btn-secondary mt0 mb'" [data-automation-id]='"abcd"'>
                    Full
                </amp-button>
            </div>
        `
} )
class SomeFormBlockComponent {
    static CLASS_NAME : string = 'SomeFormBlockComponent';
    public blockType = 'SomeFormBlockComponent';
    public _id = 'whatever';
}
@Component( {
    selector : 'amp-button-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ]
} )

export default class AMPButtonComponentBasicUsage {
    isInSummaryState = false;

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }

    clickMethod( id : number ) {
    }
}
