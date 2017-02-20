import {
    Injectable
} from '@angular/core';
import {
    Constants
} from '.';

@Injectable()
export class AccountsListDataService {
    public accounts : any[];
    public pdfId : string;
    private application : any;
    public setAccountsData( id : string,
                            application : any,
                            accounts : any[] ) {
        this.accounts = accounts;
        this.pdfId = id;
        this.application = application;
    }

    public getAccounts() : any[] {
        return this.accounts;
    }

    public getApplicantList() : any[] {
        let applicants = [];
        applicants.push({
            name : this.getApplicantName(this.application.Applicant1Section),
            verified: this.isVerified(this.application.Applicant1Section)
        });
        if (this.application.SingleOrJoint.SingleOrJoint === Constants.jointApplicant ) {
            applicants.push({
                name : this.getApplicantName(this.application.Applicant2Section),
                verified: this.isVerified(this.application.Applicant2Section)
            });
        }
        return applicants;
    }

    public getPdfId() : string {
        return this.pdfId;
    }

    public navigateTo() : string {
        return this.isNormal() ?  'confirmation' :
            (this.isIndividual() ? 'confirmationWithConditionSingle' :
                                   'confirmationWithConditionJoint' );
    }

    private getApplicantName (applicant : any) : string {
        const BasicInfo = applicant.PersonalDetailsSection.BasicInfo;
        return `${BasicInfo.FirstName}${BasicInfo.MiddleName ? ' ' + BasicInfo.MiddleName + ' ' : ' '}${BasicInfo.LastName}`;
    }

    private isIndividual() : boolean {
        return this.application.SingleOrJoint.SingleOrJoint === Constants.singleApplicant;
    }

    private isVerified(applicant : any) : boolean {
        let status = applicant.IdentitySection.IdCheck.greenIdIdentityCheck.verificationStatus;
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
