import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component( {
    selector : 'amp-textarea-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ]
} )

export default class AMPTextareaComponentBasicUsage {
    controlGroup : FormGroup = new FormGroup( {} );

    get control() {
        return this.controlGroup.controls[ 'textarea' ];
    }

    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef ) {
    }
}
