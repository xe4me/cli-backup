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
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
import {
    Constants
    SharedFormDataService
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
                  private sharedFormDataService : SharedFormDataService
                   ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private submitForm() {
        const referenceId = this.sharedFormDataService.getReferenceIdControl(this.__form);
        this.formModelService.saveAndSubmitApplication(this.__form.value, Constants.submitUrl, referenceId.value)
            .subscribe((result) => {
                // TODO remove this once welcome screen is done
                this.successMessage = result.payload;
                this._cd.markForCheck();
                // TODO navigate to welcome screen
            }, (error) => {
                this.submitErrorMessage = JSON.stringify(error);
                this._cd.markForCheck();
        });
    }
}
