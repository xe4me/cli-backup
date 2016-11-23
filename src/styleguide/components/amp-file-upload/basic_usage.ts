import { Component } from '@angular/core';
import { AmpFileUploadComponent } from '../../../app/modules/amp-file-upload/components/amp-file-upload.component';
import { FormGroup } from "@angular/forms";

@Component( {
    templateUrl : 'src/styleguide/components/amp-file-upload/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpFileUploadComponent ] ,
    selector    : 'amp-file-upload-basic-usage'
} )

export default class AmpFileUploadComponentBasicUsage {
    private controlGroup = new FormGroup( { } );
}
