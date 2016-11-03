import { Injectable , EventEmitter } from '@angular/core';
import { Headers , RequestOptions , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service.ts';
import { Environments } from '../../abstracts/environments/environments.abstract.ts';
import { LicenseesAbstract } from '../../abstracts/licensee/licensee.abstract';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FormGroup , FormBuilder } from '@angular/forms';
import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
@Injectable()
export class FormModelService {
    // Save
    public saveMe : EventEmitter<any>       = new EventEmitter();
    public saveResponse : EventEmitter<any> = new EventEmitter();
    public saveError : EventEmitter<any>    = new EventEmitter();

    // Submit
    public submitMe : EventEmitter<any>       = new EventEmitter();
    public submitResponse : EventEmitter<any> = new EventEmitter();
    public submitError : EventEmitter<any>    = new EventEmitter();

    // Save and Submit
    public saveAndSubmitMe : EventEmitter<any>       = new EventEmitter();
    public saveAndSubmitResponse : EventEmitter<any> = new EventEmitter();
    public saveAndSubmitError : EventEmitter<any>    = new EventEmitter();

    public $hydrateForm : EventEmitter<any>          = new EventEmitter();

    public _formDefinition;
    public $flags : EventEmitter<any>;
    public dynamicFormLoaded : EventEmitter<boolean>;
    // Actual form model that gets saved along with the formDefinition should represent
    public model                             = {
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
    public form : FormGroup                  = new FormGroup( {} );
    private _apiBaseURL                      = Environments.property.ApiCallsBaseUrl;
    private _practiceBaseURL                 = Environments.property.TamServicePath + Environments.property.GwPracticeService.EnvPath + Environments.property.GwPracticeService.Path;
    private _contactDetailsUrl               = this._practiceBaseURL + '/profile';
    private _advisersUrl                     = this._practiceBaseURL + '/advisors';
    private _submitUrl                       = this._apiBaseURL + 'bolrnotification';
    private _contextUrl                      = this._apiBaseURL + 'usersession';
    private _saveRelativeUrl                 = null;
    private _headers                         = new Headers( { 'Content-Type' : 'application/json' } );
    private _httpOptions                     = new RequestOptions( { headers : this._headers } );
    private _savedModel;

    constructor ( private http : AmpHttpService , private builder : FormBuilder ) {
        this.$flags            = new EventEmitter();
        this.dynamicFormLoaded = new EventEmitter<boolean>();
        this.subscribeToSave();
        this.subscribeToSubmit();
    }

    public hydrateForm ( newModel : any = this._savedModel ) : FormGroup {
        if ( ! newModel ) {
            return this.form;
        }
        let stringified = JSON.stringify( newModel );
        let magic       = stringified
            .replace( /\[/g , 'this.builder.array([' )
            .replace( /\]/g , '])' )
            .replace( /{"/g , 'this.builder.group({"' )
            .replace( /}/g , '})' )
            .replace( /\{\}\)/g , 'this.builder.group({})' );
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
                        let specifiedOfficer                      = this.model.advisers.find( function( adviser ) {
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
     * Service calls
     */
    getContext () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions( { headers : headers } );
        return this.http.get( this._contextUrl , options )
                   .map( ( res ) => res.json() );
        // .catch(this.handleError);
    }

    getContactDetails () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions( {
            headers : headers , body : '' ,
        } );
        return this
            .http
            .get( this._contactDetailsUrl , options )
            .map( ( res ) => res.json() );
        // .catch(this.handleError);
    }

    getAdvisers () : Observable<string> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json' ,
            } );
        let options = new RequestOptions( {
            headers : headers , body : '' ,
        } );
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

    public submitApplication(submitUrl : string, referenceId : string) {
        this.submitMe.emit({ submitUrl, referenceId });
    }

    public saveAndSubmitApplication(model, submitUrl, referenceId) {
        this.saveModel(model).subscribe((saveResult) => {
            if (saveResult.json().statusCode === 200) {

                // Save ok
                this.callSubmitApplication(submitUrl, referenceId)
                    .subscribe((submitResult) => {
                        if (submitResult.json().statusCode === 200) {

                            // Submit ok
                            this.saveAndSubmitResponse.emit(submitResult.json());
                        } else {
                            // Submit status is not 200
                            this.emitSaveAndSubmitError('Submit application failed');
                        }
                    }, (error) => {
                        // Submit failed
                        this.emitSaveAndSubmitError(error.json());
                    });
            } else {
                // Save status is not 200
                this.emitSaveAndSubmitError('Save application failed');
            }
        }, (error) => {
            // Save failed
            this.emitSaveAndSubmitError(error.json());
        });
    }

    // TODO: SaveForm should not be invoked directly but rather thru the present method.
    saveForm ( value : any ) : Observable < string > {
        let headers = new Headers( { 'Content-Type' : 'application/json' } );
        let options = new RequestOptions( { headers : headers } );
        // Inject context data obtained from prepop that is required by back end;
        let body    = Object.assign( {} ,
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
                   .map( ( res ) => res.json() );
        //    .catch( this.handleError );
    }

    private saveModel(model) : Observable<Response> {
        return this.http.post(this._apiBaseURL + this._saveRelativeUrl, JSON.stringify(model), this._httpOptions);
    }

    private callSubmitApplication(submitUrl, referenceId) : Observable<Response> {
        let sendUrl = this._apiBaseURL + submitUrl;
        let params : string = `id=${referenceId}`;
        const queryUrl : string = encodeURI(`${sendUrl}?${params}`);

        return this.http.post(queryUrl, JSON.stringify({}), this._httpOptions);
    }

    private emitSaveAndSubmitError (error) {
        this.saveAndSubmitError.emit(error);
    }

    private handleError(error : any) {
        console.log('Handling the error ');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private subscribeToSave() {
        this.saveMe.subscribe((model) => {
            if (!this._saveRelativeUrl) {
                throw new Error('Relative URL not set in FormModelService for save!');
            }
            this.saveModel(model)
                .subscribe((response) => {
                    this.saveResponse.emit(response.json());
                }, (error) => {
                    if (error) {
                        this.saveError.emit(error);
                    }
                });
        });
    }

    private subscribeToSubmit() {
        this.submitMe.subscribe((params) => {
            if (!params.submitUrl || !params.referenceId) {
                throw new Error('Submit URL or reference ID is missing in FormModelService for submit!');
            }
            this.callSubmitApplication(params.submitUrl, params.referenceId)
                .subscribe((response) => {
                    this.submitResponse.emit(response.json());
                }, (error) => {
                    if (error) {
                        this.submitError.emit(error);
                    }
                });
        });
    }
}
