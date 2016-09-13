import { Component , ChangeDetectorRef , ElementRef } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpButton , AmpErrorComponent , AmpOverlayComponent } from '../../../../';
import { FormBlock } from '../../../app/form-block';
@Component( {
    selector   : 'intro-block' ,
    directives : [ AmpButton ] ,
    template   : `
    <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
        <div class="grid__container 1/1 palm-1/1">
            <div class="grid__item 6/9 palm-8/9 mt-10 utils__align&#45;&#45;left" >
                this is the block
            </div>
        </div>
    </div>
    ` ,
    styles     : [ require( './basic_usage.scss' ).toString() ]
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
