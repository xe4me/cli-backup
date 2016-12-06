import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Headers,
    RequestOptions,
    Response
} from '@angular/http';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService,
    AmpHttpService,
    Environments
} from 'amp-ddc-components';
import {
    Constants
} from '../../shared';
@Component({
    selector: 'continue-application-block',
    templateUrl: './continue-application.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require('./continue-application.component.scss').toString()]
})
export class ContinueApplicationBlock extends FormBlock {
    public static notFoundErrorMsg = 'Sorry, we cannot find your application';
    public static closedErrorMsg = 'This application has already been submitted';
    public static genericErrorMsg = 'An unexpected error has occurred.';
    private hideThisBlock = false;
    private responseError : string;

    constructor(
        formModelService : FormModelService,
        elementRef : ElementRef,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        progressObserver : ProgressObserverService,
        private http : AmpHttpService
    ) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
        this.disableAutoSave();
    }

    public getErrorMessage(status) : string {
        switch (status) {
            case 'notFound' :
                return ContinueApplicationBlock.notFoundErrorMsg;
            case 'closed' :
                return ContinueApplicationBlock.closedErrorMsg;
            default :
                return ContinueApplicationBlock.genericErrorMsg;
        }
    }

    public onNext() {
        if (!this.__controlGroup.valid) {
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const referenceId = this.__controlGroup.get(this.__custom.controls[0].id).value;
        const surname = this.__controlGroup.get(this.__custom.controls[1].id).value;
        const dob = this.__controlGroup.get(this.__custom.controls[2].id).value;

        this.http.post(`${Environments.property.ApiCallsBaseUrl}${Constants.retrieveUrl}`, {
                'surname' : surname,
                'dob' : dob,
                'id' : referenceId
            }, options)
            .map((res : Response) => res.json())
            .subscribe((response) => {
                const payload = response.payload;

                if (payload.status === 'success') {
                    this.formModelService.storeModelAndHydtrateForm(payload.application);
                    setTimeout(() => {
                        super.onNext();
                        this.hideThisBlock = true;
                    }, 0);
                } else {
                    this.responseError = this.getErrorMessage(payload.status);
                    this._cd.markForCheck();
                }
            }, (error) => {
                this.responseError = ContinueApplicationBlock.genericErrorMsg;
                this._cd.markForCheck();
            });
    }
}
