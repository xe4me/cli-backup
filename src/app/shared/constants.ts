import { Environments } from 'amp-ddc-components';

export class Constants {
    public static baseBett3rUrl            = '/bett3r';
    public static saveUrl                  = Constants.baseBett3rUrl + '/save';
    public static submitUrl                = Constants.baseBett3rUrl + '/submit';
    public static accountsPdfUrl           = Constants.baseBett3rUrl + '/pdf/accounts';
    public static smsPostUrl               = Environments.property.ApiCallsBaseUrl + '/sms/postMessage';
    public static singleApplicant : string = 'Individual';
    public static jointApplicant : string = 'JointApplicant';
    public static onlineIdCheck : string = 'online';
    public static offlineIdCheck : string = 'offline';
    public static referenceIdName : string = 'referenceId';
}
