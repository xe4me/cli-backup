import {
    Component ,
    Input
} from '@angular/core';

@Component( {
    selector        : 'amp-tab' ,
    template        : require( './amp-tab.component.html' ) ,
    styles          : [ require( './amp-tab.component.scss' ) ]
} )

export class AmpTabComponent {

    @Input('tabTitle') title : string = '';
    @Input('active') active : boolean = false;

}
