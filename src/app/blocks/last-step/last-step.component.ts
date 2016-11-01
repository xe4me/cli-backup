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
    FormService,
    AmpHttpService
} from 'amp-ddc-components';
import {
    Constants
} from '../../shared/constants';
@Component( {
    selector        : 'last-step-block' ,
    templateUrl     : './last-step.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class LastStepBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService,
                  private ampHttpService : AmpHttpService
                   ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private submitForm() {
        const subscribed = this.formModelService.$saveResponse.subscribe((result) => {
            subscribed.unsubscribe();
            let group = <FormGroup> this.__form.controls['Application'];
            let appId = group.controls[Constants.referenceIdName].value;
            let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
            let options = new RequestOptions( { headers : headers } );
            this.ampHttpService.post(`${Constants.submitUrl}?id=${appId}`, null, options);
        });
        this.formModelService.save(this.__form.value);
    }
}
