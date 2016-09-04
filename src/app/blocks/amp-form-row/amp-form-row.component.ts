import { Component , Input } from '@angular/core';
@Component( {
    selector : 'amp-form-row' ,
    template : `
        <div class='form__row'>
            <div class="grid__container 1/1 palm-1/1 mb">
                <label class='grid__item_floated 1/1 heading-contxtual-label'>{{ title }}</label>
               <ng-content></ng-content>
             </div>
        </div>
    ` ,
    styles   : [ require( './amp-form-row.component.scss' ).toString() ]
} )
export class AmpFormRowComponent {
    @Input( 'title' ) title : string;
}
