import { Component , AfterViewInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Highlight } from '../../highlight';
import { AmpReCaptchaComponent } from '../../../app/modules/amp-google-recaptcha/components/amp-recaptcha.component';
import {Environments} from '../../../app/abstracts/environments/environments.abstract';
@Component( {
    templateUrl : 'src/styleguide/components/amp-google-recaptcha/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        Highlight
    ] ,
    selector    : 'amp-google-recaptcha-basic-usage'
} )

export default class AmpGoogleRecaptchaComponentBasicUsage  {
    public __controlGroup   = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom         = {
        controls : [
            {
                id       : 'amp-manual' ,
                required : true
            }
        ]
    };
    private form : FormGroup;
    // private sitekey : string = process.env.GoogleRecaptchaSiteKey; // check the sitekey value in webpack.[dev|test|prod].js
    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey; // check the sitekey value in /config.js

    constructor ( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

    ngAfterViewInit () : void {
    }

    private handleCaptchaResponse(captchaResponse : any) {
        console.log('captchaResponse', captchaResponse);
        // if (captchaResponse && !captchaResponse.success) {
        //     // let's reset
        //     console.log('Resetting the captcha');
        //     captchaResponse.recaptcha.reset();
        // }
    }
}
