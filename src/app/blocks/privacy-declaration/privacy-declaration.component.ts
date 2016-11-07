import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
@Component( {
    selector        : 'privacy-declaration-block' ,
    templateUrl     : './privacy-declaration.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PrivacyDeclarationBlock extends FormBlock implements OnInit {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        this.__controlGroup
            .addControl( this.__custom.controls[ 0 ].id , new FormControl( null , Validators.required ) );
    }

    private acceptPrivacyDeclaration () {
        const privacyDeclaration = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        privacyDeclaration.setValue( true );
        privacyDeclaration.markAsTouched();
        this.onNext();
    }
}
