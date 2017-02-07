import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input,
    Output,
    OnDestroy,
    ViewEncapsulation,
    EventEmitter,
    ViewChild
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    SafeResourceUrl,
    DomSanitizer
} from '@angular/platform-browser';
import { get }from 'lodash';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { AmpCheckboxComponent } from '../../../amp-checkbox';
import { AmpGreenIdServices } from '../../services/amp-greenid-service';
import { IGreenIdFormModel } from '../../interfaces/form-model';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';

@Component( {
    selector : 'amp-greenid-block',
    providers : [ AmpGreenIdServices ], // @TODO : Why are we providing the service here and not at module level ?
    changeDetection : ChangeDetectionStrategy.OnPush,
    template : require( './amp-greenid-block.component.html' ),
    styles : [ require( './amp-greenid-block.component.scss' ) ],
    encapsulation : ViewEncapsulation.None
} )
export class AmpGreenIdBlockComponent extends FormBlock implements OnInit, OnDestroy {

    public static verificationStatuses = {
        VERIFIED : 'VERIFIED',
        VERIFIED_WITH_CHANGES : 'VERIFIED_WITH_CHANGES',
        VERIFIED_ADMIN : 'VERIFIED_ADMIN',
        IN_PROGRESS : 'IN_PROGRESS',
        PENDING : 'PENDING',
        LOCKED_OUT : 'LOCKED_OUT'
    };

    @Input() id : string = 'greenIdIdentityCheck';
    @Input() keepControl : boolean = false;
    @Input() checkboxLabel : string;
    @Input() showOnReady = true;
    @Input() styleUrl : string = Environments.property.GreenId.styleUrl;
    @Input() uiScriptUrl : string = Environments.property.GreenId.uiScriptUrl;
    @Input() configScriptUrl : string = Environments.property.GreenId.configScriptUrl;
    @Output( 'complete' ) $complete : EventEmitter<any> = new EventEmitter();
    @ViewChild( AmpCheckboxComponent ) private creditHeaderCheckboxComponent;

    private model : IGreenIdFormModel;

    private creditHeaderCheckboxId : string = 'creditHeaderCheckbox';
    private greenIdControlGroup : FormGroup;
    private loadApiScripts : Promise<any>;
    private greenIdSettings : any;
    private hasOkBeenClicked : boolean = false;
    private hasCreditCheckHeaderConsentBeenGiven : boolean = false;
    private safeStyleUrl : SafeResourceUrl;
    private environment : string = Environments.property.GreenId.environment;
    private accountId : string = Environments.property.GreenId.accountId;
    private password : string = Environments.property.GreenId.password;
    private termsAndConditionsText : string = `
        By accepting these terms and conditions you give consent for AMP Bank to disclose your name, residential
        address and date of birth to a credit reporting agency and ask the credit reporting agency to provide an
        assessment of whether the personal information so provided matches (in whole or in part) personal information
        contained in a credit information file in the possession or control of the credit reporting agency to assist in
        verifying your identity for the purposes of the Anti-Money Laundering and Counter-Terrorism Act 2006. The
        credit reporting agency may prepare and provide AMP Bank with such an assessment and may use your personal
        information including the names, residential addresses and dates of birth contained in credit information files
        of you and other individuals for the purposes of preparing such an assessment. If you disagree with having your
        identity verified by a credit reporting agency, please select another data source or contact AMP Bank so that
        we can discuss other options with you.
    `;

    private showOkButton : boolean = false;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private ampGreenIdServices : AmpGreenIdServices,
                  private sanitizer : DomSanitizer ) {
        super( saveService, _cd, scrollService );
    }

    public getGreenIdControlGroup () : FormGroup {
        return this.greenIdControlGroup;
    }

    public getVerificationStatusControl () : FormControl {
        return <FormControl> this.verificationStatusControl;
    }

    public ngOnInit () : any {
        this.greenIdSettings = {
            environment : this.environment,
            frameId : 'greenid-div',
            enableBackButtonWarning : false
        };

        if ( this.styleUrl ) {
            this.safeStyleUrl = this.sanitizer.bypassSecurityTrustResourceUrl( this.styleUrl );
        }

        this.createControls();

        if ( this.hasConsentBeenPassed ) {
            this.startVerification();
        }
    }

    public ngOnDestroy () {
        if ( !this.keepControl && this.__controlGroup && this.id ) {
            this.__controlGroup.removeControl( this.id );
        }
    }

    private startVerification () {
        if ( !this.isVerificationCompleted ) {
            // Build our model object to give to Green ID
            this.model = this.mapGreenIdModel();

            this.loadApiScripts = new Promise<any>( this.loadApiScriptsHandler ).then( () => {
                this.setupGreenId();
                if ( !this.isAlreadyRegistered ) {
                    this.registerUser()
                        .subscribe( ( response ) => {
                            if ( response ) {
                                this.updateModelAndShowGreenId( response.payload );
                            }
                        } );
                } else {
                    this.showGreenId();
                }
            } );
        }
    }

    private updateModelAndShowGreenId ( model ) {
        this.updateVerificationId( model.verificationId );
        this.showGreenId();
    }

    private showGreenId () : void {
        this.getToken()
            .subscribe( ( response ) => {
                if ( response ) {
                    const verificationToken = response.payload.verificationToken;

                    if ( verificationToken ) {
                        this.initialiseGreenId( verificationToken );
                    } else {
                        // TODO: Some error handling
                        // GitLab Issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/6
                    }
                }
            } );
    }

    private get verificationStatusControl () : FormControl {
        return <FormControl> this.greenIdControlGroup.controls[ 'verificationStatus' ];
    }

    private get verificationIdControl () : FormControl {
        return <FormControl> this.greenIdControlGroup.controls[ 'verificationId' ];
    }

    private get isVerificationCompleted () : boolean {
        const verificationStatus = this.verificationStatusControl;

        return verificationStatus.value &&
            verificationStatus.value !== AmpGreenIdBlockComponent.verificationStatuses.PENDING;
    }

    private get isAlreadyRegistered () : boolean {
        return !!this.verificationIdControl.value;
    }

    private get hasConsentBeenPassed () : boolean {
        return this.isAlreadyRegistered || this.hasOkBeenClicked;
    }

    private createControls () {
        if ( this.__controlGroup ) {
            if ( this.__controlGroup.contains( this.id ) ) {
                this.greenIdControlGroup = <FormGroup> this.__controlGroup.get( this.id );
                this.revalidateControlGroup( this.greenIdControlGroup );
            } else {
                this.greenIdControlGroup = this.createGreenIdControlGroup();
                this.__controlGroup.addControl( this.id, this.greenIdControlGroup );
            }
        } else {
            this.greenIdControlGroup = this.createGreenIdControlGroup();
        }
    }

    private revalidateControlGroup ( controlGroup : FormGroup ) {
        Object.keys( controlGroup.controls ).map( ( key ) => {
            let control = controlGroup.controls[ key ];
            control.setValidators( Validators.required );
            control.updateValueAndValidity( { onlySelf : false } );
        } );
    }

    private replaceAddressNullValues ( model : IGreenIdFormModel ) {
        // greenId api would not accept null for address parts , but accepts empty string !!! (strange)
        if ( model && model.address ) {
            Object.keys( model.address ).map( ( key ) => {
                model.address[ key ] = model.address[ key ] === null ? '' : model.address[ key ];
            } );
        }
    }

    private addCreditCheckHeader ( model ) {
        if ( this.hasCreditCheckHeaderConsentBeenGiven ) {
            Object.assign( model, {
                extraData : [
                    {
                        name : 'dnb-credit-header-consent-given',
                        value : 'true'
                    }
                ]
            } );
        }
    }

    private registerUser () {
        this.replaceAddressNullValues( this.model );
        this.addCreditCheckHeader( this.model );
        return this.ampGreenIdServices
                   .registerUser( this.model );
    }

    private getToken () {
        return this.ampGreenIdServices
                   .getToken( this.verificationIdControl.value );
    }

    private initialiseGreenId ( verificationToken : string ) {
        window[ 'greenidUI' ].show( this.accountId, this.password, verificationToken );
    }

    private loadApiScriptsHandler = ( resolve, reject ) => {
        if ( this.greenIdLoaded ) {
            resolve();
            return;
        }
        if ( !this.greenIdLoaded && this.configScriptUrl && this.uiScriptUrl ) {
            this.getScript( this.configScriptUrl )
                .then( () => this.getScript( this.uiScriptUrl ) )
                .then( () => {
                    resolve();
                } );
            return;
        }
        reject( 'Script urls were not provided' );
    }

    private onSessionComplete = ( token : string, verificationStatus : string ) => {
        this.verificationStatusControl.setValue( verificationStatus );
        this.$complete.emit( verificationStatus );
        this.showOkButton = true;
        this._cd.markForCheck();
    }

    private onSessionCancelled = ( token : string, verificationStatus : string ) => {
        this.verificationStatusControl.setValue( verificationStatus );
        this.showOkButton = true;
        this._cd.markForCheck();
    }

    private get verificationSuccessful () {
        return [
            AmpGreenIdBlockComponent.verificationStatuses.VERIFIED,
            AmpGreenIdBlockComponent.verificationStatuses.VERIFIED_WITH_CHANGES,
            AmpGreenIdBlockComponent.verificationStatuses.VERIFIED_ADMIN
        ].includes( this.verificationStatusControl.value );

    }

    private get verificationSkipped () {
        return AmpGreenIdBlockComponent.verificationStatuses.IN_PROGRESS === this.verificationStatusControl.value;
    }

    private get verificationFailed () {
        return [
            AmpGreenIdBlockComponent.verificationStatuses.PENDING,
            AmpGreenIdBlockComponent.verificationStatuses.LOCKED_OUT
        ].includes( this.verificationStatusControl.value );
    }

    private createGreenIdControlGroup () {
        return new FormGroup( {
            verificationId : new FormControl( null, Validators.required ),
            verificationStatus : new FormControl( null, Validators.required ),
        } );
    }

    private get greenIdLoaded () {
        return window[ 'greenidUI' ] && window[ 'greenidConfig' ];
    }

    private setupGreenId () : void {
        let options = Object.assign( this.greenIdSettings, {
            sessionCompleteCallback : this.onSessionComplete,
            sessionCancelledCallback : this.onSessionCancelled,
            enableCancelButton : true
        } );
        window[ 'greenidConfig' ].setOverrides( {
            'enable_save_and_complete_later' : false,
            'dnb_tandc_text' : this.termsAndConditionsText,
            'intro_title' : '<h1>Verify your identity</h1>',
            'intro_introText0' : `<p class="lead">The details you enter below need to match with 2 different ID sources. You must choose one ID source that's from a government body.</p>
                                  <p class="lead">If you skip this step, you'll still need to verify your identity later on a paper form (much harder to do). And you can't use your new account until you've done this.</p>`,
            'cancel_button_text' : 'Skip ID check'
        } );
        window[ 'greenidUI' ].setup( options );
    }

    private getScript ( stringUrl : string ) : Promise<string> {
        return new Promise( ( resolve ) => {
            this.loadScript( stringUrl ).onload = () => {
                resolve( stringUrl );
            };
        } );
    }

    private loadScript ( urlString : string ) : HTMLScriptElement {
        let node = document.createElement( 'script' );
        node.src = urlString;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( node );
        return node;
    }

    private updateVerificationId ( newVerificationId : string ) : void {
        this.verificationIdControl.setValue( newVerificationId );
    }

    private onCreditCheckHeaderConsentClick () {
        this.hasOkBeenClicked = true;
        this.hasCreditCheckHeaderConsentBeenGiven = !!this.creditHeaderCheckboxComponent.control.value;
        this.startVerification();
    }

    private onOkClick () {
        this.onNext();
        this.showOkButton = false;
    }

    /**
     * Get necessary values from the model, from paths given in the exeperience's form-def
     */
    private mapGreenIdModel () {
        let rootApplicantFDN = '';
        if (this.__custom.rootApplicantFDN) {
            if (this.__custom.applicantIndex) {
                rootApplicantFDN = this.__custom.rootApplicantFDN + this.__custom.applicantIndex;
            } else {
                if (this.__repeaterIndex) {
                    rootApplicantFDN = this.__custom.rootApplicantFDN + '.' + this.__repeaterIndex + '.';
                }
            }
        }
        return {
            title       : get(this.__form.value, rootApplicantFDN + this.__custom.titleFDN, ''),
            firstName   : get(this.__form.value, rootApplicantFDN + this.__custom.firstNameFDN, ''),
            middleNames : get(this.__form.value, rootApplicantFDN + this.__custom.middleNamesFDN, '') || '',
            lastName    : get(this.__form.value, rootApplicantFDN + this.__custom.lastNameFDN, ''),
            dateOfBirth : get(this.__form.value, rootApplicantFDN + this.__custom.dateOfBirthFDN, ''),
            email       : get(this.__form.value, rootApplicantFDN + this.__custom.emailFDN, ''),
            address     : {
                country      : 'AU',
                state        : get(this.__form.value, rootApplicantFDN + this.__custom.stateFDN, ''),
                streetName   : get(this.__form.value, rootApplicantFDN + this.__custom.streetNameFDN, '') || '',
                flatNumber   : get(this.__form.value, rootApplicantFDN + this.__custom.flatNumberFDN, '') || '',
                streetNumber : get(this.__form.value, rootApplicantFDN + this.__custom.streetNumberFDN, ''),
                suburb       : get(this.__form.value, rootApplicantFDN + this.__custom.suburbFDN, '') || '',
                postcode     : get(this.__form.value, rootApplicantFDN + this.__custom.postcodeFDN, ''),
                streetType   : get(this.__form.value, rootApplicantFDN + this.__custom.streetTypeFDN, '')
            }
        };
    }

}
