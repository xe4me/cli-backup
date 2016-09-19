import { Component , ChangeDetectorRef , ElementRef, Input } from '@angular/core';
import { AmpButton } from "../../../app/components/amp-button/amp-button.component";
import { FormBlock } from '../../../app/form-block';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
@Component( {
    selector   : 'intro-block' ,
    directives : [ AmpButton ] ,
    template   : `
            <div class='{{ selectorName }} ph+ tablet-and-down-ph {{style}}' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class="grid__container 1/1 palm-1/1">
                    <div class="grid__item_floated utils__align&#45;&#45;left" >
                       <h2 class='intro-logo'>AMP Financial Planning</h2>
                           <div class="intro-list-container">
                                <article class="intro-article grid__item_floated 1/1">
                                    <ul class="intro-list">
                                    <li class="list-item"><label class="intro-label">ABC Financial Planning</label> </li>
                                    <li class="list-item"><label class="intro-label">PayeeID: </label> <label class="intro-value">123456</label></li>
                                    <li class="list-item"><label class="intro-label">Practice principle: </label> <label class="intro-value">John Smith</label></li>
                                    </ul>
                                </article>
                                <h3 class="intro-message-heading heading heading-intro mb+">Hi John, You're about to request to exercise your buyer of the last resort facility. (BOLR). </h3>
                                <p class="intro-tagline"><strong>We just need a few details, it won't take long</strong> </p>
                                 <amp-button
                                    [context]="context()"
                                    class='btn btn-ok'
                                    (click)='onNext()'>
                                 Ok
                                </amp-button>
                          </div>
                    </div>
                </div>
            </div>
    ` ,
    styles     : [ require( './intro-block.component.scss' ).toString() ]
} )
export class IntroBlockComponent{
    /**
     * Use this property to set custom styles for the block.
     *
     * Set css classes are:
     *
     * branded: dark blue bg
     * */
    _style: string = 'branded';

    @Input()
    set style(style: string) {
        this._style = (style && style.trim()) || '';
    }

    get style() { return this._style; }

    context () {

    }
}
