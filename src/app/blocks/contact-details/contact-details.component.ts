import {
    Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy , Input ,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    CustomerDetailsService
} from 'amp-ddc-components';
@Component( {
    selector        : 'contact-details-block' ,
    templateUrl     : './contact-details.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class ContactDetailsBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService,
                  private customerDetailsService : CustomerDetailsService) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    get isMobileInSummaryState () {
        // Disable the input if mobile is prepopulated.
        return this.customerDetailsService.isMobilePrepop || this.isInSummaryState;
    }
}
