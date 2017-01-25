import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';

export class AccountTransitionBaseBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private description : string          = null;
    private accountType : string;
    private betterChoiceSubscription : Subscription;
    private showAccountNumber : boolean = false;
    private additionalDescription : string;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        this.description              = this.__custom[ 'description' ];
        this.accountType              = this.__custom[ 'type' ];
        const newOrConvertControl     = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        this.betterChoiceSubscription = newOrConvertControl.valueChanges
            .subscribe( ( val ) => {
                this.checkoutAccountType(val);
            } );

        if ( this.__isRetrieved ) {
            this.checkoutAccountType(newOrConvertControl.value);
            this.__controlGroup.markAsTouched();
            this.isActive = true;
        }

        this._cd.markForCheck();
        super.ngAfterViewInit();
    }

    public ngOnDestroy () {
        this.betterChoiceSubscription.unsubscribe();
        super.ngOnDestroy();
    }

    protected shouldShowAccountNumber ( action : string ) : boolean {
        return action === 'convert';
    }

    protected additionalInstructionsText ( action : string ) : string {
        return this.__custom[ 'additional_instruction' ];
    }

    private checkoutAccountType ( val : string ) : void {
        this.showAccountNumber = this.shouldShowAccountNumber(val);
        this.additionalDescription = this.additionalInstructionsText(val);
    }
}
