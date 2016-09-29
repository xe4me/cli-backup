"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var environments_abstract_ts_1 = require('../../abstracts/environments/environments.abstract.ts');
var licensee_abstract_1 = require('../../abstracts/licensee/licensee.abstract');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/Rx'); // use this line if you want to be lazy, otherwise:
var FormModelService = (function () {
    function FormModelService(http) {
        this.http = http;
        // Actual form model that gets saved along with the formDefinition should represent
        this.model = {
            currentBlockClassName: 'IntroBlockComponent',
            fatalErrors: [],
            errors: [],
            currentBlockID: null,
            context: {
                initialized: false,
                licensee: null,
                practicePrincipalFirstName: null,
                practicePrincipalLastName: null,
                payeeID: null,
                practiceName: null,
                realUser: null,
                actingAsUser: null,
                impersonatedUser: null,
                isPrincipal: false,
                iat: 1460707004,
                exp: 1465891004,
                jwt_realUserFirstName: null,
                jwt_realUserLastName: null,
                jwt_actingAsUserFirstName: null,
                jwt_actingAsUserLastName: null,
                jwt_realUser: null,
                jwt_actingAsUser: null,
                jwt_iss: null,
                jwt_saleid: null,
                jwt_impersonatedUser: null
            },
            contactDetails: {
                workPhoneNumber: null,
                emailAddress: null
            },
            advisers: [],
            flags: {
                dialogIsVisible: true,
                introIsDone: false,
                contactDetailsIsDone: false,
                addressIsDone: false,
                partnershipIsDone: false,
                equityHoldersIsDone: false,
                fullOrPartialIsDone: false,
                saleReasonIsDone: false,
                practiceAssociationIsDone: false,
                exerciseDateIsDone: false,
                isOveralOverlayActive: false,
                practiceAssociationIsVisible: false,
                saleReasonIsVisible: false,
                acknowledgeIsDone: false,
                reviewBlockIsDone: false,
                confirmationIsVisible: false,
                reviewIsVisible: false
            },
            formId: null,
            folderId: null
        };
        this._submitUrl = environments_abstract_ts_1.Environments.property.TamServicePath + environments_abstract_ts_1.Environments.property.GwDDCService.EnvPath + environments_abstract_ts_1.Environments.property.GwDDCService.Path + '/bolrnotification';
        // private _submitUrl         = 'http://localhost:8080/ddc/secure/api/bolrnotification';
        this._contextUrl = environments_abstract_ts_1.Environments.property.TamServicePath + environments_abstract_ts_1.Environments.property.GwDDCService.EnvPath + environments_abstract_ts_1.Environments.property.GwDDCService.Path + '/usersession';
        this._contactDetailsUrl = environments_abstract_ts_1.Environments.property.TamServicePath + environments_abstract_ts_1.Environments.property.GwPracticeService.EnvPath + environments_abstract_ts_1.Environments.property.GwPracticeService.Path + '/profile';
        this._advisersUrl = environments_abstract_ts_1.Environments.property.TamServicePath + environments_abstract_ts_1.Environments.property.GwPracticeService.EnvPath + environments_abstract_ts_1.Environments.property.GwPracticeService.Path + '/advisors';
        this.$flags = new core_1.EventEmitter();
        this.dynamicFormLoaded = new core_1.EventEmitter();
    }
    // Used in conjunction with disableValidators()
    FormModelService.enableValidators = function (control) {
        if (control && control._ampValidator) {
            control.validator = control._ampValidator;
            delete control._ampValidator;
        }
    };
    // Used in conjunction with enableValidators()
    FormModelService.disableValidators = function (control) {
        if (control && control.validator) {
            control._ampValidator = control.validator;
            delete control.validator;
        }
    };
    FormModelService.prototype.generatePDFUrl = function () {
        if (this.model.formId) {
            return environments_abstract_ts_1.Environments.property.TamServicePath + environments_abstract_ts_1.Environments.property.GwDDCService.EnvPath + environments_abstract_ts_1.Environments.property.GwDDCService.Path + '/bolrnotification/' + this.model.formId + '/pdf';
        }
        return null;
    };
    Object.defineProperty(FormModelService.prototype, "licensee", {
        get: function () {
            return this.model.context.licensee;
        },
        enumerable: true,
        configurable: true
    });
    FormModelService.prototype.setCurrentBlock = function (class_name) {
        this.model.currentBlockClassName = class_name;
    };
    Object.defineProperty(FormModelService.prototype, "formDefinition", {
        get: function () {
            return this._formDefinition;
        },
        set: function (formDef) {
            this._formDefinition = formDef;
            this.model.currentBlockID = this._formDefinition.blocks[0]._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormModelService.prototype, "advisers", {
        get: function () {
            return this.model.advisers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormModelService.prototype, "context", {
        get: function () {
            return this.model.context;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * SAM - State methods
     */
    FormModelService.prototype.getModel = function () {
        return this.model;
    };
    FormModelService.prototype.getFlags = function (flag) {
        return this.model.flags[flag];
    };
    Object.defineProperty(FormModelService.prototype, "currentComponent", {
        get: function () {
            return this.model.currentBlockClassName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generic context validation methods
     */
    FormModelService.prototype.isContextValid = function () {
        if (this.getModel().context['x-jwt-assertion']) {
            return true;
        }
        return false;
    };
    FormModelService.prototype.isPlannerContextValid = function () {
        if (this.getModel().context.realUser) {
            // TODO: uncomment this when x-jwt-assertion is implemented by TAM
            // return isContextValid();
            return true;
        }
        return false;
    };
    // Used at the start of the buy back form to make sure that the JWT context provided is valid
    // **7/6/2017 relaxing the validity rule to allow practices without a recorded specified officer to coming and add those details themselve.
    FormModelService.prototype.isPracticeContextValid = function () {
        // Added rules to filter unauthorized licensee
        if (this.getModel().context.licensee &&
            this.getModel().context.payeeID &&
            licensee_abstract_1.LicenseesAbstract.licensees.hasOwnProperty(this.getModel().context.licensee)) {
            return true;
        }
        return false;
    };
    /**
     * SAM - Action methods
     */
    FormModelService.prototype.present = function (data) {
        if (data) {
            switch (data.action) {
                case 'next':
                    // this.model.currentBlockID = FormDefinition.getNextBlockID(this._formDefinition, data.blockId);
                    break;
                case 'setContext':
                    Object.assign(this.model.context, data.context.data);
                    // Indicator to capture that the state is after the all important context call
                    this.model.context.initialized = true;
                    break;
                case 'setFlag':
                    this.model.flags[data.flag] = data.flagValue;
                    var flag = {};
                    flag[data.flag] = data.flagValue;
                    this.$flags.emit(flag);
                    break;
                case 'setContactDetails':
                    // Object.assign( this.model.contactDetails , data.contactDetails.data );
                    if (data.contactDetails.data.specifiedOfficer && this.model.advisers && this.model.advisers.length) {
                        // Assume that setAdvisers is called before here.
                        var specifiedOfficer = this.model.advisers.find(function (adviser) {
                            return (adviser.ownernum === data.contactDetails.data.specifiedOfficer);
                        });
                        this.model.contactDetails.workPhoneNumber = specifiedOfficer.workPhoneNumber;
                        this.model.contactDetails.emailAddress = specifiedOfficer.emailAddress;
                    }
                    break;
                case 'setAdvisers':
                    Object.assign(this.model.advisers, data.advisers.data);
                    break;
                case 'goToReceiptPage':
                    this.model.flags['confirmationIsVisible'] = true;
                    this.model.flags['dialogIsVisible'] = false;
                    this.model.flags['reviewIsVisible'] = false;
                    flag = {};
                    flag['confirmationIsVisible'] = true;
                    flag['dialogIsVisible'] = false;
                    flag['reviewIsVisible'] = false;
                    this.$flags.emit(flag);
                    break;
                case 'submitted':
                    this.model.formId = data.data.formId;
                    this.model.folderId = data.data.folderId;
                    break;
                case 'failedSubmission':
                    this.model.formId = data.data.error.save._id;
                    this.model.folderId = data.data.error.caseStart.folderId;
                case 'error':
                    this.model.errors = this.model.errors.concat(data.errors);
                    break;
                case 'fatalError':
                    // Indicator to capture that the state is after the all important context call
                    this.model.context.initialized = true;
                    this.model.fatalErrors = this.model.fatalErrors.concat(data.errors);
                    break;
                default:
                    console.error('Got undefined SAM action', data.action);
            }
        }
        else {
            console.error('Got null SAM action data structure', data);
        }
    };
    /**
     * Utilities
     */
    FormModelService.prototype.getNextBlock = function (currentBlockName) {
        // return 'PlannerDetailsBlock';
        return 'ContactDetailsBlockComponent';
    };
    /**
     * Service calls
     */
    FormModelService.prototype.getContext = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._contextUrl, options)
            .map(function (res) { return res.json(); });
        // .catch(this.handleError);
    };
    FormModelService.prototype.getContactDetails = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this
            .http
            .get(this._contactDetailsUrl, options)
            .map(function (res) { return res.json(); });
        // .catch(this.handleError);
    };
    FormModelService.prototype.getAdvisers = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this._advisersUrl, options)
            .map(function (x, idx) {
            var data = x.json();
            if (data && data.data && data.data.length) {
                data.data = data.data.filter(function (adviser) {
                    return (adviser.personalTitle && adviser.personalTitle.length);
                });
            }
            return data;
        });
        // .catch( this.handleError );
    };
    FormModelService.prototype.generatePDF = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/pdf'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this.generatePDFUrl(), options)
            .map(function (res) { return res.text(); });
    };
    // TODO: SaveForm should not be invoked directly but rather thru the present method.
    FormModelService.prototype.saveForm = function (value) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // Inject context data obtained from prepop that is required by back end;
        var body = Object.assign({}, value, {
            context: {
                licenseeBuybackFacilities: 'Request to access the  ' + licensee_abstract_1.LicenseesAbstract.getLicenseeBuybackFacility(this.licensee) + ' facility'
            }
        });
        if (body.fullOrPartial.fullOrPartial === 'Full') {
            body.fullOrPartial.impactedAdvisers = this.model.advisers;
        }
        return this.http
            .post(this._submitUrl, JSON.stringify(body), options)
            .map(function (res) { return res.json(); });
        //    .catch( this.handleError );
    };
    FormModelService.prototype.handleError = function (error) {
        console.log('Handling the error ');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    FormModelService = __decorate([
        // use this line if you want to be lazy, otherwise:
        core_1.Injectable()
    ], FormModelService);
    return FormModelService;
}());
exports.FormModelService = FormModelService;
