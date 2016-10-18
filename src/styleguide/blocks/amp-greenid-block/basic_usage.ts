
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
        console.log('AmpGreenIdServices: ', this._AmpGreenIdServices );
        console.log('value', value );

        this.acceptTerms = value;

    }

    private onContinue( value ) {


    }

}
