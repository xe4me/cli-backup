import { Component , AfterViewInit , ChangeDetectorRef , ViewChild } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpDropdownComponent } from '../../../app/modules/amp-dropdown-new';
@Component( {
    templateUrl : 'src/styleguide/components/amp-dropdown/basic_usage.html' ,
    styles   : [ require( './basic_usage.scss' ).toString() ] ,
    selector : 'amp-dropdown-new-basic-usage'
} )

export default class AMPDropDownNewComponentBasicUsage implements AfterViewInit {
    @ViewChild( 'dropDown' ) dropDown : AmpDropdownComponent;
    private controlGroup : FormGroup          = new FormGroup( {} );
    private retrievedControlGroup : FormGroup = new FormGroup( {
        'CountryDropdown' : new FormGroup( {
            'SelectedItem' : new FormControl( 'AUS' ) ,
            'Query'        : new FormControl( 'Australia' )
        } )
    } );
    private isInSummaryState                  = false;
    private titleOptions                      = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];
    private acknowledge                       = {
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

    get TitleDropdownControlGroup () {
        return <FormGroup> this.controlGroup.controls[ 'Title' + AmpDropdownComponent.DROPDOWN_CONTROL_GROUP_NAME ];
    }

    get CountryDropdownControlGroup () {
        return <FormGroup> this.controlGroup.controls[ 'Country' + AmpDropdownComponent.DROPDOWN_CONTROL_GROUP_NAME ];
    }

    get TitleControl () {
        return this.TitleDropdownControlGroup.controls[ AmpDropdownComponent.QUERY_CONTROL_NAME ];
    }

    get CountryControl () {
        return this.CountryDropdownControlGroup.controls[ AmpDropdownComponent.QUERY_CONTROL_NAME ];
    }

    private setTo ( _value ) {
        this.TitleControl.setValue( _value );
    }

    private onAcknowledgeSelect ( value ) {
    }
}
