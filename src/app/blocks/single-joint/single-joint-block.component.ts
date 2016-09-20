import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService } from 'amp-ddc-components';
@Component( {
    selector        : 'single-joint-block' ,
    template        : `
        <div class="utils__align--left" >
            <h1 class="heading heading-intro color-vlack">
                Just for you or with someone else?
            </h1>
            <p class='mt-50'>
                Please let us know if you would like to set up the account in your name or with someone else
            </p>
            <amp-button
                [context]="context()"
                class='btn btn-ok mt+'
                (click)='onNext()'>
                Single
            </amp-button>
            <amp-button
                [context]="context()"
                class='btn btn-ok mt+'
                (click)='onNext()'>
                Joint
            </amp-button>
        </div>
    ` ,
    styles          : [ require( './single-joint-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleJointBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
