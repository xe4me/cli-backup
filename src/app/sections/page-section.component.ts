import { FormSection } from '../formSection';
import { Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { UIControlService, ProgressObserverService, FormSectionService, FormModelService } from 'amp-ddc-ui-core/ui-core';

@Component ({
  selector: 'page-section',
  template: `
    <div class='section' [id]='label' [ngClass]='{"section__hide": !isCurrentSection()}'>
      <div [id]='blocksAnchorId'></div>
    </div>
  `,
  styles: [`
    .section {
      border: 0px solid black;
    }
    .section__hide {
      display: none;
    }
  `]
  // encapsulation: ViewEncapsulation.Emulated
})
export class PageSectionComponent extends FormSection {
    public CLASS_NAME = 'PageSectionComponent';

    constructor (public _viewContainerRef: ViewContainerRef,
                 public controlService: UIControlService,
                 public progressObserver: ProgressObserverService,
                 public formSectionService: FormSectionService,
                 public formModelService: FormModelService,
                 public _cd: ChangeDetectorRef) {
        super(_viewContainerRef, controlService, progressObserver);
        this.formModelService.dynamicFormLoaded.subscribe((isLoaded) => {
            this._cd.detectChanges();
        });
    }

    isCurrentSection(): boolean {
        return this.formSectionService.currentSection === this.fullyDistinguishedName;
    }
}
