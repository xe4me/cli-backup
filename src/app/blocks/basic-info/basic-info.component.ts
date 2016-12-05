import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    OnInit ,
    ChangeDetectionStrategy ,
    Input ,
    AfterViewInit ,
    ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AutoFocusOnDirective ,
    Environments ,
    CustomerDetailsService
} from 'amp-ddc-components';
@Component( {
    selector        : 'basic-info-block' ,
    templateUrl     : './basic-info.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles :  [ require('./basic-info.component.scss')]
} )
export class BasicInfoBlock extends FormBlock implements OnInit {
    public maxDate : Date;
    public ageValidator : any;
    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ,
                  private customerDetailsService : CustomerDetailsService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        if (this.__custom.applicantIndex === 2) {
            this.__custom.blockTitle = this.__custom.blockTitle_applicant2;
        }
        this.maxDate      = moment().subtract( 18, 'years' ).toDate();
        this.ageValidator = () => {
            return ( control ) => {
                let date = moment( control.value , 'DD/MM/YYYY' );
                if ( date.isValid && date.toDate() >= this.maxDate ) {
                    return {
                        underAge : {
                            text : this.__custom.controls[ 4 ].ageValidationMsg
                        }
                    };
                }
                return null;
            };
        };
    }

    get isTitleInSummaryState () {
        return this.customerDetailsService.isTitlePrepop || this.isInSummaryState;
    }
    get isFirstNameInSummaryState () {
        return this.customerDetailsService.isFirstNamePrepop || this.isInSummaryState;
    }
    get isMiddleNameInSummaryState () {
        return this.customerDetailsService.isMiddleNamePrepop || this.isInSummaryState;
    }
    get isLastNameInSummaryState () {
        return this.customerDetailsService.isLastNamePrepop || this.isInSummaryState;
    }
    get isDOBInSummaryState () {
        return this.customerDetailsService.isDOBPrepop || this.isInSummaryState;
    }
}
