
import { Component , OnInit , ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    directives  : [ AmpGreenidBlockComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {

    public controlGroup : FormGroup = new FormGroup( {} );
    public isInSummaryState    = false;
    private acknowledge = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private  themeService : ThemeService ,
                  private _cd : ChangeDetectorRef ,
                  private elementRef : ElementRef ) {
    }

    get control () {
        return this.controlGroup.controls[ 'acknowledge' ];
    }

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {

    }

    private check () {
        this.control.setValue( ! this.control.value );
    }

    private onAcknowledgeSelect ( value ) {
       // console.log('value', value );
    }


}
