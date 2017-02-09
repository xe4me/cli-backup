import {
    Injectable
} from '@angular/core';
import {
    get,
    has,
    unset,
    set
} from 'lodash';
import { TransformService } from 'amp-ddc-components';
@Injectable()
export class Bett3rTransformService extends TransformService {

    /**
     * Will override the default empty implementation in Components / TransformService
     * Get called by Components / AmpContinueBlockComponent / retrieve()
     */
    public toFrontendModel( appModel ) : any {

        if ( !appModel ) {
            return {};
        }
        let ApplicantSection1 = get( appModel, 'Application.Applicant1Section' );
        let ApplicantSection2 = get( appModel, 'Application.Applicant2Section' );
        unset( appModel, 'Application.MyAMPLoginBlock' );
        this.transformPersonalDetails( ApplicantSection1 );
        this.transformIdentity( ApplicantSection1 );
        this.transformFinalQuestions( ApplicantSection1 );

        if ( ApplicantSection2 ) {
            this.transformPersonalDetails( ApplicantSection2 );
            this.transformIdentity( ApplicantSection2 );
            this.transformFinalQuestions( ApplicantSection2 );
        }
        return ( <any> Object).assign( {}, appModel );
    }

    private transformFinalQuestions( applicant ) {
        let FinalQuestionsSection = 'FinalQuestionsSection';
        // transform SourceOfFunding

        let SourceOfFunding                 = FinalQuestionsSection + '.SourceOfFunding';
        let PrimarySourceOfWealthDropdown   = SourceOfFunding + '.PrimarySourceOfWealthDropdown';
        let SourceOfFundsForAccountDropdown = SourceOfFunding + '.SourceOfFundsForAccountDropdown';
        let ReasonForOpeningAccountDropdown = SourceOfFunding + '.ReasonForOpeningAccountDropdown';
        if ( has( applicant, PrimarySourceOfWealthDropdown ) ) {
            set( applicant, SourceOfFunding + '.PrimarySourceOfWealth', get( applicant, PrimarySourceOfWealthDropdown ) );
            unset( applicant, PrimarySourceOfWealthDropdown );
        }
        if ( has( applicant, SourceOfFundsForAccountDropdown ) ) {
            set( applicant, SourceOfFunding + '.SourceOfFundsForAccount', get( applicant, SourceOfFundsForAccountDropdown ) );
            unset( applicant, SourceOfFundsForAccountDropdown );
        }
        if ( has( applicant, ReasonForOpeningAccountDropdown ) ) {
            set( applicant, SourceOfFunding + '.ReasonForOpeningAccount', get( applicant, ReasonForOpeningAccountDropdown ) );
            unset( applicant, ReasonForOpeningAccountDropdown );
        }
        // transform Residency;
        let Residency                    = FinalQuestionsSection + '.Residency';
        let CountryOfCitizenshipDropdown = Residency + '.CountryOfCitizenshipDropdown';
        if ( has( applicant, CountryOfCitizenshipDropdown ) ) {
            set( applicant, Residency + '.CountryOfCitizenship', get( applicant, CountryOfCitizenshipDropdown ) );
            unset( applicant, CountryOfCitizenshipDropdown );
        }

        let CountryOfResidencyDropdown = Residency + '.CountryOfResidencyDropdown';
        if ( has( applicant, CountryOfResidencyDropdown ) ) {
            set( applicant, Residency + '.CountryOfResidency', get( applicant, CountryOfResidencyDropdown ) );
            unset( applicant, CountryOfResidencyDropdown );
        }

        // transform TaxFileNumber
        let TaxFileNumber                 = FinalQuestionsSection + '.TaxFileNumber';
        let NoTaxFileNumberReasonDropdown = TaxFileNumber + '.NoTaxFileNumberReasonDropdown';
        if ( has( applicant, NoTaxFileNumberReasonDropdown ) ) {
            set( applicant, TaxFileNumber + '.NoTaxFileNumberReason', get( applicant, NoTaxFileNumberReasonDropdown ) );
            unset( applicant, NoTaxFileNumberReasonDropdown );
        }
    }

    private transformIdentity( applicant ) {
        let IdentitySection = 'IdentitySection.OnlineOrOfflineIdCheck';
        if ( has( applicant, IdentitySection ) ) {
            unset( applicant, IdentitySection );
        }
    }

    private transformPersonalDetails( applicant ) {
        let BasicInfoPath = 'PersonalDetailsSection.BasicInfo';
        let AddressPath   = 'PersonalDetailsSection.Address';
        this.transformTitleDrodown( applicant, BasicInfoPath );
        this.transformAddresses( applicant, AddressPath );
    }

    private transformAddress( applicant, ManualAddressPath ) {
        let StreetTypeDropdownPath = ManualAddressPath + '.streetTypeDropdown';
        let StateTypeDropdownPath  = ManualAddressPath + '.stateDropdown';
        // expected path  : 'PersonalDetailsSection.BasicInfo.Address.postalAddress.manualAddress.streetTypeDropdown';
        if ( has( applicant, StreetTypeDropdownPath ) ) {
            set( applicant, ManualAddressPath + '.streetType', get( applicant, StreetTypeDropdownPath ) );
            unset( applicant, StreetTypeDropdownPath );
        }
        if ( has( applicant, StateTypeDropdownPath ) ) {
            set( applicant, ManualAddressPath + '.state', get( applicant, StateTypeDropdownPath ) );
            unset( applicant, StateTypeDropdownPath );
        }
    }

    private transformAddresses( applicant, BasicInfoPath ) {
        let ResidentialManualAddressPath = BasicInfoPath + '.Address.residentialAddress.manualAddress';
        let PostalManualAddressPath      = BasicInfoPath + '.Address.postalAddress.manualAddress';
        // expected path  : 'PersonalDetailsSection.BasicInfo.Address.postalAddress.manualAddress';
        this.transformAddress( applicant, PostalManualAddressPath );
        this.transformAddress( applicant, ResidentialManualAddressPath );
    }

    private transformTitleDrodown( applicant, BasicInfoPath ) {
        let TitleDropdownPath = BasicInfoPath + '.TitleDropdown';
        // expected : 'PersonalDetailsSection.BasicInfo.TitleDropdown';
        if ( has( applicant, TitleDropdownPath ) ) {
            set( applicant, BasicInfoPath + '.Title', get( applicant, TitleDropdownPath ) );
            unset( applicant, TitleDropdownPath );
        }
    }
}
