import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ActivatedRoute,
    Params
} from '@angular/router';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector    : 'save-confirmation-page' ,
    template : require( './save-confirmation-page.html' ),
    styles: [ require( './save-confirmation-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SaveConfirmationPage {
    private referenceNumber : string;
    constructor(private route : ActivatedRoute) {
    }
    public ngOnInit() {
        this.route.params.subscribe( (params : Params) => {
            this.referenceNumber = params['ref'];
        });
    }

    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }
}
