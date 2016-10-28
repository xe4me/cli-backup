import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService,
    FormService,
    AutoFocusOnDirective
} from 'amp-ddc-components';
@Component({
    selector: 'basic-info-block',
    templateUrl: './basic-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInfoBlock extends FormBlock implements OnInit {
    public maxDate: Date;
    public ageValidator: any;
    @ViewChild(AutoFocusOnDirective) public autoFocusOn;
    constructor(formModelService: FormModelService,
        elementRef: ElementRef,
        private formService: FormService,
        _cd: ChangeDetectorRef,
        scrollService: ScrollService,
        progressObserver: ProgressObserverService) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public ngOnInit() {
        this.maxDate = moment().subtract('years', 18).toDate();
        this.ageValidator = () => {
            return (control) => {
                let date = moment(control.value, 'DD/MM/YYYY');
                if (date.isValid && date.toDate() >= this.maxDate) {
                    return {
                        underAge : {
                            text : this.__custom.controls[4].ageValidationMsg
                        }
                    };
                }
                return null;
            };
        };
    }
}
