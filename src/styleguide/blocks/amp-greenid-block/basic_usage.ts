
import { Component , OnInit , ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    directives  : [ AmpGreenidBlockComponent ] ,
    providers   : [ AmpGreenIdServices ],
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {

    public controlGroup : FormGroup = new FormGroup( {} );
    public isInSummaryState    = false;
    private acceptTerms        = false;
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    private modelValue = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        honorific: 'Mr',
        dateOfBirth: '2001-04-12',
        email: 'sample@test.com',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            streetType: 'RD',
            suburb: 'SYDNEY'
        }
    };
    constructor ( private  themeService : ThemeService ,
                  private _cd : ChangeDetectorRef ,
                  private elementRef : ElementRef,
                  private _AmpGreenIdServices : AmpGreenIdServices  ) {
    }

    get control () {
        return this.controlGroup.controls[ 'acknowledge' ];
    }

    ngOnInit () {

    }

    private check () {
        this.control.setValue( ! this.control.value );
    }

    private onAcknowledgeSelect ( value ) {

        this.acceptTerms = value;

    }

    private onContinue( value ) {

        console.log(value);

        this._AmpGreenIdServices
            .registerCustomer(this.modelValue)
            .subscribe( ( respo ) => {
                console.log('respo ', respo);
            });
    }

}
