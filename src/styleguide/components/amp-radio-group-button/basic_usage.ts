import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-radio-group-button-block-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-radio-group-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpRadioGroupButtonComponentBasicUsage implements AfterViewInit {
    oneOptioncontrolGroup : FormGroup      = new FormGroup( {} );
    multipleOptioncontrolGroup : FormGroup = new FormGroup( {} );

    get oneOptionControl () {
        return this.oneOptioncontrolGroup.controls[ this.radiosOneOption.groupName ];
    }

    get multipleOptionControl () {
        return this.multipleOptioncontrolGroup.controls[ this.radiosMultipleOptions.groupName ];
    }

    public radiosOneOption            = {
        buttons   : [
            {
                id    : 'five_years' ,
                value : 'five_years' ,
                label : 'At least five years'
            }
        ] ,
        groupName : 'practiceAssociation'
    };
    public radiosMultipleOptions      = {
        buttons   : [
            {
                id    : 'five_years2' ,
                value : 'five_years2' ,
                label : 'At least five years'
            } ,
            {
                id    : 'fewer_than_five_years' ,
                value : 'fewer_than_five_years' ,
                label : 'Fewer than five years'
            } ,
            {
                id    : 'more_than_five_years' ,
                value : 'more_than_five_years' ,
                label : 'More than five years'
            } ,
            {
                id    : 'amazing_value' ,
                value : 'amazing_value' ,
                label : 'How amazing this radio button is '
            }
        ] ,
        groupName : 'amazingRadioButtonGroupName' ,
        required  : true ,
        disabled  : false
    };
    private autoSelectOnOne : boolean = true;
    private color                     = 'red';

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    private addToMultipleOptions () {
        this.radiosMultipleOptions.buttons.push( {
            id    : 'random_value' + this.radiosMultipleOptions.buttons.length ,
            value : 'random_value' + this.radiosMultipleOptions.buttons.length ,
            label : 'This is the random option number ' + this.radiosMultipleOptions.buttons.length
        } );
    }

    private toggleRequired () {
        this.radiosMultipleOptions.required = ! this.radiosMultipleOptions.required;
    }

    private onOneRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }

    private onMultipleRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }
}
