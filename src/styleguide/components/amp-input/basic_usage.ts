import {
    ViewChild,
    Component,
    ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpCurrencyPipe } from '../../../app/modules/amp-pipes/pipes/currency/amp-currency.pipe';
@Component(
    {
        selector : 'amp-input-basic-usage',
        templateUrl : 'src/styleguide/components/amp-input/basic_usage.html',
        styles : [ require( './basic_usage.scss' ).toString() ]
    } )
export default class AmpInputBasicUsage {
    @ViewChild('inputWithAgeError') inputWithAgeError;
    toggleFlag : boolean;
    dynamicErrors = {
        minAge: 'You should be older than 18.'
    };

    private controlGroup : FormGroup = new FormGroup( {} );

    private currencySymbol = AmpCurrencyPipe.currencySymbol;
    private currencyPipe = new AmpCurrencyPipe();

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }

    get control() {
        return this.controlGroup.controls[ 'currency' ];
    }

    private updateError(){
        this.dynamicErrors.minAge = 'You\'re still bellow 18 man :)';
        this.inputWithAgeError.setAmpErrors();
    }
}
