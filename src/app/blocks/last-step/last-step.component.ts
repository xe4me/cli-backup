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
        this.formModelService.saveAndSubmitApplication(this.__form.value, Constants.submitUrl, referenceId.value)
            .subscribe((result) => {
                if(result.payload.resultStatus == "SUCCESS"){
                    this.accountsListDataService.setAccounts(result.payload.accounts);
                    let navigateTo = this.accountsListDataService.isNormal()? 'confirmation' : 'confirmationWithCondition';
                    this.router.navigate([navigateTo]);
                }else{
                    // TODO remove this once error handling is done
                     this.successMessage = result.payload;
                     this.submitErrorMessage = null;
                     this._cd.markForCheck();
                }
            }, (error) => {
                this.submitErrorMessage = JSON.stringify(error);
                this._cd.markForCheck();
    });
    }
}
