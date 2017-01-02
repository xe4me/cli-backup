import {
    Injectable,
    EventEmitter
} from '@angular/core';
import {
    Headers,
    RequestOptions,
    Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { LicenseesAbstract } from '../../abstracts/licensee/licensee.abstract';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/Rx';
import { AmpHttpService } from '../../services/amp-http/amp-http.service';

@Injectable()
export class FormModelService {
    // Save
    public saveMe : EventEmitter<any>       = new EventEmitter();
    public saveResponse : EventEmitter<any> = new EventEmitter();
    public saveError : EventEmitter<any>    = new EventEmitter();

    // H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O
    public $hydrateForm : EventEmitter<any> = new EventEmitter(); // H2O
    // H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O, H2O

    public _formDefinition;
    public $flags : EventEmitter<any>;
    public dynamicFormLoaded : EventEmitter<boolean>;
    // Actual form model that gets saved along with the formDefinition should represent
    public model               = {
        currentBlockClassName : 'IntroBlockComponent',
        fatalErrors           : [],
        errors                : [],
        currentBlockID        : null,         // Defaults to the first block on the current page
        context               : {
            initialized                : false,
            licensee                   : null,
            practicePrincipalFirstName : null,
            practicePrincipalLastName  : null,
            payeeID                    : null,
            practiceName               : null,
            realUser                   : null,
            actingAsUser               : null,
            impersonatedUser           : null,
            isPrincipal                : false,
            iat                        : 1460707004,
            exp                        : 1465891004,
            jwt_realUserFirstName      : null,
            jwt_realUserLastName       : null,
            jwt_actingAsUserFirstName  : null,
            jwt_actingAsUserLastName   : null,
            jwt_realUser               : null,
            jwt_actingAsUser           : null,
            jwt_iss                    : null,
            jwt_saleid                 : null,
            jwt_impersonatedUser       : null
        },
        contactDetails        : {
            workPhoneNumber : null,
            emailAddress    : null
        },
        advisers              : [],
        flags                 : {
            dialogIsVisible              : true,
            introIsDone                  : false,
            contactDetailsIsDone         : false,
            addressIsDone                : false,
            partnershipIsDone            : false,
            equityHoldersIsDone          : false,
            fullOrPartialIsDone          : false,
            saleReasonIsDone             : false,
            practiceAssociationIsDone    : false,
            exerciseDateIsDone           : false,
            isOveralOverlayActive        : false,
            practiceAssociationIsVisible : false,
            saleReasonIsVisible          : false,
            acknowledgeIsDone            : false,
            reviewBlockIsDone            : false,
            confirmationIsVisible        : false,
            reviewIsVisible              : false
        },
        formId                : null,
        folderId              : null
    };
    public form : FormGroup    = new FormGroup( {} );
    public autoSave : boolean  = true; // this is used in form block
    private _apiBaseURL        = Environments.property.ApiCallsBaseUrl;
    private _practiceBaseURL   = Environments.property.TamServicePath + Environments.property.GwPracticeService.EnvPath + Environments.property.GwPracticeService.Path;
    private _contactDetailsUrl = this._practiceBaseURL + '/profile';
    private _advisersUrl       = this._practiceBaseURL + '/advisors';
    private _submitUrl         = this._apiBaseURL + 'bolrnotification';
    private _contextUrl        = this._apiBaseURL + 'usersession';
    private _saveRelativeUrl   = null;
    private _headers           = new Headers( { 'Content-Type' : 'application/json' } );
    private _httpOptions       = new RequestOptions( { headers : this._headers } );
    private _savedModel;

    constructor ( private http : AmpHttpService, private builder : FormBuilder ) {
        this.$flags            = new EventEmitter();
        this.dynamicFormLoaded = new EventEmitter<boolean>();
        this.subscribeToSave();
    }

    public hydrateForm ( newModel : any = this._savedModel ) : FormGroup {
        if ( !newModel ) {
            return this.form;
        }
        let stringified = JSON.stringify( newModel );
        let magic       = stringified
            .replace( /\[/g, 'this.builder.array([' )
            .replace( /\]/g, '])' )
            .replace( /{"/g, 'this.builder.group({"' )
            .replace( /}/g, '})' )
            .replace( /\{\}\)/g, 'this.builder.group({})' );
        // tslint:disable-next-line:no-eval
        this.form       = eval( magic );
        this.$hydrateForm.emit( this.form );
        return this.form;
    }

    public storeModel ( _model ) {
        this._savedModel = _model;
    }

    public get savedModel () {
        return this._savedModel;
    }

    public storeModelAndHydtrateForm ( _model ) {
        this.storeModel( _model );
        this.hydrateForm( _model );
    }

    public get licensee () {
        return this.model.context.licensee;
    }

    get formDefinition () {
        return this._formDefinition;
    }

    set formDefinition ( formDef ) {
        this._formDefinition      = formDef;
        this.model.currentBlockID = this._formDefinition.blocks[ 0 ]._id;
    }

    get advisers () {
        return this.model.advisers;
    }

    get context () {
        return this.model.context;
    }

    /**
     * SAM - State methods
     */
    getModel () {
        return this.model;
    }

    getFlags ( flag ) {
        return this.model.flags[ flag ];
    }

    /**
     * Generic context validation methods
     */
    isContextValid () {
        if ( this.getModel().context[ 'x-jwt-assertion' ] ) {
            return true;
        }
        return false;
    }

    isPlannerContextValid () {
        if ( this.getModel().context.realUser ) {

            // TODO: uncomment this when x-jwt-assertion is implemented by TAM
            // return isContextValid();
            return true;
        }
        return false;
    }

    // Used at the start of the buy back form to make sure that the JWT context provided is valid
    // **7/6/2017 relaxing the validity rule to allow practices without a recorded specified officer to coming and add those details themselve.
    isPracticeContextValid () {
        // Added rules to filter unauthorized licensee
        if ( this.getModel().context.licensee &&
            this.getModel().context.payeeID &&
            LicenseesAbstract.licensees.hasOwnProperty( this.getModel().context.licensee ) ) {
            return true;
        }
        return false;
    }

    /**
     * SAM - Action methods
     */
    present ( data ) {
        if ( data ) {
            switch ( data.action ) {
                case 'next':
                    // this.model.currentBlockID = FormDefinition.getNextBlockID(this._formDefinition, data.blockId);
                    break;
                case 'setContext':
                    Object.assign( this.model.context, data.context.data );
                    // Indicator to capture that the state is after the all important context call
                    this.model.context.initialized = true;
                    break;
                case 'setFlag':
                    this.model.flags[ data.flag ] = data.flagValue;
                    let flag                      = {};
                    flag[ data.flag ]             = data.flagValue;
                    this.$flags.emit( flag );
                    break;
                case 'setContactDetails':
                    // Object.assign( this.model.contactDetails , data.contactDetails.data );
                    if ( data.contactDetails.data.specifiedOfficer && this.model.advisers && this.model.advisers.length ) {
                        // Assume that setAdvisers is called before here.
                        let specifiedOfficer                      = this.model.advisers.find( ( adviser ) => {
                            return (adviser.ownernum === data.contactDetails.data.specifiedOfficer);
                        } );
                        this.model.contactDetails.workPhoneNumber = specifiedOfficer.workPhoneNumber;
                        this.model.contactDetails.emailAddress    = specifiedOfficer.emailAddress;
                    }
                    break;
                case 'setAdvisers':
                    Object.assign( this.model.advisers, data.advisers.data );
                    break;
                case 'goToReceiptPage':
                    this.model.flags[ 'confirmationIsVisible' ] = true;
                    this.model.flags[ 'dialogIsVisible' ]       = false;
                    this.model.flags[ 'reviewIsVisible' ]       = false;
                    flag                                        = {};
                    flag[ 'confirmationIsVisible' ]             = true;
                    flag[ 'dialogIsVisible' ]                   = false;
                    flag[ 'reviewIsVisible' ]                   = false;
                    this.$flags.emit( flag );
                    break;
                case 'submitted':
                    this.model.formId   = data.data.formId;
                    this.model.folderId = data.data.folderId;
                    break;
                case 'failedSubmission':
                    this.model.formId   = data.data.error.save._id;
                    this.model.folderId = data.data.error.caseStart.folderId;
                case 'error':
                    this.model.errors = this.model.errors.concat( data.errors );
                    break;
                case 'fatalError':
                    // Indicator to capture that the state is after the all important context call
                    this.model.context.initialized = true;
                    this.model.fatalErrors         = this.model.fatalErrors.concat( data.errors );
                    break;
                default:
                    console.error( 'Got undefined SAM action', data.action );
            }
        } else {
            console.error( 'Got null SAM action data structure', data );
        }
    }

    /**
     * Service calls
     */
    getContext () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json',
            } );
        let options = new RequestOptions( { headers } );
        return this.http.get( this._contextUrl, options )
                   .map( ( res ) => res.json() );
    }

    getContactDetails () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json',
            } );
        let options = new RequestOptions( {
            headers, body : '',
        } );
        return this
            .http
            .get( this._contactDetailsUrl, options )
            .map( ( res ) => res.json() );
    }

    getAdvisers () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json',
            } );
        let options = new RequestOptions( {
            headers, body : '',
        } );
        return this.http
                   .get( this._advisersUrl, options )
                   .map(  ( x ) => {
                       let data = x.json();
                       if ( data && data.data && data.data.length ) {
                           data.data = data.data.filter(  ( adviser ) => {
                               return (adviser.personalTitle && adviser.personalTitle.length);
                           } );
                       }
                       return data;
                   } );
    }

    public setSaveRelativeUrl ( relativeUrl : string ) {
        this._saveRelativeUrl = relativeUrl;
    }

    public getSaveRelativeUrl () {
        return this._saveRelativeUrl;
    }

    public overrideApiBaseUrl ( baseUrl : string ) {
        this._apiBaseURL = baseUrl;
    }

    public overrideSaveOptions ( options : RequestOptions ) {
        this._httpOptions = options;
    }

    public save ( model : any ) {
        this.saveMe.emit( model );
    }

    public submitApplication ( submitUrl, referenceId ) : Observable<Response> {
        let sendUrl             = this._apiBaseURL + submitUrl;
        let params : string     = `id=${referenceId}`;
        const queryUrl : string = encodeURI( `${sendUrl}?${params}` );

        return this.http.post( queryUrl, JSON.stringify( {} ), this._httpOptions )
                   .map( ( res ) => res.json() )
                   .catch( ( error ) => Observable.throw( error ) );
    }

    public saveAndSubmitApplication ( model, submitUrl, referenceId ) : Observable<any> {
        // http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service
        let resultSubject = new ReplaySubject( 1 );

        this.saveModel( model ).subscribe( ( saveResult ) => {
            if ( saveResult.json().statusCode === 200 ) {
                // Save ok
                this.submitApplication( submitUrl, referenceId )
                    .subscribe( ( submitResult : any ) => {
                        if ( submitResult.statusCode === 200 ) {

                            // Submit ok
                            resultSubject.next( submitResult );
                        } else {
                            // Submit status is not 200
                            resultSubject.error( 'Submit application failed' );
                        }
                    }, ( error ) => {
                        // Submit failed
                        const errorResult = error && error.json ? error.json() : error;
                        resultSubject.error( errorResult );
                    } );
            } else {
                // Save status is not 200
                resultSubject.error( 'Save application failed' );
            }
        }, ( error ) => {
            // Save failed
            const errorResult = error && error.json ? error.json() : error;
            resultSubject.error( errorResult );
        } );

        return resultSubject.asObservable();
    }

    public saveModel ( model ) : Observable<Response> {
        return this.http.post( this._apiBaseURL + this._saveRelativeUrl, JSON.stringify( model ), this._httpOptions );
    }

    private subscribeToSave () {
        this.saveMe.subscribe( ( model ) => {
            if ( !this._saveRelativeUrl ) {
                throw new Error( 'Relative URL not set in FormModelService for save!' );
            }
            this.saveModel( model )
                .subscribe( ( response ) => {
                    this.saveResponse.emit( response.json() );
                }, ( error ) => {
                    if ( error ) {
                        this.saveError.emit( error );
                    }
                } );
        } );
    }
}
