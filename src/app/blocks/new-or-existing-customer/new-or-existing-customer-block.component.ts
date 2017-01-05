import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    ViewContainerRef
} from '@angular/core';
import {
    FormBlock,
    SaveService,
    ScrollService
} from 'amp-ddc-components';
import {
    Validators,
    FormControl
} from '@angular/forms';
import { Constants } from '../../shared';
@Component( {
    selector        : 'new-or-existing-customer-block',
    templateUrl     : './new-or-existing-customer-block.component.html',
    styles          : [ require( './new-or-existing-customer-block.component.scss' ).toString() ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NewOrExistingCustomerBlock extends FormBlock implements OnInit, AfterViewInit {
    private loadedLoginBlock = false;
    private hideThisBlock    = false;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewReference : ViewContainerRef, ) {
        super( saveService, _cd, scrollService );
        this.disableAutoSave();
    }

    public ngOnInit () {
        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl( this.__custom.controls[ 0 ].id, new FormControl( null, Validators.required ) );
        }
        this.__controlGroup.markAsTouched();
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        if ( this.__isRetrieved ) {
            this.hideThisBlock = true;
            setTimeout( () => {
                this.newOrLogin( this.__controlGroup.get( this.__custom.controls[ 0 ].id ).value );
            }, 10 );
        }
    }

    private addOrRemoveContinueSection ( newOrLoginToMyAmp : string ) : Promise<any> {
        const loginBlockControlGroup = this.__form.get( Constants.MyAMPLoginBlockFDN );
        if ( newOrLoginToMyAmp === Constants.existingCustomer && !loginBlockControlGroup ) {
            this.loadedLoginBlock = true;
            return this.__loadNext( this.__custom.optionalBlocks.MyAMPLoginBlock, this.viewReference );
        }
        if ( newOrLoginToMyAmp === Constants.newCustomer && loginBlockControlGroup ) {
            this.loadedLoginBlock = false;
            return this.__removeNext( this.viewReference );
        }
        return new Promise( ( resolve ) => resolve() );
    }

    private newOrLogin ( newOrLoginToMyAmp : string ) {
        const newOrLoginToMyAmpControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        newOrLoginToMyAmpControl.setValue( newOrLoginToMyAmp );
        newOrLoginToMyAmpControl.markAsTouched();
        if ( !this.__isRetrieved ) {
            this.addOrRemoveContinueSection( newOrLoginToMyAmp ).then( ( actualComponent ) => {
                this.hideThisBlock = true;
                setTimeout( () => {
                    this.onNext();
                }, 0 );
            } );
        } else {
            this.onNext();
        }
    }

    private newApplication () {
        this.newOrLogin( Constants.newCustomer );
    }

    private loginToMyAmp () {
        this.newOrLogin( Constants.existingCustomer );
    }
}
