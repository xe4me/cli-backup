import { Component , OnInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { AmpCheckboxComponent } from '../../../app/components/amp-checkbox/amp-checkbox.component';
import { ThemeService } from '../../services/theme';
import { ScrollService } from "../../../app/services/scroll/scroll.service";
@Component( {
    templateUrl : 'src/styleguide/components/amp-checkbox/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpCheckboxComponent ] ,
    selector    : 'amp-checkbox-basic-usage'
} )

export default class AMPCheckboxComponentBasicUsage implements OnInit {
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ 'acknowledge' ];
    }

    isInSummaryState    = false;
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
    }

    private check () {
        this.control.setValue( ! this.control.value );
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }
}
