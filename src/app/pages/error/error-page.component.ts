import { Component } from '@angular/core';

import {
    Router ,
    CanDeactivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AmpLogoComponent } from '../../modules/amp-logo/components/amp-logo/amp-logo.component';

@Component( {
    selector : 'error-page' ,
    template : `
        <div class='error-page'>
            <div class='error-page__row'>
                <div class='error-page__logo'>
                    <amp-logo [licensee]="logoImage"></amp-logo>
                </div>
            </div>
            <div class='error-page__row'>
                <div class='error-page__message'>
                    <div class='error-page__message-inner'>
                        <h3>{{headline}}</h3>
                        <br>
                        {{message}}
                    </div>
                </div>
            </div>
        </div>
    ` ,
    styles   : [ require( './error-page.component.scss' ).toString() ] ,
    inputs : [
        'headline' ,
        'message' ,
        'logoImage'
    ],
    directives : [ AmpLogoComponent ]
} )
export class ErrorPageComponent implements CanDeactivate<ErrorPageComponent> {
    static CLASS_NAME = 'ErrorPageComponent';

    public logoImage : string = '';

    public content    = {
        id    : 'DefaultContentId' ,
        label : 'Default content label'
    };

    canDeactivate ( component : ErrorPageComponent , route : ActivatedRouteSnapshot ,
                    state : RouterStateSnapshot ) : Observable<boolean>|Promise<boolean>|boolean {
        return false;
    }
}
