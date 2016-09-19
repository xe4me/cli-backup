import { Component , ChangeDetectorRef , ElementRef, Input } from '@angular/core';
import { AmpButton } from "../../../app/components/amp-button/amp-button.component";
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
import { FormBlock } from '../../../app/form-block';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
@Component( {
    selector   : 'amp-intro-block' ,
    directives : [ AmpButton, AmpCheckboxComponent ] ,
    template   : `
            <div class='{{ selectorName }} ph+ tablet-and-down-ph' id="{{ selectorName }}" [class.hidden]='!isActive'>
                <div class="grid__container 1/1 palm-1/1">
                    <div class="grid__item_floated utils__align&#45;&#45;left" >

                                <ng-content></ng-content>
                    </div>
                </div>
            </div>
    ` ,
    styles     : [ require( './amp-intro-block.component.scss' ).toString() ]
} )
export class IntroBlockComponent {

}
