import {
    Injectable,
    EventEmitter
} from '@angular/core';

import {
    ControlGroup,
    Control
} from '@angular/common';
import {
    Http,
    Headers,
    RequestOptions,
    Response
} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service.ts';
import { Environments } from '../../abstracts/environments/environments.abstract.ts';
import { LicenseesAbstract } from '../../abstracts/licensee/licensee.abstract';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
@Injectable()
export class FormModelService {
    // Used in conjunction with disableValidators()
    public static enableValidators ( control : any ) {
        if ( control && control._ampValidator ) {
            control.validator = control._ampValidator;
            delete control._ampValidator;
        }
    }

    // Used in conjunction with enableValidators()
    public static disableValidators ( control : any ) {
        if ( control && control.validator ) {
            control._ampValidator = control.validator;
            delete control.validator;
        }
    }

    public $saveMe       : EventEmitter<any> = new EventEmitter();
    public $saveResponse : EventEmitter<any> = new EventEmitter();
    public $saveError    : EventEmitter<any> = new EventEmitter();

    public _formDefinition;
    public $flags : EventEmitter<any>;
    public dynamicFormLoaded : EventEmitter<boolean>;
    // Actual form model that gets saved along with the formDefinition should represent
    public model               = {
        currentBlockClassName : 'IntroBlockComponent' ,
        fatalErrors           : [] ,
        errors                : [] ,
        currentBlockID        : null ,         // Defaults to the first block on the current page
        context               : {
            initialized                : false ,
            licensee                   : null ,
            practicePrincipalFirstName : null ,
            practicePrincipalLastName  : null ,
            payeeID                    : null ,
            practiceName               : null ,
            realUser                   : null ,
            actingAsUser               : null ,
            impersonatedUser           : null ,
            isPrincipal                : false ,
            iat                        : 1460707004 ,
            exp                        : 1465891004 ,
            jwt_realUserFirstName      : null ,
            jwt_realUserLastName       : null ,
            jwt_actingAsUserFirstName  : null ,
            jwt_actingAsUserLastName   : null ,
            jwt_realUser               : null ,
            jwt_actingAsUser           : null ,
            jwt_iss                    : null ,
            jwt_saleid                 : null ,
            jwt_impersonatedUser       : null
        } ,
        contactDetails        : {
            workPhoneNumber : null ,
            emailAddress    : null
        } ,
        advisers              : [] ,
        flags                 : {
            dialogIsVisible              : true ,
            introIsDone                  : false ,
            contactDetailsIsDone         : false ,
            addressIsDone                : false ,
            partnershipIsDone            : false ,
            equityHoldersIsDone          : false ,
            fullOrPartialIsDone          : false ,
            saleReasonIsDone             : false ,
            practiceAssociationIsDone    : false ,
            exerciseDateIsDone           : false ,
            isOveralOverlayActive        : false ,
            practiceAssociationIsVisible : false ,
            saleReasonIsVisible          : false ,
            acknowledgeIsDone            : false ,
            reviewBlockIsDone            : false ,
            confirmationIsVisible        : false ,
            reviewIsVisible              : false
        } ,
        formId                : null ,
        folderId              : null
    };
    private _baseURL = Environments.property.ApiCallsBaseUrl;
    private _submitUrl         = this._baseURL + '/bolrnotification';
    // private _submitUrl         = 'http://localhost:8080/ddc/secure/api/bolrnotification';
    private _contextUrl        = this._baseURL + '/usersession';
    private _contactDetailsUrl = this._baseURL + '/profile';
    private _advisersUrl       = this._baseURL + '/advisors';
    private _submitRelativeUrl = null;
    private _headers = new Headers({ 'Content-Type' : 'application/json' });
    private _httpOptions = new RequestOptions({ headers : this._headers });

    constructor ( private http : AmpHttpService) {
        this.$flags            = new EventEmitter();
        this.dynamicFormLoaded = new EventEmitter<boolean>();

        this.$saveMe.subscribe((model) => {
            if (!this._submitRelativeUrl) {
                throw new Error('Relative URL not set in FormModelService for submit!');
            }
            this.saveModel(model)
                .subscribe((response) => {
                    this.$saveResponse.emit(response.json());
                }, (error) => {
                    if (error) {
                        this.$saveError.emit(error);
                    }
                });
        });
    }

    public generatePDFUrl () {
        if ( this.model.formId ) {
            return Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path + '/bolrnotification/' + this.model.formId + '/pdf';
        }
        return null;
    }
    public get licensee () {
        return this.model.context.licensee;
    }

    public setCurrentBlock ( class_name : string ) {
        this.model.currentBlockClassName = class_name;
    }

    get formDefinition () {
        return this._formDefinition;
    }

    get advisers () {
        return this.model.advisers;
    }

    get context () {
        return this.model.context;
    }

    set formDefinition ( formDef ) {
        this._formDefinition      = formDef;
        this.model.currentBlockID = this._formDefinition.blocks[ 0 ]._id;
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

    public get currentComponent () {
        return this.model.currentBlockClassName;
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
                    Object.assign( this.model.context , data.context.data );
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
                        let specifiedOfficer = this.model.advisers.find( function( adviser ) {
                            return (adviser.ownernum === data.contactDetails.data.specifiedOfficer);
                        } );
                        this.model.contactDetails.workPhoneNumber = specifiedOfficer.workPhoneNumber;
                        this.model.contactDetails.emailAddress    = specifiedOfficer.emailAddress;
                    }
                    break;
                case 'setAdvisers':
                    Object.assign( this.model.advisers , data.advisers.data );
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
                    console.error( 'Got undefined SAM action' , data.action );
            }
        } else {
            console.error( 'Got null SAM action data structure' , data );
        }
    }

    /**
     * Utilities
     */
    getNextBlock ( currentBlockName ) {
        // return 'PlannerDetailsBlock';
        return 'ContactDetailsBlockComponent';
    }

    /**
     * Service calls
     */
    getContext () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions( { headers : headers } );
        return this.http.get( this._contextUrl , options )
                   .map( (res) => res.json() );
        // .catch(this.handleError);
    }

    getContactDetails () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions({
            headers: headers, body: '',
        });
        return this
            .http
            .get( this._contactDetailsUrl , options )
            .map( (res) => res.json() );
        // .catch(this.handleError);
    }

    getAdvisers () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions({
            headers: headers, body: '',
        });
        return this.http
                   .get( this._advisersUrl , options )
                   .map( function( x , idx ) {
                       let data = x.json();
                       if ( data && data.data && data.data.length ) {
                           data.data = data.data.filter( function( adviser ) {
                               return (adviser.personalTitle && adviser.personalTitle.length);
                           } );
                       }
                       return data;
                   } );
        // .catch( this.handleError );
    }

    generatePDF () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/pdf' ,
            } );
        let options = new RequestOptions( { headers : headers } );
        return this.http
                   .get( this.generatePDFUrl() , options )
                   .map( (res) => res.text() );
    }

    public setSubmitRelativeUrl (relativeUrl : string) {
        this._submitRelativeUrl = relativeUrl;
    }

    public overrideSubmitBaseUrl (baseUrl : string) {
        this._baseURL = baseUrl;
    }

    public overrideSubmitOptions(options : RequestOptions) {
        this._httpOptions = options;
    }

    public save (model : any) {
        this.$saveMe.emit(model);
    }

    // TODO: SaveForm should not be invoked directly but rather thru the present method.
    saveForm ( value : any ) : Observable < string > {
        let headers = new Headers( { 'Content-Type' : 'application/json' } );
        let options = new RequestOptions( { headers : headers } );
        // Inject context data obtained from prepop that is required by back end;
        let body = Object.assign( {} ,
            value ,
            {
                context : {
                    licenseeBuybackFacilities : 'Request to access the  ' + LicenseesAbstract.getLicenseeBuybackFacility( this.licensee ) + ' facility'
                }
            } );
        if ( body.fullOrPartial.fullOrPartial === 'Full' ) {
            body.fullOrPartial.impactedAdvisers = this.model.advisers;
        }
        return this.http
                   .post( this._submitUrl , JSON.stringify( body ) , options )
                   .map( (res) => res.json() );
        //    .catch( this.handleError );
    }

    private saveModel (model) : Observable<Response> {
        return this.http.post (this._baseURL + this._submitRelativeUrl, JSON.stringify(model), this._httpOptions);
    }

    private handleError (error : any) {
        console.log( 'Handling the error ' );
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error( errMsg ); // log to console instead
        return Observable.throw( errMsg );
    }

    /*
     *
     * NOTE: commented out the handleError npm as it keeps throwing weird errors
     * need to be sorted out
     * */
}
