import { Component } from '@angular/core';
import { ValuesPipe } from "../../pipes/values/values.pipe";
@Component(
    {
        selector : 'amp-error' ,
        template : `
        <div class='errors mt-25 mb-15'>
            <div *ngIf="!controlId">
                <div *ngFor="let aControl of controlGroup.controls | values">
                    <div *ngFor="let error of aControl.errors | values ; let i = index">
                        <div *ngIf="aControl.touched">
                            <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                            {{ error.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div *ngIf="controlId">
                <div *ngFor="let error of controlGroup.controls[controlId].errors | values ; let i = index">
                    <div *ngIf="controlGroup.controls[controlId].touched">
                        <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                        {{ error.text }}
                    </div>
                </div>
            </div>
        </div>
  ` ,
        styles   : [ require( './amp-error.scss' ).toString() ] ,
        inputs   : [
            'controlGroup' ,
            'controlId' ,
        ] ,
        pipes    : [ ValuesPipe ]
    } )
export class AmpErrorComponent {
}
