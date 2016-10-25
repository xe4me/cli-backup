import {
    Component,
    ViewContainerRef,
    ChangeDetectorRef
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
        '[attr.label]': '__custom["label"]',
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
    directives: [AmpBlockLoaderDirective]
    // encapsulation: ViewEncapsulation.Emulated
})
export class PageSectionComponent {
    public CLASS_NAME = 'PageSectionComponent';
    private isActive = false;
    constructor(
        public _viewContainerRef : ViewContainerRef,
        public progressObserver : ProgressObserverService,
        public formSectionService : FormSectionService,
        public scrollService : ScrollService,
        public formModelService : FormModelService,
        public _cd : ChangeDetectorRef) {

        // this.formModelService.dynamicFormLoaded.subscribe((isLoaded) => {
        //     this._cd.detectChanges();
        // });
    }

    isCurrentSection() : boolean {
        // return this.formSectionService.currentSection === this.fullyDistinguishedName;
        // return this.formSectionService.isCurrentSection( this.__fdn );
        return true;
    }

    ngOnInit() {
        this.scrollService.$scrolled.subscribe((blockchanges) => {
            //  console.log('blockchanges.componentSelector',blockchanges.componentSelector);
            //  console.log('this.getFdnJoined(this.__fdn)',this.getFdnJoined(this.__fdn));
            if (blockchanges) {
                let s = blockchanges.componentSelector;
                let m = this.getFdnJoined(this.__fdn);
                this.isActive = s.indexOf(m) > -1 ? true : false;
                this._cd.markForCheck();
            }
        });
    }

    getFdnJoined(fdn) {
        return fdn.join('-');
    }
}
