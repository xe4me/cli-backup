import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmpGroupButtonComponent } from '../../../app/components/amp-group-button/amp-group-button.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-group-button-block-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-group-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGroupButtonComponentBasicUsage {
    control : FormControl            = new FormControl();
    private fullOrPartialButtons = {
        buttons       : [
            {
                id    : 'fullId' ,
                value : 'full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'partial' ,
                label : 'Partial sale'
            }
        ] ,
        fullOrPartial : 'fullOrPartial'
    };
    private color                = 'red';

    constructor ( private  themeService : ThemeService ) {
    }

    private onButtonClick () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }
}
