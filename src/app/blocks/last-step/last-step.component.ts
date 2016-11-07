import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
} from '@angular/core';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import {
    FormGroup
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService,
    AccountsListDataService
} from '../../shared';
@Component( {
    selector        : 'last-step-block' ,
    templateUrl     : './last-step.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class LastStepBlock extends FormBlock {
    private submitErrorMessage;
    private successMessage;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService,
                  private router : Router ,
                  private sharedFormDataService : SharedFormDataService,
                  private accountsListDataService : AccountsListDataService
                   ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private submitForm() {
        const referenceId = this.sharedFormDataService.getReferenceIdControl(this.__form);
        let accounts = [
            {
                "BSB": "939200",
                "accountNumber": "889908563",
                "bett3rAccountType": "Pay",
                "transactionalStatus": "Normal",
                "accountPreferredName": "Bett3r Pay"
            },
            {
                "BSB": "939200",
                "accountNumber": "171312231",
                "bett3rAccountType": "Spend",
                "transactionalStatus": "Postnone",
                "accountPreferredName": "Bett3r Spend"
            },
            {
                "BSB": "939200",
                "accountNumber": "307106757",
                "bett3rAccountType": "Save",
                "transactionalStatus": "Normal",
                "accountPreferredName": "Bett3r Save"
            }
        ];
        console.log(accounts);
        this.accountsListDataService.setAccounts(accounts);
        let navigateTo = this.accountsListDataService.isNormal()? 'confirmation' : 'confirmationWithCondition';
        console.log(navigateTo);
        this.router.navigate([navigateTo]);
        /*this.formModelService.saveAndSubmitApplication(this.__form.value, Constants.submitUrl, referenceId.value)
            .subscribe((result) => {
                // TODO remove this once welcome screen is done
                this.successMessage = result.payload;
                this.submitErrorMessage = null;
                this._cd.markForCheck();
                // TODO navigate to welcome screen
                if(result.payload.resultStatus == "SUCCESS"){
                    this.accountsListDataService.setAccounts(result.payload.accounts);
                    let navigateTo = this.accountsListDataService.isNormal()? 'confirmation' : 'confirmationWithCondition';
                    this.router.navigate([navigateTo]);
                }
            }, (error) => {
                this.submitErrorMessage = JSON.stringify(error);
                this._cd.markForCheck();
        });*/
    }
}
