import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpTextareaComponent } from '../../../app/components/amp-textarea/amp-textarea.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-textarea-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-textarea/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpTextareaComponent ]
} )

export default class AMPTextareaComponentBasicUsage {
    controlGroup : FormGroup = new FormGroup( {} );

    get control () {
        return this.controlGroup.controls[ 'textarea' ]
    }

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
