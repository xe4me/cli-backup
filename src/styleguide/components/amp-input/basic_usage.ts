import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { AmpCurrencyPipe } from '../../../app/modules/amp-pipes/pipes/currency/amp-currency.pipe';
@Component(
    {
        selector : 'amp-input-basic-usage',
        templateUrl : './basic_usage.html',
        styles : [ require( './basic_usage.scss' ).toString() ]
    } )
export default class AmpInputBasicUsage {
    toggleFlag : boolean;
    private controlGroup : FormGroup = new FormGroup( {} );
    private dateControlGroup : FormGroup = new FormGroup( {} );
    private currencySymbol = AmpCurrencyPipe.currencySymbol;
    private currencyPipe = new AmpCurrencyPipe();

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }

    get control() {
        return this.controlGroup.controls[ 'firstname' ];
    }

    get dateControl() {
        return this.dateControlGroup.controls[ 'date' ];
    }
}
