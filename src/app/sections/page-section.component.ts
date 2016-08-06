import { FormSection } from '../formSection';
import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone, ViewContainerRef} from '@angular/core';
import { UIControlService, ProgressObserverService } from 'amp-ddc-ui-core/ui-core';

@Component ({
  selector: 'page-section',
  template: `
    <div class='section' [id]='label'>
      <div [id]='blocksAnchorId'></div>
    </div>
  `,
  styles: [`
    .section {
      border: 0px solid black;
    }
  `]
  // encapsulation: ViewEncapsulation.Emulated
})
export class PageSectionComponent extends FormSection {
    public CLASS_NAME = 'PageSectionComponent';

    constructor (public _viewContainerRef: ViewContainerRef,
                 public controlService: UIControlService, 
                 public progressObserver: ProgressObserverService) {
        super(_viewContainerRef, controlService, progressObserver);
    }
}
