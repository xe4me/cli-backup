import { Component,
         ChangeDetectorRef,
         ElementRef,
         ChangeDetectionStrategy } from '@angular/core';
import { FormControl,
         Validators
} from '@angular/forms';
import { FormBlock,
         ScrollService,
         FormModelService,
         ProgressObserverService
} from 'amp-ddc-components';
@Component( {
    selector        : 'privacy-declaration-block' ,
    templateUrl     : './privacy-declaration.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PrivacyDeclarationBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
