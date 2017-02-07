import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
@Component( {
    selector        : 'footer' ,
    template        : require( './footer.component.html') ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './footer.component.scss').toString() ],
} )

export class Footer {
    constructor () {
    }
}
