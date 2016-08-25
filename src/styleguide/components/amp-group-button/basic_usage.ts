import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpGroupButtonComponent } from '../../../app/components/amp-group-button/amp-group-button.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-group-button-block-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-group-button/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ FORM_DIRECTIVES , AmpGroupButtonComponent , CORE_DIRECTIVES ]
} )

export default class AmpGroupButtonComponentBasicUsage {
    control : Control            = new Control();
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
