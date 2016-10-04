import { Component , AfterViewInit , ChangeDetectorRef , ViewChild } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { AmpDropdownComponent } from '../../../app/modules/amp-dropdown';
@Component( {
    templateUrl : 'src/styleguide/components/amp-dropdown/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    selector    : 'amp-dropdown-basic-usage'
} )

export default class AMPDropDownComponentBasicUsage implements AfterViewInit {
    @ViewChild( 'dropDown' ) dropDown : AmpDropdownComponent;
    private controlGroup : FormGroup = new FormGroup( {} );
    private isInSummaryState         = false;
    private titleOptions             = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];
    private acknowledge              = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    get control () {
        return this.controlGroup.controls[ 'Title' ];
    }

    private setTo ( _value ) {
        this.dropDown.setSelectValue( _value );
    }

    private onAcknowledgeSelect ( value ) {
    }
}
