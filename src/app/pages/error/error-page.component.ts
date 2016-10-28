import { Component } from '@angular/core';

import {
    Router ,
    CanDeactivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { LicenseesAbstract } from '../../abstracts/licensee/licensee.abstract';

@Component( {
    selector : 'error-page' ,
    template : `
        <div class='error-page'>
            <div class='error-page_logo logo--{{ logoImage }}'></div>
            <div class='error-page_message'>
                <h3>{{headline}}</h3>
                <br>
                {{message}}
            </div>
        </div>
    ` ,
    styles   : [ require( './error-page.component.scss' ).toString() ] ,
    inputs : [
        'headline' ,
        'message' ,
        'logoImage'
    ]
} )
export class ErrorPageComponent implements CanDeactivate<ErrorPageComponent> {
    static CLASS_NAME = 'ErrorPageComponent';

    public logoImage : string = '';

    public content    = {
        id    : 'DefaultContentId' ,
        label : 'Default content label'
    };

    constructor () {
        this.logoImage = LicenseesAbstract.hasLicensee(this.logoImage) ? this.logoImage : 'DEA_ASSURED';
    }

    canDeactivate ( component : ErrorPageComponent , route : ActivatedRouteSnapshot ,
                    state : RouterStateSnapshot ) : Observable<boolean>|Promise<boolean>|boolean {
        return false;
    }
}
