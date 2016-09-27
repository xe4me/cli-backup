import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    Input ,
    ChangeDetectionStrategy ,
    trigger ,
    state ,
    style ,
    animate ,
    transition
} from '@angular/core';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
@Component( {
    selector   : 'amp-intro-block' ,
    directives : [ AmpButton , AmpCheckboxComponent ] ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    template   : `
            <div class='{{ selectorName }} ph+ tablet-and-down-ph' id='{{ selectorName }}' [class.hidden]='!isActive'>
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align&#45;&#45;left' >
                                <ng-content></ng-content>
                    </div>
                </div>
            </div>
    ` ,
    styles     : [ require( './amp-intro-block.component.scss' ).toString() ] ,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' , padding : 0 } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , overflow : 'hidden' , display : 'block' } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )
export class IntroBlockComponent {
    private slideUp = 'expanded';

    /**
     * Call this method to move onto the next block
     * */
    private hide () {
        this.slideUp = 'collapsed';
        setTimeout( () => {
            // TODO: uncomment this for use inside a block
            // this.onNext();
        } , 800 );
    }
}
