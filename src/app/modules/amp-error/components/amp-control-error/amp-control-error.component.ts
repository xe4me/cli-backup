import {
    Component,
    ContentChild,
    TemplateRef,
    Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component( {
    queries : {
        itemTemplate : new ContentChild( TemplateRef )
    },
    selector : 'amp-control-error',
    template : require( './amp-control-error.component.html' ),
    styles : [ require( './amp-control-error.component.scss' ).toString() ]
} )
export class AmpControlErrorComponent {
    @Input() control : FormGroup;
}
