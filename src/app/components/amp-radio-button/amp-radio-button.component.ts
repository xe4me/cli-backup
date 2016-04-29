import {
    Component
} from 'angular2/core';
import { MATERIAL_DIRECTIVES } from "ng2-material/all";
import { MATERIAL_PROVIDERS } from "ng2-material/all";
import { ViewEncapsulation } from "angular2/src/core/metadata/view";
@Component( {
    selector      : 'amp-radio-button' ,
    template      : `
                    <md-radio-group [value]="'Banana'">
                        <md-radio-button value="Apple" >Apple</md-radio-button>
                        <md-radio-button value="Banana" > Banana</md-radio-button>
                        <md-radio-button value="Mango" >Mango</md-radio-button>  
                    </md-radio-group>
                ` ,
    inputs        : [] ,
    styles        : [ require( './amp-radio-button.scss' ).toString() ] ,
    providers     : [ MATERIAL_PROVIDERS ] ,
    directives    : [ MATERIAL_DIRECTIVES ] ,
    encapsulation : ViewEncapsulation.None
} )
export class AmpRadioButtonComponent {
    any                = {
        group1 : 'Banana' ,
        group2 : '2' ,
        group3 : 'avatar-1'
    };
    avatarData : any[] = [
        {
            id    : 'public/images/avatars/avatar1.svg' ,
            title : 'avatar 1' ,
            value : 'avatar-1'
        } , {
            id    : 'public/images/avatars/avatar2.svg' ,
            title : 'avatar 2' ,
            value : 'avatar-2'
        } , {
            id    : 'public/images/avatars/avatar3.svg' ,
            title : 'avatar 3' ,
            value : 'avatar-3'
        }
    ];
    radioData : any[]  = [
        { label : '1' , value : 1 } ,
        { label : '2' , value : 2 } ,
        { label : '3' , value : '3' , isDisabled : true } ,
        { label : '4' , value : '4' }
    ];

    addItem () {
        var r = Math.ceil( Math.random() * 1000 );
        this.radioData.push( { label : r , value : r } );
    }

    removeItem () {
        this.radioData.pop();
    }
}


