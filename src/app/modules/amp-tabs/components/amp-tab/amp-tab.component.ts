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

    @Input('id') id : string                     = '';
    @Input('value') value : string               = '';
    @Input('tab-title') title : string           = '';
    @Input('active') active : boolean            = false;
    @Input('randomizedId') randomizedId : string = '';
}
