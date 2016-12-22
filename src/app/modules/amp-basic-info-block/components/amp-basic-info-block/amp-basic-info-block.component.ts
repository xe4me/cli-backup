import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { FormModelService } from '../../../../services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../services/progress-observer/progress-observer.service';
import { AutoFocusOnDirective } from '../../../amp-directives';

@Component({
    selector: 'amp-basic-info-block',
    templateUrl: './amp-basic-info-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require('./amp-basic-info-block.component.scss').toString()]
})
export class AmpBasicInfoBlockComponent extends FormBlock {

    @ViewChild(AutoFocusOnDirective) public autoFocusOn;

    constructor(formModelService : FormModelService,
                elementRef : ElementRef,
                _cd : ChangeDetectorRef,
                scrollService : ScrollService,
                progressObserver : ProgressObserverService) {
        super(formModelService, elementRef, _cd, progressObserver, scrollService);
    }
}
