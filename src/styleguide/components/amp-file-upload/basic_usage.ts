import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component( {
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    selector : 'amp-file-upload-basic-usage'
} )

export default class AmpFileUploadComponentBasicUsage {
    private controlGroup = new FormGroup( {} );
}
