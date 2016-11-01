import {
    Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component( {
    selector : 'amp-submit-receipt' ,
    template :   require('./amp-submit-receipt.component.html'),
    styles   : [ require('./amp-submit-receipt.component.scss').toString() ],
    inputs : [
        'licensee',
        'intro_text',
        'reference_number',
        'description',
        'note_text'
    ],
    outputs : []
})
export class AmpSubmitReceiptComponent {

    public licensee : string         = 'DEA_AMPFP';
    public intro_text : string       = 'Your application has been submitted.';
    public reference_number : string = 'The application reference is: ';
    public description : string      = 'Your upladed files are:';
    public note_text : string        = 'Someone from AMP will contact you to discuss the application. You are also welcome to call the AMP Underwriting team on 1800 655 655.';

    constructor () {
    }

}
