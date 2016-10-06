import {
    Component,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';
import {
    AmpBlockLoaderDirective,
    AmpButton,
    FormSectionService,
    ProgressObserverService,
    FormBlock,
    FormModelService,
    ScrollService
} from 'amp-ddc-components';
import { FormGroup } from '@angular/forms';
import { StickyProgressHeaderBlockComponent } from
    '../sticky-progress-header-block/sticky-progress-header-block.component';
@Component({
    selector: 'menu-frame',
    templateUrl: './menu-frame.component.html',
    styles: [require('./menu-frame.component.scss')],
    directives: [StickyProgressHeaderBlockComponent]
})
export class MenuFrameBlockComponent {
    private calculatedProgress = 0;
    private stickyAnimatedIntoView = false;
    private dialogIsVisible = true;
    private __form : FormGroup;
    constructor(
        private _el : ElementRef,
        private formModelService : FormModelService,
        private progressObserver : ProgressObserverService,
        public formSectionService : FormSectionService,
        private _cd : ChangeDetectorRef) {
    }
}
