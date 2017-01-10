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
    private formModel : any;
    public setAccountsData( id : string ,
                            formModel : any ,
                            accounts : any[] ) {
        this.accounts = accounts;
        this.pdfId = id;
        this.formModel = formModel;
    }
    public getAccounts() : any[] {
        return this.accounts;
    }

    public getApplicantList() : any[] {
        let applicants = [];
        applicants.push({
            name : this.getApplicantName(this.formModel.Application.Applicant1Section),
            verified: this.isVerified(this.formModel.Application.Applicant1Section)
        });
        if (this.formModel.Application.SingleOrJoint.SingleOrJoint === Constants.jointApplicant ) {
            applicants.push({
                name : this.getApplicantName(this.formModel.Application.Applicant2Section),
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
    private getApplicantName (applicant : any) : string {
        const BasicInfo = applicant.PersonalDetailsSection.BasicInfo;
        return `${BasicInfo.FirstName}${BasicInfo.MiddleName ? ' ' + BasicInfo.MiddleName + ' ' : ' '}${BasicInfo.LastName}`;
    }

    private isIndividual() : boolean {
        return this.formModel.Application.SingleOrJoint.SingleOrJoint === Constants.singleApplicant;
    }

    private isVerified(applicant : any) : boolean {
        if ( applicant.IdentitySection.OnlineOrOfflineIdCheck.OnlineIDCheck === 'online' ) {
            let status = applicant.IdentitySection.IdCheck['green-id-identity-check'].verificationStatus;
            return status === 'VERIFIED_WITH_CHANGES' || status === 'VERIFIED';
        } else {
            return false;
        }
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
