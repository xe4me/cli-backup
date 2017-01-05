import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';
import { Subscription } from 'rxjs';
export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private description : string          = null;
    private accountType : string;
    private betterChoiceSubscription : Subscription;
    private isNewDepositAccount : boolean = false;
    private additionalDescription : string;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService, ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        this.description              = this.__custom[ 'description' ];
        this.accountType              = this.__custom[ 'type' ];
        const newOrConvertControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        this.betterChoiceSubscription = newOrConvertControl.valueChanges.subscribe( ( val ) => {
            if ( this.accountType === 'loanOffset' ) {
                this.isNewDepositAccount   = true;
                this.additionalDescription = this.__custom[ `additional_${val}_instruction` ]
            } else {
                this.isNewDepositAccount   = val === 'convert';
                this.additionalDescription = this.__custom[ 'additional_instruction' ]
            }
        } );
        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        this.betterChoiceSubscription.unsubscribe();
        super.ngOnDestroy();
    }
}
