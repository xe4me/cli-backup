import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    templateUrl : './basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )
export default class AmpGreenIdBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    /**
     * This script URLs input all of the libraries needed for the form
     */
    private configScriptUrl = 'https://test2.edentiti.com/df/javascripts/greenidConfig.js';
    private uiScriptUrl = 'https://test2.edentiti.com/df/javascripts/greenidui.min.js';
    private styleUrl = 'https://test2.edentiti.com/df/assets/stylesheets/greenid.css';
    // The following are Kubernetes URLS & properties for the above settings
    // private scriptUrls : string[] = [Environments.property.ApiGreenIdConfig, Environments.property.ApiGreenIdUI];

    /**
     * This model is for testing purpose only
     */
        // FIXME Move that to the __form as it will be searched in here by the component itself
    private modelValue  = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        title: 'Mr',
        dateOfBirth:  '12/04/2001',
        email: 'sample@test.com',
        verificationId: 'fred',
        verificationToken: 'fred',
        verificationStatus: 'fred',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
        }
    };

    constructor ( public store : Store<any>,
                  private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }

}
