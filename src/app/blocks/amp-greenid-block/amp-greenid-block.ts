import {
    Component ,
    trigger ,
    state ,
    style ,
    animate ,
    transition,
    OnInit
} from '@angular/core';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
@Component( {
    selector   : 'amp-greenid-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    providers: [AmpGreenIdServices],
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

    constructor ( private _AmpGreenIdServices : AmpGreenIdServices ) {

    }

}
