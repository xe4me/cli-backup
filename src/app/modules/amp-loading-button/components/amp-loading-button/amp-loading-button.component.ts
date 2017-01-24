import {
    Component,
    Input
} from '@angular/core';
import { AmpLoadingService } from '../../services/amp-loading/amp-loading.service';

@Component( {
    selector : 'amp-loading-button',
    template : require( './amp-loading-button.component.html' ),
    styles   : [ require( './amp-loading-button.component.scss' ) ]
} )

export class AmpLoadingButtonComponent {
    @Input('theme') theme;
    constructor ( private loadingService : AmpLoadingService ) {
    }
}
