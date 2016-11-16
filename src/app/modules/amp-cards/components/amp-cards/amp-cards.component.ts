import {
    Component ,
    Input ,
    ChangeDetectionStrategy
} from '@angular/core';

@Component( {
    selector        : 'amp-cards' ,
    template        : require( './amp-cards.component.html' ) ,
    styles          : [ require( './amp-cards.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )

export class AmpCardsComponent {

    @Input( 'cards' ) cards : any[] = [];
    @Input( 'offset' ) offset : boolean = false;

}
