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
            name : this.getApplicantName(this.formModel.Application.Applicant1Section),
            verified: this.isVerified(this.formModel.Application.Applicant1Section)
        });
        if (this.formModel.Application.SingleOrJoint.SingleOrJoint === 'JointApplicant' ) {
            applicants.push({
                name : this.getApplicantName(this.formModel.Application.Applicant2Section),
                verified: this.isVerified(this.formModel.Application.Applicant2Section)
            });
        }
        console.log(applicants[0]);
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
        return `${BasicInfo.FirstName} ${BasicInfo.LastName}`;
    }

    private isIndividual() : boolean {
        return this.formModel.Application.SingleOrJoint.SingleOrJoint === 'Individual';
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
