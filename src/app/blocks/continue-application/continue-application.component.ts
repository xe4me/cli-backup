import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Headers,
    RequestOptions
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
    constructor(
        formModelService : FormModelService,
        elementRef : ElementRef,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        progressObserver : ProgressObserverService,
        private http : AmpHttpService
    ) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public onNext() {
        if (!this.__controlGroup.valid) {
            return;
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const referenceId = this.__controlGroup.get(this.__custom.controls[0].id).value;
        const dob = this.__controlGroup.get(this.__custom.controls[1].id).value;
        const surname = this.__controlGroup.get(this.__custom.controls[2].id).value;

        this.http.post(`${Environments.property.ApiCallsBaseUrl}${Constants.retrieveUrl}`, {
            'surname' : surname,
            'dob' : dob,
            'id' : referenceId
        }, options).subscribe((response) => {
            // TODO form hyrdration
            super.onNext();
        });
    }
}
