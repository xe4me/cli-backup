import {
    Injectable
} from '@angular/core';
@Injectable()
export class AccountsListDataService {
    public accounts : Array<any>;
    public pdfId : string;
    private formModel : any;
    public setAccountsData( id : string ,
                            formModel : any ,
                            accounts : Array<any> ) {
        this.accounts = accounts;
        this.pdfId = id;
        this.formModel = formModel;
    }
    public getAccounts() : Array<any> {
        return this.accounts;
    }

    public getApplicantList() : Array<any> {
        let applicants = [];
        applicants.push({
            name : this.getApplicantFirstName(this.formModel.Application.Applicant1Section),
            verified: this.isVerified(this.formModel.Application.Applicant1Section)
        });
        if (this.formModel.Application.SingleOrJoint.SingleOrJoint === 'JointApplicant' ) {
            applicants.push({
                name : this.getApplicantFirstName(this.formModel.Application.Applicant2Section),
                verified: this.isVerified(this.formModel.Application.Applicant2Section)
            });
        }
        return applicants;
    }

    public getPdfId() : string {
        return this.pdfId;
    }
    public navigateTo() : string {
        return  this.isNormal() ?  'confirmation' :
            (this.isIndividual() ? 'confirmationWithConditionSingle' :
                                   'confirmationWithConditionJoint' );
    }
    private getApplicantFirstName (applicant : any) : string {
        return applicant.PersonalDetailsSection.BasicInfo.FirstName;
    }

    private isIndividual() : boolean {
        return this.formModel.Application.SingleOrJoint.SingleOrJoint === 'Individual';
    }

    private isVerified(applicant : any) : boolean {
        let status = applicant.IdentitySection.IdCheck['green-id-identity-check'].verificationStatus;
        return status === 'VERIFIED_WITH_CHANGES' || status === 'VERIFIED';
    }

    private isNormal() : boolean {
        let isNormal : boolean = true;
        this.accounts.forEach((account) => {
            if ( account.transactionalStatus !== 'Normal' )  {
                isNormal = false;
                return false;
            }
        });
        return isNormal;
    }
}
