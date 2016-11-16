import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {
    Params,
    ActivatedRoute
} from '@angular/router';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';
import {
    SubmitErrors
} from '../../shared/';

@Component( {
    selector    : 'submit-error-page' ,
    template : require( './submit-error-page.html' ),
    styles: [ require( './submit-error-page.scss' )],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SubmitErrorPage implements OnInit {
    private errorId : string;
    private errorHeader : string;
    private errorBody : string;
    constructor (private route : ActivatedRoute,
                 private _cd : ChangeDetectorRef ) {
    }
    public ngOnInit() {
        this.route.params.subscribe( (params : Params) => {
            this.errorId = params['errorId'];
            if (this.errorId === SubmitErrors.customerHasBetter) {
                this.errorHeader = `We're unable to create an additional AMP Bett3r Account`;
                this.errorBody = `It appears you already have a Bett3r account.
                                  If this is incorrect or you'd like to retrieve the exisitng account details,
                                  please contact us on 1300 735 979`;
            }
            this._cd.markForCheck();
        });
    };
    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }

}
