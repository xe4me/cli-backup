import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {
    FormControl,
    Validators
} from '@angular/forms';
import {
    AmpButton,
    ProgressObserverService,
    FormBlock,
    FormModelService,
    ScrollService,
    AmpIntroBlockComponent
} from 'amp-ddc-components';
import { ViewChild } from '@angular/core';
@Component({
    selector: 'welcome-block',
    templateUrl: './welcome-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require('./welcome-block.component.scss')]
})
export class WelcomeBlockComponent extends FormBlock implements OnInit {

    @ViewChild(AmpIntroBlockComponent) public ampIntro;
    private nextBlockChanged : boolean = false;

    constructor(
        formModelService : FormModelService,
        scrollService : ScrollService,
        _cd : ChangeDetectorRef,
        elementRef : ElementRef,
        progressObserver : ProgressObserverService,
        private viewReference : ViewContainerRef) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public ngOnInit() {
        this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
    }

    private onNewOrExisting(newOrExisting : string) {
        const animationTimeout = newOrExisting === 'existing' ? 1000 : 850;
        const newOrExistingControl = this.__controlGroup.get(this.__custom.controls[0].id);

        newOrExistingControl.setValue(newOrExisting);
        newOrExistingControl.markAsTouched();

        if (this.nextBlockChanged) {
            this.__removeNext(this.viewReference);
            this.nextBlockChanged = false;
        }
        if (newOrExisting === 'existing') {
            this.__loadNext(this.__custom.optionalBlocks[0], this.viewReference);
            this.nextBlockChanged = true;
        }
        this.ampIntro.proceed();
        setTimeout(() => {
            this.onNext();
        }, animationTimeout);
    }

}
