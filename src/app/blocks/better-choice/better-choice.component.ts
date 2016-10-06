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
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService,
    FormService
} from 'amp-ddc-components';
@Component({
    selector: 'better-choice-block',
    templateUrl: './better-choice.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetterChoiceBlock extends FormBlock implements AfterViewInit {
    private loadedDynamicBlock : string = '';

    constructor(
        formModelService : FormModelService,
        elementRef : ElementRef,
        private formService : FormService,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        private viewContainerRef : ViewContainerRef,
        progressObserver : ProgressObserverService) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public ngAfterViewInit() {
        const betterChoiceControl = this.__controlGroup.get(this.__custom.controls[0].id);
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
        super.ngAfterViewInit();
    }
}
