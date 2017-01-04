import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpDropdownComponent } from '../../../app/modules/amp-dropdown';
import { AmpFormGroup } from '../../../app/base-control';
@Component( {
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ],
    selector : 'amp-dropdown-basic-usage'
} )

export default class AMPDropDownComponentBasicUsage implements AfterViewInit {
    @ViewChild( 'dropDown' ) dropDown : AmpDropdownComponent;
    private controlGroup : AmpFormGroup = new AmpFormGroup( {} );
    private retrievedControlGroup : AmpFormGroup = new AmpFormGroup( {
        'CountryDropdown' : new AmpFormGroup( {
            'SelectedItem' : new FormControl( 'AUS' ),
            'Query' : new FormControl( 'Australia' )
        } )
    } );
    private isInSummaryState = false;
    private titleOptions = [
        { value : 'mr', label : 'Mr' },
        { value : 'mrs', label : 'Mrs' },
        { value : 'miss', label : 'Miss' },
        { value : 'ms', label : 'Ms' },
        {
            value : 'aLongLabel', label : 'Rather than continue building infrastructure around the npm client, we' +
        ' decided to try looking at the problem more holistically. '
        }
    ];
    private acknowledge = {
        id : 'acknowledge',
        disabled : false,
        required : true,
        checked : false,
        scrollOutOn : null
    };

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
        this.controlGroup.__fdn = [ 'Application', 'ContactDetails' ];
        this.retrievedControlGroup.__fdn = [ 'Application', 'ContactDetails' ];
    }

    ngAfterViewInit() {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    get TitleDropdownControlGroup() {
        return <AmpFormGroup> this.controlGroup.controls[ 'Title' + AmpDropdownComponent.DROPDOWN_CONTROL_GROUP_NAME ];
    }

    get CountryDropdownControlGroup() {
        return <AmpFormGroup> this.controlGroup.controls[ 'Country' + AmpDropdownComponent.DROPDOWN_CONTROL_GROUP_NAME ];
    }

    get TitleControl() {
        return this.TitleDropdownControlGroup.controls[ AmpDropdownComponent.QUERY_CONTROL_NAME ];
    }

    get CountryControl() {
        return this.CountryDropdownControlGroup.controls[ AmpDropdownComponent.QUERY_CONTROL_NAME ];
    }

    private setTo( _value ) {
        this.TitleControl.setValue( _value );
    }

    private onAcknowledgeSelect( value ) {
    }
}
