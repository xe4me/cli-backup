import {
    Component,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';
import {
    AccountsListDataService
} from '../../shared/accounts-list-data.service';
@Component( {
    selector    : 'postnone-account-page' ,
    template : require( './postnone-account-page.html' ),
    styles: [ require( './postnone-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PostnoneJointAccountPage implements OnInit {
    private verificatonDocUrl : string =
        Environments.property.DamContentUrl
        + 'amp/digitalhub/common/Documents/Find%20a%20form/Forms/NS3297_Identification_Verfication_Form.PDF';
    private applicantList : Array<any> ;
    private verifyRequiredPersonName : string;
    constructor ( private accountsListDataService : AccountsListDataService ) {
    }

    public ngOnInit () : any {
        this.applicantList = this.accountsListDataService.getApplicantList();
        this.verifyRequiredPersonName = this.getVerifyRequiredPersonName();
    }

    private getVerifyRequiredPersonName() : string {
        if ( !this.applicantList[0].verified && !this.applicantList[1].verified) {
           return 'your';
        } else {
            let name = '';
            if ( !this.applicantList[0].verified ) {
                name = this.applicantList[0].name;
            }
            if ( !this.applicantList[1].verified ) {
                name = this.applicantList[1].name;
            }
            return `${name}'s`;
        }
    }
}
