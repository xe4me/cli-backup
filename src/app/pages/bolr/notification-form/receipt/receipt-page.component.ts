import { FormPage } from './../../../formPage';
import { Component } from '@angular/core';
import { Router , CanDeactivate , ComponentInstruction } from '@angular/router-deprecated';
@Component( {
    selector : 'receipt-page' ,
    template : `
        <div class='receipt-page'>
            <div #nestedBlock></div>
        </div>
    ` ,
    styles   : [ require( './receipt-page.component.ts' ).toString() ]
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
