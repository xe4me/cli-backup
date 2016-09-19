import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService } from "amp-ddc-components";
@Component( {
    selector        : 'intro-block' ,
    directives      : [ AmpButton ] ,
    template        : `
        <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class='intro-logo mb+'></div>
                <div class="utils__align--center mb-60" >
                    <div class="grid__item 6/9 palm-8/9 mt-10 utils__align--left" >
                    <h1 class="heading heading-intro color-white">
                        Have we met before?
                    </h1>
                    <p class='mt-50'>
                        Please let us know if we know each other already or starting out a fresh
                    </p>
                    <amp-button
                        [context]="context()"
                        class='btn btn-ok mt+'
                        (click)='onNext()'>
                        New customer
                    </amp-button>
                    <amp-button
                        [context]="context()"
                        class='btn btn-ok mt+'
                        (click)='onNext()'>
                        Existing customer
                    </amp-button>
                </div>
            </div>
        </div>
    ` ,
    styles          : [ require( './intro-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IntroBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
