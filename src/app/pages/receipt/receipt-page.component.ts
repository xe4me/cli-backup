import { FormPage } from './../formPage';
import { Component } from 'angular2/core';
import { Router , CanDeactivate , ComponentInstruction } from 'angular2/router';
@Component( {
    selector : 'receipt-page' ,
    template : `
        <div class='receipt-page'>
            <div #nestedBlock></div>
        </div>
    ` ,
    styles   : [ require( './receipt-page.component' ).toString() ]
} )
export class ReceiptPageComponent extends FormPage implements CanDeactivate {
    static CLASS_NAME = 'ReceiptPageComponent';
    public content    = {
        id    : 'DefaultContentId' ,
        label : 'Default content label'
    };

    constructor ( public _router : Router ) {
        super();
    }

    routerCanDeactivate ( next : ComponentInstruction , prev : ComponentInstruction ) : any {
        return false;
    }
}
