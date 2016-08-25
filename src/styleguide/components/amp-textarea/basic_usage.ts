import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from '@angular/common';
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-textarea-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-textarea/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ FORM_DIRECTIVES , AmpTextareaComponent , CORE_DIRECTIVES ]
} )

export default class AMPTextareaComponentBasicUsage {
    control : Control = new Control();

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
