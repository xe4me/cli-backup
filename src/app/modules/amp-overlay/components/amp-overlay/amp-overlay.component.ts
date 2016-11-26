import { Component } from '@angular/core';
@Component( {
    selector : 'amp-overlay' ,
    template : `
        <div *ngIf="active" class="amp-overlay"></div>
     ` ,
    styles   : [ require( './amp-overlay.scss' ).toString() ] ,
    inputs   : [ 'active' ]
} )
export class AmpOverlayComponent {
    private active : boolean;
}
