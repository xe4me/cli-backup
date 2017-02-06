import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild,
    AfterViewInit,
    ViewContainerRef
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { FormDefinition } from '../../../../interfaces/form-def.interface';
import { AmpSliderComponent } from '../../../amp-slider';
@Component( {
    selector        : 'amp-new-or-existing-customer-block',
    template        : require( './amp-new-or-existing-customer-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpNewOrExistingCustomerBlockComponent extends FormBlock implements OnInit, AfterViewInit {
    public static NEW;
    public static EXISTING;
    @ViewChild( AmpSliderComponent ) slider : AmpSliderComponent;

    protected __custom = {
        blockTitle          : 'Tell us whether you\'re new to AMP',
        newButtonLabel      : 'New customer',
        existingButtonLabel : 'Current customer',
        controls            : {
            customerType : {
                id      : 'customerType',
                options : [
                    {
                        id    : 'New',
                        value : 'New',
                        label : 'New customer'
                    },
                    {
                        id    : 'Existing',
                        value : 'Existing',
                        label : 'Current customer'
                    }
                ]
            }
        },
        loginBlockFdn       : [ 'Application', 'MyAMPLoginBlock' ],
        optionalBlocks      : [
            {
                name        : 'ampLoginBlock',
                blockType   : 'AmpLoginBlockComponent',
                blockLayout : 'INLINE',
                commonBlock : true,
                path        : 'modules/amp-login-block/components/amp-login-block/amp-login-block.component',
                custom      : 'custom/login.config'
            }
        ]
    };

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewReference : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
        this.disableAutoSave();
    }

    ngOnInit () {
        let options                                     = this.__custom.controls.customerType.options;
        AmpNewOrExistingCustomerBlockComponent.NEW      = options[ 0 ].value;
        AmpNewOrExistingCustomerBlockComponent.EXISTING = options[ 1 ].value;
    }

    private addOrRemoveContinueSection ( newOrLoginToMyAmp : string ) : Promise<any> {
        let def : FormDefinition = this.__custom.optionalBlocks[ 0 ];
        if ( newOrLoginToMyAmp === AmpNewOrExistingCustomerBlockComponent.EXISTING ) {
            return this.__loadNext( def, this.viewReference );
        }
        if ( newOrLoginToMyAmp === AmpNewOrExistingCustomerBlockComponent.NEW ) {
            return this.__removeNext( this.viewReference, {
                removableDef : def
            } );
        }
        return new Promise( ( resolve ) => resolve() );
    }

    private newOrLogin ( newOrLoginToMyAmp : string ) {
        if ( !this.__isRetrieved ) {
            this.addOrRemoveContinueSection( newOrLoginToMyAmp )
                .then( () => {
                    setTimeout( () => {
                        this.slider
                            .slide()
                            .then( () => this.goNext( true ) );
                    }, 0 );
                } );
        } else {
            this.slider
                .slide( { animate : false } )
                .then( () => this.goNext( false ) );
        }
    }

    private goNext ( mockScroll : boolean ) {
        this.scrollService.scrollToNextUndoneBlock( this.__form, undefined, {
            mock : mockScroll
        } );
    }
}
