import {
    Component ,
    trigger ,
    state ,
    style ,
    animate ,
    transition
} from '@angular/core';

@Component( {
    selector   : 'amp-greenid-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    template   : `
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align&#45;&#45;left' >
                                <ng-content></ng-content>
                    </div>
                </div>
    ` ,
    styles     : [ require( './amp-greenid-block.component.scss' ).toString() ] ,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , display : 'block' } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )
export class AmpGreenidBlockComponent {
    private slideUp = 'expanded';

    /**
     * Call this method to move onto the next block
     *
     * In order to call this in your form you need to import the context of this component into your class, for a sample of how to do this, see the styleguide implementation of the amp-intro-block.
     *
     *
     */
    public proceed () {
        this.slideUp = 'collapsed';
    }
}
