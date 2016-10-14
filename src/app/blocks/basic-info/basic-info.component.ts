import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    AutoFocusOnDirective
} from 'amp-ddc-components';
@Component( {
    selector        : 'basic-info-block' ,
    templateUrl     : './basic-info.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class BasicInfoBlock extends FormBlock {

    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
