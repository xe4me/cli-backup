
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
    private okAccepted         = false;
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
        dateOfBirth: '27/11/2013',
        email: 'sample@test.com',
        verificationId: "1FDW6whT1",
        verificationToken: '75b7ad90aac03bb7295f67c1044de1040d365b34',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
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

    private onOk( value ) {
        this.okAccepted = true;
        // this._cd.markForCheck();
    }

    private onContinue( value ) {

        this._AmpGreenIdServices
            .getTheToken(this.modelValue)
            .subscribe( ( respo ) => {
            });
    }

}
