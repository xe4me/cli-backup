import { Environments } from 'amp-ddc-components';

export class Constants {
    public static baseBett3rUrl : string = '/bett3r';
    public static saveUrl : string = `${Constants.baseBett3rUrl}/save`;
    public static submitUrl : string = `${Constants.baseBett3rUrl}/submit`;
    public static accountsPdfUrl : string = `${Constants.baseBett3rUrl}/pdf/accounts`;
    public static retrieveUrl : string = `${Constants.baseBett3rUrl}/retrieve`;
    public static smsPostUrl : string = `${Environments.property.ApiCallsBaseUrl}/sms/postMessage`;
    public static singleApplicant : string = 'Individual';
    public static jointApplicant : string = 'JointApplicant';
    public static newApplication : string = 'NewApplication';
    public static existingApplication : string = 'ExistingApplication';
    public static newCustomer : string = 'NewCustomer';
    public static existingCustomer : string = 'ExistingCustomer';
    public static onlineIdCheck : string = 'online';
    public static offlineIdCheck : string = 'offline';
    public static referenceIdName : string = 'referenceId';
    public static loginSuccess = 'SUCCESS';
    public static loginFailed = 'FAILED';
    public static applicant1Section = 'Applicant1Section';
}
