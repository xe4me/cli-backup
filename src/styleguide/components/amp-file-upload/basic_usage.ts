import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { AmpFileUploadComponent } from '../../../app/components/amp-file-upload/amp-file-upload.component';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
@Component( {
    templateUrl : 'src/styleguide/components/amp-file-upload/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpFileUploadComponent ] ,
    selector    : 'amp-file-upload-basic-usage'
} )

export default class AmpFileUploadComponentBasicUsage implements AfterViewInit {
    controlGroup : FormGroup = new FormGroup( {} );

    isInSummaryState    = false;

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {
    }

    private onAcknowledgeSelect ( value ) {
    }
}
