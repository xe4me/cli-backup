import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';

@Component( {
    selector        : 'amp-confirmation-page',
    template        : require( './amp-confirmation-page.component.html' ),
    styles          : [ require( './amp-confirmation-page.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpConfirmationPageComponent {

    @Input() title;

    public onPdfButtonClick() {
        console.log( 'onPdfButtonClick' );
    }

}
