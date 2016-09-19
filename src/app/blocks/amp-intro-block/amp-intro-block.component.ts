import { Component , ChangeDetectorRef , ElementRef, Input } from '@angular/core';
import { AmpButton } from "../../../app/components/amp-button/amp-button.component";
import { FormBlock } from '../../../app/form-block';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
@Component( {
    selector   : 'amp-intro-block' ,
    directives : [ AmpButton ] ,
    template   : `
            <div class='{{ selectorName }} ph+ tablet-and-down-ph {{style}}' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class="grid__container 1/1 palm-1/1">
                    <div class="grid__item_floated utils__align&#45;&#45;left" >
                       <h2 class='intro-logo'>{{title}}</h2>
                                <ng-content></ng-content>
                    </div>
                </div>
            </div>
    ` ,
    styles     : [ require( './amp-intro-block.component.scss' ).toString() ]
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

    /**
    *
     * Title: Use this to set the title of the block, this sits with the logo and is hidden by default
     *
    * */

    _title: string = 'AMP Financial Planning';

    @Input()
    set title(title: string) {
        this._title = (title && title.trim()) || '';
    }

    get title() { return this._title; }


}
