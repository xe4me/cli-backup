import { Component , Input , OnInit } from '@angular/core';
import { AmpButton , AmpErrorComponent , AmpOverlayComponent } from '../../../../';
@Component( {
    selector : 'amp-form-block' ,
    template   : `
        <div (keyup.enter)="context.onNext()" class="FormBlocK " id='{{ context?.selectorName }}'>
             <amp-overlay [active]='!context?.isActive'></amp-overlay>
            <h2 class="heading heading-intro">{{ context?.__custom.blockTitle}}</h2>
             <ng-content></ng-content>
             <div *ngIf="!noError">
                <amp-error [controlGroup]="context?.__controlGroup"></amp-error>
             </div>
             <div class="block-buttons">
                 <amp-button
                    *ngIf='!context?.isInSummaryState'
                    [attr.theme]="theme"
                    (click)='context.onNext()'
                    [disabled]='!context?.canGoNext' class='btn btn-ok'>
                    OK
                </amp-button>
                <amp-button
                    *ngIf='context?.isInSummaryState'
                    [attr.theme]="theme"
                    (click)='context.onEdit()'
                    class='btn btn-change btn-ok-margin-top palm-m0'>
                    Change
                </amp-button>
            </div>
            <div class='hr-block-divider'></div>
        </div>
    ` ,
    directives : [ AmpButton , AmpErrorComponent , AmpOverlayComponent ] ,
    styles     : [ require( './amp-form-block.component.scss' ).toString() ]
} )
export class AmpFormBlockComponent implements OnInit {
    @Input( 'context' ) context;
    @Input( 'noError' ) noError;
    @Input( 'theme' ) theme;

    ngOnInit () : any {
        if ( ! this.context ) {
            console.error( 'Most of the amp-form-block functionalities would not be working because you have not' +
                ' passed in the context ' );
        }
        return undefined;
    }
}