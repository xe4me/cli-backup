import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme';
import {Environments} from '../../../app/abstracts/environments/environments.abstract';
import {AmpGreenIdServices} from '../../../app/modules/amp-greenid-block/components/services/amp-greenid-service';

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {
   /**
    * This script URLs input all of the libraries needed for the form
    */
     private scriptUrls : string[] = ['//test2.edentiti.com/df/javascripts/greenidConfig.js', '//test2.edentiti.com/df/javascripts/greenidui.min.js'];
    // The following are Kubernetes URLS & properties for the above settings
    //private scriptUrls : string[] = [Environments.property.ApiGreenIdConfig, Environments.property.ApiGreenIdUI];

    /**
     * This model is for testing purpose only
     */
    private modelValue = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        honorific: 'Mr',
        dateOfBirth2: '27/11/2013',
        dateOfBirth:  '2001-04-12',
        email: 'sample@test.com',
        verificationId: 'fred',
        verificationToken: 'fred',
        verficationStatus: 'fred',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
        }
    };

    constructor ( private  themeService : ThemeService,
                  private ampGreenIdServices : AmpGreenIdServices ) {
    }

    ngOnInit () {

    }
}
