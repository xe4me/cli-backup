import { Component , ChangeDetectionStrategy } from '@angular/core';
@Component( {
    selector : 'amp-tooltip-cmp' ,
    // host     : {
    //     '[clicked-outside]' : 'hide' ,
    // } ,
    template : `<div  [clicked-outside]='hide' class="amp-tooltip" [innerHtml]='message'></div>` ,
    styles   : [ require( './amp-tooltip.component.scss' ).toString() ]
} )
export class AmpTooltipComponent {
    private hide : ()=>{};
}
