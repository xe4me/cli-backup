import { Component , Input , OnInit } from '@angular/core';
@Component( {
    selector : 'amp-form-block' ,
    host     : {
        '[attr.id]'           : 'context?.selectorName' ,
        '[attr.data-section]' : 'context?.__sectionName'
    } ,
    template   : `
      <div (keyup.enter)="onKeyupEnter($event)" class="FormBlocK">
            <amp-overlay [active]='!context?.isActive' *ngIf="withOverlay"></amp-overlay>
            <h2 class="heading heading-intro {{ headingClass }}" [innerHtml]="context?.__custom.blockTitle"></h2>
            <ng-content></ng-content>
             <div *ngIf="!noError">
                <amp-error [controlGroup]="context?.__controlGroup"></amp-error>
             </div>
             <div class="block-buttons mt-60 " *ngIf="withOkButton">
                 <amp-button
                    [context]="context"
                    *ngIf='!context?.isInSummaryState'
                    [attr.theme]=" buttonsTheme || theme"
                    (click)='context.onNext()'
                    [disabled]='!context?.canGoNext' class='btn btn-ok'>
                    OK
                </amp-button>
                <amp-button
                    [context]="context"
                    *ngIf='context?.isInSummaryState'
                    [attr.theme]="buttonsTheme || theme"
                    (click)='context.onEdit()'
                    class='btn btn-change palm-m0'>
                    Change
                </amp-button>
            </div>
            <div class='hr-block-divider'></div>
        </div>
    ` ,
    styles     : [ require( './amp-form-block.component.scss' ).toString() ]
} )
export class AmpFormBlockComponent implements OnInit {
    @Input( 'context' ) context;
    @Input( 'noError' ) noError;
    @Input( 'withOkButton' ) withOkButton          = true;
    @Input( 'withOverlay' ) withOverlay            = true;
    @Input( 'theme' ) theme;
    @Input( 'buttonsTheme' ) buttonsTheme;
    @Input( 'headingClass' ) headingClass : string = '';

    ngOnInit () : any {
        if ( ! this.context ) {
            console.error( 'Most of the amp-form-block functionalities would not be working because you have not' +
                ' passed in the context ' );
        }
        return undefined;
    }

    onKeyupEnter ( event ) {
        if ( event.target.tagName.toLowerCase() !== 'textarea' ) {
            this.context.onNext();
        }
    }
}
