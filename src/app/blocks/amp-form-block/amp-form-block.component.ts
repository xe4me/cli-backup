import { Component , Input , OnInit } from '@angular/core';
@Component( {
    selector : 'amp-form-block' ,
    template : `
        <div id='{{ context?.selectorName }}' class='pt-60 palm-pt--' ngModelGroup="address">
            <ng-content></ng-content>    
             <div class="block-buttons">
                 <amp-button
                    *ngIf='!context?.isInSummaryState'
                    (click)='context?.onNext()'
                    [disabled]='!context?.canGoNext' class='btn btn-ok btn-ok-margin-top palm-m0'>
                    OK
                </amp-button>
                <amp-button
                    *ngIf='context?.isInSummaryState'
                    (click)='context?.onEdit()'
                    class='btn btn-change btn-ok-margin-top palm-m0'>
                    Change
                </amp-button>
            </div>
            <div class='hr-block-divider mt-80  palm-mt'></div>
        </div>
    `
} )
export class AmpFormBlockComponent implements OnInit {
    @Input( 'context' ) context;

    ngOnInit () : any {
        if ( ! this.context ) {
            console.error( 'Most of the amp-form-block functionalities would not be working because you have not' +
                ' passed in the context ' )
        }
        return undefined;
    }
}
