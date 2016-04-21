import { Component , EventEmitter , Output } from 'angular2/core';
import { Control } from "angular2/src/common/forms/model";
@Component( {
                selector : 'amp-dropdown' ,
                template : `
                   <select [ngFormControl]="parentControl" #sel (change)='select.emit(sel.value)' name='holdersCount' 
                   id='holdersCount'>
                        <option selected value=''></option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                    </select>
                  ` ,
                styles   : [ require( './amp-dropdown.component.scss' ).toString() ] ,
                inputs   : [ 'parentControl' ] ,
                outputs  : [ 'select' ]
            } )
export class AmpDropdownComponent {
    private value : number = 1;
    private select         = new EventEmitter();
    private parentControl : Control;
}
