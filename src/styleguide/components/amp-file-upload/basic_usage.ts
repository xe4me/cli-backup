import { Component } from '@angular/core';
import { AmpFileUploadComponent } from '../../../app/components/amp-file-upload/amp-file-upload.component';

@Component( {
    templateUrl : 'src/styleguide/components/amp-file-upload/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpFileUploadComponent ] ,
    selector    : 'amp-file-upload-basic-usage'
} )

export default class AmpFileUploadComponentBasicUsage { }
