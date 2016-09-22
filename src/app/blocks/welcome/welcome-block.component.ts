import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeBlockComponent extends FormBlock {

    @ViewChild(AmpIntroBlockComponent) public ampIntro;

    constructor(
        formModelService: FormModelService,
        scrollService: ScrollService,
        _cd: ChangeDetectorRef,
        elementRef: ElementRef,
        progressObserver: ProgressObserverService) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }

    public ngOnInit() {
        this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
    }

    private onNewOrExisting(newOrExisting : string) {
        this.__controlGroup.get(this.__custom.controls[0].id).setValue(newOrExisting);
        this.ampIntro.proceed();
        setTimeout(() => {
           this.onNext();
        }, 800);
    }

}
