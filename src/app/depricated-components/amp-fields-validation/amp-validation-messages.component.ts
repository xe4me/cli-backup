import { Component , Host } from '@angular/core';
import { ValidationService } from 'amp-ddc-ui-core/ui-core';
import { Control } from '@angular/common';
import { ControlGroup } from '@angular/common';
import { ControlArray } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
@Component (
    {
        selector : 'validation-messages' ,
        inputs   : [ 'controlArray' ] ,
        template : `
                <div class='errors mt'>
                    <pre>{{ errors | json }}</pre>
                    <div *ngFor='#error of errors'>
                        <span class='icon icon--close icon-errors'></span>{{ error }}
                    </div>
                </div>
    <div *ngIf='errorMessage !== null'>{{errorMessage}}</div>
`
    } )
export class AmpValidationMessagesComponent {
    controlArray : ControlArray;
    private errors = [];

    get errorMessage () {
        for ( let propertyName in this.controlArray ) {
            if ( this.controlArray[ propertyName ].touched ) {
                for ( let error in this.controlArray[ propertyName ].errors ) {
                    this.errors.push ( ValidationService.getValidatorErrorMessage ( error ) );
                }
            }
        }
        return null;
    }
}
