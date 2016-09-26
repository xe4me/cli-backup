import {
    Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy , Input ,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
@Component( {
    selector        : 'privacy-declaration' ,
    templateUrl     : './privacy-declaration.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PrivacyDeclarationBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private acceptPrivacyDeclaration() {
        this.__controlGroup.get(this.__custom.controls[0].id).setValue(true);
    }
}
