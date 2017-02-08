import {
    Component,
    ChangeDetectorRef,
    ViewChild,
    trigger,
    state,
    style,
    animate,
    ViewContainerRef,
    transition,
    ChangeDetectionStrategy,
    Optional
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import {
    ScrollService,
    SaveService,
    FormModelService,
    TransformService
} from '../../../../services';
import { AmpFormBlockComponent } from '../../../amp-form';
import { AutoFocusOnDirective } from '../../../amp-directives';
import { RetrieveService } from '../../../../services/retrieve/retrieve.service';

@Component( {
    selector        : 'amp-continue-block',
    template        : require('./amp-continue-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush,
    host            : {
        '[@slideUp]' : 'slideUp'
    },
    styles          : [ require( './amp-continue-block.component.scss' ) ],
    animations      : [
        trigger(
            'slideUp',
            [
                state( 'collapsed, void', style( {
                    'height'         : '0',
                    'min-height'     : '0',
                    'opacity'        : '0',
                    'padding-left'   : '0',
                    'padding-right'  : '0',
                    'padding-bottom' : '0',
                    'padding-top'    : '0',
                    'display'          : 'none'
                } ) ),
                state( 'expanded', style( {
                    'height'         : '*',
                    'min-height'     : '*',
                    'opacity'        : '1',
                    'padding-left'   : '*',
                    'padding-right'  : '*',
                    'padding-bottom' : '*',
                    'padding-top'    : '*',
                    'display'        : 'block'
                } ) ),
                transition(
                    'collapsed <=> expanded', [ animate( 800 ) ] )
            ] )
    ]
} )
export class AmpContinueBlockComponent extends FormBlock {

    public static notFoundErrorMsg = 'Sorry, we cannot find your application';
    public static closedErrorMsg   = 'This application has already been submitted';
    public static genericErrorMsg  = 'An unexpected error has occurred.';

    // Default custom values. Please note, this is all or nothing, we do not currently do shallow nor deep copying.
    public __custom               = {
        'blockTitle': 'Continue where you left off',
        'controls': [
          {
            'id': 'ReferenceCode',
            'requiredErrMsg': 'Application number is a required field.'
          },
          {
            'id': 'LastName',
            'requiredErrMsg': 'Last name is a required field.'
          },
          {
            'id': 'DateOfBirth',
            'requiredErrMsg': 'Date of birth is a required field.'
          }
        ]
    };

    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;
    @ViewChild( AmpFormBlockComponent ) public AmpFormBlockComponent;

    private responseError : string;
    private fieldsAreRequired      = true;
    private showRetrieveBlock      = true;
    private removedNextBlock       = false;
    private slideUp                = 'expanded';
    private ANIMATION_TIME         = 800;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private vcf : ViewContainerRef,
                  private retrieveService : RetrieveService,
                  private formModelService : FormModelService,
                  saveService : SaveService,
                  @Optional() private transformService : TransformService ) {
        super( saveService, _cd, scrollService );

        this.disableAutoSave();
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        this.AmpFormBlockComponent.onKeyupEnter = ( event ) => {
            this.retrieve();
            event.preventDefault();
        };
    }

    public retrieve () {

        if ( !this.__controlGroup.valid ) {
            return;
        }

        const referenceId = this.__controlGroup.get( this.__custom.controls[ 0 ].id ).value;
        const surname     = this.__controlGroup.get( this.__custom.controls[ 1 ].id ).value;
        const dob         = this.__controlGroup.get( this.__custom.controls[ 2 ].id ).value;

        let getErrorMessage = ( payload ) => {
            if (!payload) {
                return AmpContinueBlockComponent.genericErrorMsg;
            }
            switch (payload.status) {
                case 'notFound' :
                    return AmpContinueBlockComponent.notFoundErrorMsg;
                case 'closed' :
                    return AmpContinueBlockComponent.closedErrorMsg;
                default :
                    return AmpContinueBlockComponent.genericErrorMsg;
            }
        };

        this.retrieveService.retrieve(referenceId, surname, dob, (error, payload) => {
            if (error) {
                if (error.status === 404 && error.json() && error.json().payload) {
                    this.responseError = getErrorMessage( error.json().payload );
                } else {
                    this.responseError = getErrorMessage( payload );
                }
                this._cd.markForCheck();
                return;
            }

            let transformedAppModel = this.transformService ? this.transformService.toFrontendModel( payload.application ) : payload.application;
            this.showRetrieveBlock = false;
            this._cd.markForCheck();
            this.formModelService.storeModelAndHydrateForm( transformedAppModel );
            this.saveService.referenceId = referenceId;
        } );
    }

    public onNext () {
        this.retrieve();
    }

    public onNewApplication () {
        this.fieldsAreRequired = false;
        this.__controlGroup.reset();
        this.slideItUp();
        // timeout to make sure the controls are valid otherwise it won't go to the next undone block
        setTimeout( () => {
            super.onNext();
        }, 10 );
    }

    public slideItUp () : Promise<string> {
        return new Promise( ( resolve, reject ) => {
            this.slideUp = 'collapsed';
            setTimeout( () => {
                resolve( 'done' );
            }, this.ANIMATION_TIME );
        } );
    }
}
