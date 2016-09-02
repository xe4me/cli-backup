import { Component } from '@angular/core';
@Component( {
    selector : 'amp-form-row' ,
    template : `
        <div class='form__row'>
            <div class="grid__container 1/1 palm-1/1 mb">
               <ng-content></ng-content>
             </div>
        </div>
    ` ,
    styles : [ require( './amp-form-row.component.scss' ).toString() ]
} )
export class AmpFormRowComponent {
}
