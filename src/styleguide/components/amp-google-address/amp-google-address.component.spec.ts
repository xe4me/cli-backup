import {
    it ,
    inject ,
    injectAsync ,
    describe ,
    beforeEachProviders ,
    TestComponentBuilder
} from 'angular2/testing';
import { Component , provide } from 'angular2/core';
import { BaseRequestOptions , Http } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from 'angular2/common';
// Load the implementations that should be tested
import { AMPGoogleAddressComponent } from '../../../app/components/amp-google-address/amp-google-address.component';
describe( 'amp-google-address getAddressComponent' , () => {
    let google_address_result = {
        'address_components' : [
            {
                'long_name'  : '1600' ,
                'short_name' : '1600' ,
                'types'      : [ 'street_number' ]
            } ,
            {
                'long_name'  : 'Amphitheatre Pkwy' ,
                'short_name' : 'Amphitheatre Pkwy' ,
                'types'      : [ 'route' ]
            } ,
            {
                'long_name'  : 'Mountain View' ,
                'short_name' : 'Mountain View' ,
                'types'      : [ 'locality' , 'political' ]
            } ,
            {
                'long_name'  : 'Santa Clara County' ,
                'short_name' : 'Santa Clara County' ,
                'types'      : [ 'administrative_area_level_2' , 'political' ]
            } ,
            {
                'long_name'  : 'California' ,
                'short_name' : 'CA' ,
                'types'      : [ 'administrative_area_level_1' , 'political' ]
            } ,
            {
                'long_name'  : 'United States' ,
                'short_name' : 'US' ,
                'types'      : [ 'country' , 'political' ]
            } ,
            {
                'long_name'  : '94043' ,
                'short_name' : '94043' ,
                'types'      : [ 'postal_code' ]
            }
        ]
    };
    it( 'should return just the street_number' , () => {
        expect( AMPGoogleAddressComponent.getAddressComponent( [ 'street_number' ] , true , google_address_result.address_components ) ).toEqual( '1600' );
    } );
    it( 'should return All address components that is of type political' , () => {
        expect( AMPGoogleAddressComponent.getAddressComponent( [ 'political' ] , true , google_address_result.address_components ) ).toEqual( 'Mountain View Santa Clara County CA US' );
    } );
    it( 'should return the long name of the country' , () => {
        expect( AMPGoogleAddressComponent.getAddressComponent( [ 'country' ] , false , google_address_result.address_components ) ).toEqual( 'United States' );
    } );
    it( 'should return the combination of street_number and route' , () => {
        expect( AMPGoogleAddressComponent.getAddressComponent( [
            'street_number' ,
            'route'
        ] , true , google_address_result.address_components ) ).toEqual( '1600 Amphitheatre Pkwy' );
    } );
} );
