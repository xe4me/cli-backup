import { Component } from '@angular/core';
import { FormBlock } from '../../../app/form-block';
import { ThemeService } from '../../services/theme';
import { AmpSubmitReceiptComponent } from '../../../app/modules/amp-submit-receipt/components/amp-submit-receipt/amp-submit-receipt.component';

@Component( {
    selector    : 'submit-receipt-basic-usage' ,
    directives  : [ AmpSubmitReceiptComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-submit-receipt/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class SubmitReceiptPageBasicUsage {
}
