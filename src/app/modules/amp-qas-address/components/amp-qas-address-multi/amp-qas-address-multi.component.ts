import { Component , AfterViewInit } from '@angular/core';
import { AmpQasAddressService , AddressFormatTypes } from '../../services/amp-qas-address.service';
@Component( {
    selector : 'amp-qas-address-multi' ,
    template : require( './amp-qas-address-multi.component.html' ) ,
    styles   : [ require( './amp-qas-address-multi.component.scss' ).toString() ]
} )
export class AmpQasAddressMultiComponent implements AfterViewInit {
    ngAfterViewInit () : void {
    }
}
