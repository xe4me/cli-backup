import { Component , ChangeDetectionStrategy } from '@angular/core';
@Component( {
    selector        : 'amp-tooltip' ,
    template        : require( './amp-tooltip.component.html' ) ,
    styles          : [ require( './amp-tooltip.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )
export class AmpTooltipComponent {
}
