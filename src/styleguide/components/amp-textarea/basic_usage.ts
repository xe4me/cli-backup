import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-textarea-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-textarea/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ],
    directives  : [ AmpTextareaComponent ]
} )

export default class AMPTextareaComponentBasicUsage {
    control : FormControl = new FormControl();

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
