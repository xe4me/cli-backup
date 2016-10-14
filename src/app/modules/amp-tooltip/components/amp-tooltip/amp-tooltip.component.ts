import { Component , ChangeDetectionStrategy } from '@angular/core';
@Component( {
    selector : 'amp-tooltip-cmp' ,
    template : `<div class="amp-tooltip" [innerHtml]='message'></div>` ,
    styles   : [ require( './amp-tooltip.component.scss' ).toString() ]
} )
export class AmpTooltipComponent {
}
