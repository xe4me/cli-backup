import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
    ViewContainerRef
} from '@angular/core';
import {
    clone
} from 'amp-ddc-components';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService,
    FormService
} from 'amp-ddc-components';
import {
    SharedFormDataService
} from '../../shared/shared-form-data.service';
@Component({
    selector: 'better-choice-block',
    templateUrl: './better-choice.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetterChoiceBlock extends FormBlock implements OnInit, AfterViewInit {
    private loadedDynamicBlock : string = '';
    private existingCustomer : boolean = false;
    constructor(
        formModelService : FormModelService,
        elementRef : ElementRef,
        private formService : FormService,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        private viewContainerRef : ViewContainerRef,
        progressObserver : ProgressObserverService,
        private sharedFormDataService : SharedFormDataService,
    ) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public setButtonLabels(singleOrJoint : string) {
        for ( const button of this.__custom.controls[0].buttons) {
            button.label = button['label_' + singleOrJoint];
        }
        this.__custom.controls[0].buttons = clone(this.__custom.controls[0].buttons );
    }

    public ngOnInit() {
        this.setButtonLabels('single');
        this.existingCustomer = window.location.href.search('[?&]existingCustomer=true') > 0;
        return;
    }

    public ngAfterViewInit() {
        if (!this.existingCustomer) {
            return;
        }
        const betterChoiceControl = this.__controlGroup.get(this.__custom.controls[0].id);
        const singleOrJointControl = this.sharedFormDataService.getSingleOrJointControl(this.__form);
        betterChoiceControl.valueChanges.subscribe((val) => {
            const nextBlock = this.__custom.optionalBlocks[val];
            if (this.loadedDynamicBlock && val !== this.loadedDynamicBlock) {
                this.__removeNext(this.viewContainerRef);
            }
            if (nextBlock) {
                this.loadedDynamicBlock = val;
                this.__loadNext(nextBlock, this.viewContainerRef);
            }
        });
        singleOrJointControl.valueChanges.subscribe((val) => {
            this.setButtonLabels(val);
            this._cd.markForCheck();
        });
        super.ngAfterViewInit();
    }
}
