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
    styles: [ require( './../confirmationWithConditionSingle/postnone-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PostnoneJointAccountPage implements OnInit {
    private verificatonDocUrl : string =
        Environments.property.DamContentUrl
        + 'amp/digitalhub/common/Documents/Find%20a%20form/Forms/NS3297_Identification_Verfication_Form.PDF';
    private applicantList : Array<any> ;
    constructor ( private accountsListDataService : AccountsListDataService ) {
    }

    public ngOnInit () : any {
        this.applicantList = this.accountsListDataService.getApplicantList();
    }

    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }
}
