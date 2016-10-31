import {
    Component,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { AmpBlockLoaderDirective } from '../amp-block-loader.directive';
import { FormSectionService } from '../services/form-section/form-section.service';
import { FormModelService } from '../services/form-model/form-model.service';
import { ProgressObserverService } from '../services/progress-observer/progress-observer.service';
import { ScrollService } from '../services/scroll/scroll.service';
@Component({
    selector: 'page-section',
    template: `
    <div class='section' [ngClass]='{"section__hide": !isCurrentSection()}'>
         <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form"></div>
    </div>
  ` ,
    host: {
        '[id]': 'getFdnJoined(__fdn)',
        '[class.visited]': '__controlGroup.touched',
        '[class.done]': '__controlGroup.valid && __controlGroup.touched',
        '[attr.label]': '__custom?.label',
        '[class.active]': 'isActive'
    },
    styles: [
        `
    .section {
      border: 0px solid black;
    }
    .section__hide {
      display: none;
    }
  `
    ],
    directives: [AmpBlockLoaderDirective],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class PageSectionComponent {
    public CLASS_NAME = 'PageSectionComponent';
    private isActive = false;
    private __fdn;
    private __controlGroup;
    constructor(
        public _viewContainerRef : ViewContainerRef,
        public progressObserver : ProgressObserverService,
        public formSectionService : FormSectionService,
        public scrollService : ScrollService,
        public formModelService : FormModelService,
        public _cd : ChangeDetectorRef) {
    }

    isCurrentSection() : boolean {
        return true;
    }

    ngOnInit() {
        this.scrollService.$scrolled.subscribe((blockchanges) => {
            if (blockchanges) {
                let componentSelector = blockchanges.componentSelector;
                let fdn = this.getFdnJoined(this.__fdn);
                this.isActive = this.__controlGroup.untouched && componentSelector && componentSelector.indexOf(fdn) > -1 ? true : false;
                this._cd.markForCheck();
            }
        });
    }

    getFdnJoined(fdn) {
        return fdn.join('-');
    }
}
