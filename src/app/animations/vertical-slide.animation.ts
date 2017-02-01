import { trigger, state, style, animate, transition } from '@angular/core';
export function VerticalSlide ( duration ) {
    return trigger(
        'slideUp',
        [
            state( 'collapsed, void', style( {
                height           : '0px',
                'min-height'     : '0px',
                opacity          : '0',
                'padding-left'   : '0px',
                'padding-right'  : '0px',
                'padding-bottom' : '0px',
                'padding-top'    : '0px',
                display          : 'none'
            } ) ),
            state( 'expanded', style( {
                height           : '*',
                'min-height'     : '*',
                opacity          : '1',
                'padding-left'   : '*',
                'padding-right'  : '*',
                'padding-bottom' : '*',
                'padding-top'    : '*',
                display          : 'block'
            } ) ),
            transition(
                'collapsed <=> expanded', [ animate( duration ) ] )
        ] );
}
