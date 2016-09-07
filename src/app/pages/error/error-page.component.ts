import { FormPage } from '../../formPage';
import { Component } from '@angular/core';
import { ThemeIDDirective } from '../../directives/themeId.directive';
import { Router , CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component( {
    selector : 'error-page' ,
    template : `
        <div class='error-page'>
            <div class='error-page_logo'></div>
            <div class='error-page_message'>
                <h3>{{headline}}</h3>
                <br>
                {{message}}
            </div>
        </div>
    ` ,
    styles    : [ require( './error-page.component.scss' ).toString() ],
    directives: [ThemeIDDirective],
    inputs    : ['headline', 'message']
} )
export class ErrorPageComponent extends FormPage implements CanDeactivate<ErrorPageComponent> {
    static CLASS_NAME = 'ErrorPageComponent';
    public content    = {
        id    : 'DefaultContentId' ,
        label : 'Default content label'
    };

    constructor ( public _router : Router ) {
        super();
    }

    canDeactivate( component: ErrorPageComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>|Promise<boolean>|boolean {
        return false;
    }
}
