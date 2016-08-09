/*** Tech debt from NIO **
 * All properties should come from FormDefinition json and defaulted if neccessary in the relevant blocks
 *
 *
 *
 *
 *
 * DO NOT ADD
 *   unless you are experience-nio
 *
 *
 *
 *
 */
export class FormSections {

    public static User                  = 'User';
    public static Quote                 = 'Quote';
    public static Application           = 'Application';
    public static Save                  = 'Save';
}

export class Applicants {
    public static LifeInsuredOne        = 'LifeInsuredOne';
    public static LifeInsuredTwo        = 'LifeInsuredTwo';

}

export class Blocks {
    public static LoggedInUser          = 'loggedInUser';
    public static Adviser               = 'adviser';
    public static QuoteDetails          = 'quoteDetails';
    public static LifeInsuredDetails    = 'applicantDetails';
    public static LifeInsuredAddress    = 'applicantAddress';
    public static LifeInsuredContact    = 'applicantContact';
    public static AddJointApplicant     = 'addJointApplicant';
    public static TemporaryCover        = 'temporaryCover';
    public static PermanentCover        = 'permanentCover';
    public static CommissionDetails     = 'commissionDetails';
    public static PremiumDetails        = 'premiumDetails';
    public static PolicyDetails         = 'policyDetails';
    public static ExistingCover         = 'existingCover';
    public static BeneficiaryDetails    = 'beneficiaryDetails';
    public static FamilyMember          = 'familyMember';
    public static PaymentDetails        = 'paymentDetails';
    public static UnderwritingCallPreferences = 'underwritingCallPreferences';
    public static CommissionSplit       = 'commissionSplit';
    public static ConsentAndDeclaration = 'consentAndDeclaration';
    public static OutOfPocketCover      = 'outOfPocketCover';
    public static ManageCommisions      = 'manageCommisions';

    public static AdviserAdmin          = 'adviserAdmin';
    public static ReviewAndSubmit       = 'reviewAndSubmit';
    public static NextSteps             = 'nextSteps';

    public static QuoteSummary          = 'quoteSummary';
    public static SavePage              = 'savePage';


}

// Each block has a FullyDistinguishedName that will determine the place of it's data in the model
export class FullyDistinguishedNames {
    // Common blocks
    public static UserDetails           = [FormSections.User, Blocks.LoggedInUser];
    public static AdviserDetails        = [FormSections.User, Blocks.Adviser];
    public static QuoteDetails          = [FormSections.Quote, Blocks.QuoteDetails];
    public static QuoteSummary          = [FormSections.Quote, Blocks.QuoteSummary];
    public static CommisionDetails      = [FormSections.Quote, Blocks.CommissionDetails];
    public static BeneficiaryDetails    = [FormSections.Quote, Blocks.BeneficiaryDetails];
    public static FamilyMember          = [FormSections.Quote, Blocks.FamilyMember];
    public static PaymentDetails        = [FormSections.Quote, Blocks.PaymentDetails];
    public static CommissionSplit       = [FormSections.Quote, Blocks.CommissionSplit];
    public static ConsentAndDeclaration = [FormSections.Quote, Blocks.ConsentAndDeclaration];
    public static OutOfPocketCover      = [FormSections.Quote, Blocks.OutOfPocketCover];
    public static ManageCommisions      = [FormSections.Quote, Blocks.ManageCommisions];
    public static ReviewAndSubmit       = [FormSections.Application, Blocks.ReviewAndSubmit];
    public static PolicyDetails         = [FormSections.Quote, Blocks.PolicyDetails];

    // Quote blocks
    public static QuoteLifeInsuredOneAll     = [FormSections.Quote, Applicants.LifeInsuredOne];
    public static QuoteLifeInsuredTwoAll     = [FormSections.Quote, Applicants.LifeInsuredTwo];

    public static AddJointApplicant          = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.AddJointApplicant];

    public static QuoteLifeInsuredOneDetails = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.LifeInsuredDetails];
    public static QuoteLifeInsuredTwoDetails = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.LifeInsuredDetails];

    public static TemporaryCoverOneDetails   = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.TemporaryCover];
    public static TemporaryCoverTwoDetails   = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.TemporaryCover];

    public static PermanentCoverOneDetails   = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.PermanentCover];
    public static PermanentCoverTwoDetails   = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.PermanentCover];

    public static OutOfPocketOneDetails      = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.OutOfPocketCover];
    public static OutOfPocketTwoDetails      = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.OutOfPocketCover];

    public static ManageCommisionsOneDetails = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.ManageCommisions];
    public static ManageCommisionsTwoDetails = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.ManageCommisions];

    public static PremiumOneDetails          = [FormSections.Quote, Applicants.LifeInsuredOne, Blocks.PremiumDetails];
    public static PremiumTwoDetails          = [FormSections.Quote, Applicants.LifeInsuredTwo, Blocks.PremiumDetails];

    // Application blocks
    public static ApplicationOneDetails   = [FormSections.Application, Applicants.LifeInsuredOne, Blocks.LifeInsuredDetails];
    public static ApplicationTwoDetails   = [FormSections.Application, Applicants.LifeInsuredTwo, Blocks.LifeInsuredDetails];

    public static AddressOneDetails       = [FormSections.Application, Applicants.LifeInsuredOne, Blocks.LifeInsuredAddress];
    public static AddressTwoDetails       = [FormSections.Application, Applicants.LifeInsuredTwo, Blocks.LifeInsuredAddress];

    public static ContactOneDetails       = [FormSections.Application, Applicants.LifeInsuredOne, Blocks.LifeInsuredContact];
    public static ContactTwoDetails       = [FormSections.Application, Applicants.LifeInsuredTwo, Blocks.LifeInsuredContact];

    public static ExistingCoverOneDetails = [FormSections.Application, Applicants.LifeInsuredOne, Blocks.ExistingCover];
    public static ExistingCoverTwoDetails = [FormSections.Application, Applicants.LifeInsuredTwo, Blocks.ExistingCover];

    public static UnderwritingOneDetails  = [FormSections.Application, Applicants.LifeInsuredOne, Blocks.UnderwritingCallPreferences];
    public static UnderwritingTwoDetails  = [FormSections.Application, Applicants.LifeInsuredTwo, Blocks.UnderwritingCallPreferences];

    public static SavePage                   = [FormSections.Save, Blocks.SavePage];
    private static separator : string   = '_';
    public static toString(fdn: string[]) : string {
        return fdn.join(FullyDistinguishedNames.separator);
    }
    public static fromString(fdnString: string) : string[] {
        return fdnString.split(FullyDistinguishedNames.separator);
    }
}

export class FlowChart {
    public static after = {
        ApplicantOneDetails: FullyDistinguishedNames.AddJointApplicant.join('_')
    };
}
