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
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Headers,
    RequestOptions,
    Response
} from '@angular/http';
import {
    FormBlock,
    ScrollService,
    SaveService,
    FormModelService,
    AmpHttpService,
    AmpFormBlockComponent,
    AutoFocusOnDirective,
    Environments
} from 'amp-ddc-components';
import { Constants } from '../../shared';
import { SharedFormDataService } from '../../shared/shared-form-data.service';
@Component( {
    selector        : 'continue-application-block',
    templateUrl     : './continue-application.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    host            : {
        '[@slideUp]' : 'slideUp'
    },
    styles          : [ require( './continue-application.component.scss' ).toString() ],
    animations      : [
        trigger(
            'slideUp',
            [
                state( 'collapsed, void', style( {
                    height           : '0px',
                    'min-height'     : '0px',
                    opacity          : '0',
                    'padding-left'   : '0px',
                    'padding-right'  : '0px',
                    'padding-bottom' : '0px',
                    'padding-top'    : '0px',
                    display          : 'none'
                } ) ),
                state( 'expanded', style( {
                    height           : '*',
                    'min-height'     : '*',
                    opacity          : '1',
                    'padding-left'   : '*',
                    'padding-right'  : '*',
                    'padding-bottom' : '*',
                    'padding-top'    : '*',
                    display          : 'block'
                } ) ),
                transition(
                    'collapsed <=> expanded', [ animate( 800 ) ] )
            ] )
    ]
} )
export class ContinueApplicationBlock extends FormBlock {
    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;
    @ViewChild( AmpFormBlockComponent ) public AmpFormBlockComponent;
    public static notFoundErrorMsg = 'Sorry, we cannot find your application';
    public static closedErrorMsg   = 'This application has already been submitted';
    public static genericErrorMsg  = 'An unexpected error has occurred.';
    private responseError : string;
    private fieldsAreRequired      = true;
    private showRetrieveBlock      = true;
    private removedNextBlock       = false;
    private slideUp                = 'expanded';
    private ANIMATION_TIME         = 800;

    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private vcf : ViewContainerRef,
                  private formModelService : FormModelService,
                  private sharedFormDataService : SharedFormDataService,
                  private http : AmpHttpService,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );

        this.disableAutoSave();
    }

    public getErrorMessage ( status ) : string {
        switch ( status ) {
            case 'notFound' :
                return ContinueApplicationBlock.notFoundErrorMsg;
            case 'closed' :
                return ContinueApplicationBlock.closedErrorMsg;
            default :
                return ContinueApplicationBlock.genericErrorMsg;
        }
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        this.AmpFormBlockComponent.onKeyupEnter = ( event ) => {
            this.retrieve();
            event.preventDefault();
        }
    }

    public retrieve () {
        if ( !this.__controlGroup.valid ) {
            return;
        }

        let headers = new Headers( { 'Content-Type' : 'application/json' } );
        let options = new RequestOptions( { headers : headers } );

        const referenceId = this.__controlGroup.get( this.__custom.controls[ 0 ].id ).value;
        const surname     = this.__controlGroup.get( this.__custom.controls[ 1 ].id ).value;
        const dob         = this.__controlGroup.get( this.__custom.controls[ 2 ].id ).value;

        this.http.post( `${Environments.property.ApiCallsBaseUrl}${Constants.retrieveUrl}`, {
            'surname' : surname,
            'dob'     : dob,
            'id'      : referenceId
        }, options )
            .map( ( res : Response ) => res.json() )
            .subscribe( ( response ) => {
                const payload = response.payload;
                if ( payload.status === 'success' ) {
                    this.showRetrieveBlock = false;
                    this._cd.markForCheck();
                    this.formModelService.storeModelAndHydrateForm( payload.application );
                } else {
                    this.responseError = this.getErrorMessage( payload.status );
                    this._cd.markForCheck();
                }
            }, ( error ) => {
                this.responseError = ContinueApplicationBlock.genericErrorMsg;
                this._cd.markForCheck();
            } );
    }

    public onNext () {
        this.retrieve();
    }

    public onNewApplication () {
        this.fieldsAreRequired = false;
        this.__controlGroup.reset();
        this.slideItUp();
        setTimeout( () => { //timeout to make sure the controls are valid otherwise it won't go to the next undone block
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
