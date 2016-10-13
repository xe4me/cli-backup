import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit
} from '@angular/core';
import {
    AbstractControl
} from '@angular/forms';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
@Component( {
    selector        : 'tax-file-number-block' ,
    templateUrl     : './tax-file-number.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class TaxFileNumberBlock extends FormBlock implements AfterViewInit {
    public tfnExclusion : AbstractControl;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngAfterViewInit() {
        this.tfnExclusion = this.__controlGroup.get(this.__custom.controls[1].id);
        this.tfnExclusion.valueChanges.subscribe((val) => {
            this.__controlGroup.get(this.__custom.controls[0].id).setValue('');
            this.__controlGroup.get(this.__custom.controls[2].id).setValue(null);
        });
        super.ngAfterViewInit();
    }
}