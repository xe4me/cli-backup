import {
    Component,
    ChangeDetectorRef,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {
    FormBlock,
    ScrollService,
    SaveService,
    AutoFocusOnDirective,
    CustomerDetailsService
} from 'amp-ddc-components';
import { Constants } from '../../shared';
@Component( {
    selector        : 'basic-info-block',
    templateUrl     : './basic-info.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './basic-info.component.scss' ) ]
} )
export class BasicInfoBlock extends FormBlock implements OnInit {
    public maxDate : Date;
    public ageValidator : any;
    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private customerDetailsService : CustomerDetailsService,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit () {
        if ( this.__custom.applicantIndex === 2 ) {
            this.__custom.blockTitle = this.__custom.blockTitle_applicant2;
        }
        this.maxDate      = moment().subtract( 18, 'years' ).toDate();
        this.ageValidator = () => {
            return ( control ) => {
                let date = moment( control.value, 'DD/MM/YYYY' );
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
        return ( this.customerDetailsService.isTitlePrepop && this.isThisApplicantOne ) || this.isInSummaryState;
    }

    get isFirstNameInSummaryState () {
        return ( this.customerDetailsService.isFirstNamePrepop && this.isThisApplicantOne ) || this.isInSummaryState;
    }

    get isMiddleNameInSummaryState () {
        return ( this.customerDetailsService.isMiddleNamePrepop && this.isThisApplicantOne ) || this.isInSummaryState;
    }

    get isLastNameInSummaryState () {
        return ( this.customerDetailsService.isLastNamePrepop && this.isThisApplicantOne ) || this.isInSummaryState;
    }

    get isDOBInSummaryState () {
        return ( this.customerDetailsService.isDOBPrepop && this.isThisApplicantOne ) || this.isInSummaryState;
    }

    get isThisApplicantOne () {
        return this.__fdn[ 1 ] === Constants.applicant1Section;
    }
}
