import {
    Component ,
    Input ,
    ChangeDetectionStrategy
} from '@angular/core';

@Component( {
    selector        : 'amp-card' ,
    template        : require( './amp-card.component.html' ) ,
    styles          : [ require( './amp-card.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )

export class AmpCardComponent {

    @Input( 'click' ) click;
    @Input( 'image' ) image : string = '';
    @Input( 'href' ) href : string = '#';
    @Input( 'text' ) text : string = '';

    public clickEvent ( $event ) {
        if (this.href === '#') {
            $event.preventDefault();
        }
    }
}
