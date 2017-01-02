import { Component , Input , ViewEncapsulation } from '@angular/core';
@Component( {
    selector      : 'amp-tooltip-template' ,
    template      : `
        <div [clicked-outside]='hide' class="amp-tooltip {{ extraClasses }}" role="tooltip" >
            <div class="tooltip-content " [innerHtml]='message'></div>
        </div>
    ` ,
    styles        : [ require( './amp-tooltip-template.component.scss' ).toString() ] ,
    encapsulation : ViewEncapsulation.None
} )
export class AmpTooltipTemplateComponent {
    private extraClasses = '';
    private hide         = () : void => {
    }
}
@Component( {
    selector : 'amp-tooltip-cmp' ,
    template : `
        <span #tooltip='tooltip'
                [autoHideDelay]='autoHideDelay'
                [amp-tooltip-dir]="message" 
                class="icon icon--announcement icon-amp-tooltip">
        </span>
    ` ,
    styles   : [ require( './amp-tooltip-cmp.component.scss' ).toString() ]
} )
export class AmpTooltipComponent {
    @Input( 'message' ) message;
    @Input( 'autoHideDelay' ) autoHideDelay;
}
