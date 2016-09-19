import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService }
        from 'amp-ddc-components';
@Component( {
    selector        : 'welcome-block' ,
    template        : `
        <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class='intro-logo mb+'></div>
                <div class="utils__align--center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align--left" >
                    <h1 class="heading heading-intro color-vlack">
                        Welcome
                    </h1>
                    <p class='mt-50'>
                        To the smarter way to manage your money.  Please choose how you would like to continue.
                    </p>
                    <amp-button
                        [context]="context()"
                        class='btn btn-ok mt+'
                        (click)='onNext()'>
                        New Application
                    </amp-button>
                    <amp-button
                        [context]="context()"
                        class='btn btn-ok mt+'
                        (click)='onNext()'>
                        Continue Application
                    </amp-button>
                </div>
            </div>
        </div>
    ` ,
    styles          : [ require( './welcome-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class WelcomeBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
