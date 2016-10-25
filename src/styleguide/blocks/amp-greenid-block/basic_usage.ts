
import { Component , OnInit , ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import {Environments} from "../../../app/abstracts/environments/environments.abstract";

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    directives  : [ AmpGreenidBlockComponent ] ,
    providers   : [ AmpGreenIdServices ],
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {
   /**
    * This script URLs input all of the libraries needed for the form
    */
     private scriptUrls : string[] = ['//test2.edentiti.com/df/javascripts/greenidConfig.js', '//test2.edentiti.com/df/javascripts/greenidui.min.js'];
    // The following are Kubernetes URLS & properties for the above settings
    // private scriptUrls : string[] = [Environments.property.ApiGreenIdConfig, Environments.property.ApiGreenIdUI];

    /**
     * This is the form action URL
     */
    private formAction   : string  = '//test2.edentiti.com/verification/simpleui-finish.seam';
    // The following are Kubernetes URLS & properties for the above settings
    // private formAction   : string  = Environments.property.ApiGreenIdFormAction;

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
        verificationId: '1FDW6whT1',
        verificationToken: '75b7ad90aac03bb7295f67c1044de1040d365b34',
        verficationStatus: 'un_verfied',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
        }
    };

    constructor ( private  themeService : ThemeService) {
    }

    ngOnInit () {

    }
}
