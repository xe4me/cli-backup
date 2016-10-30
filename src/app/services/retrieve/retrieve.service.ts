import { Injectable , EventEmitter } from '@angular/core';
import { Headers , RequestOptions , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service.ts';
import { Environments } from '../../abstracts/environments/environments.abstract.ts';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import { getIn } from '../../modules/amp-utils/functions.utils';
@Injectable()
export class RetrieveService {
    private _modelData = {
        "Application" : {
            "WelcomeBlockComponent" : {
                "NewOrExisting" : "new"
            } ,
            "PracticeDetails"       : {
                "ContactDetails"    : {
                    "FirstName"     : "Darron" ,
                    "LastName"      : "Smith" ,
                    "ContactNumber" : "02 4940 8999" ,
                    "Email"         : "graham@pinnaclefinancial.com.au"
                } ,
                "PracticePrincipal" : {
                    "Address" : {
                        "searchOrManualControl" : true ,
                        "search"                : {
                            "selectedItem" : null ,
                            "query"        : null
                        } ,
                        "manualAddress"         : {
                            "country"  : "AUS" ,
                            "address"  : "100 George Street" ,
                            "suburb"   : "Sydney" ,
                            "state"    : "NSW" ,
                            "city"     : null ,
                            "postCode" : "2000"
                        }
                    }
                } ,
                "PracticeAddress"   : {
                    "Address" : {
                        "searchOrManualControl" : true ,
                        "search"                : {
                            "selectedItem" : null ,
                            "query"        : null
                        } ,
                        "manualAddress"         : {
                            "country"  : "AUS" ,
                            "address"  : "33 Alfred Street" ,
                            "suburb"   : "Sydney" ,
                            "state"    : "NSW" ,
                            "city"     : null ,
                            "postCode" : "2000"
                        }
                    }
                } ,
                "PracticeType"      : {
                    "PracticeType" : "Company"
                } ,
                "EquityHolders"     : {
                    "HasEquityHolders" : "Yes" ,
                    "EquityHolders"    : [
                        {
                            "EquityHolderFirstName"     : "Freddie" ,
                            "EquityHolderLastName"      : "Mercury" ,
                            "EquityHolderAddress"       : {
                                "searchOrManualControl" : true ,
                                "search"                : {
                                    "selectedItem" : null ,
                                    "query"        : null
                                } ,
                                "manualAddress"         : {
                                    "country"  : "AUS" ,
                                    "address"  : "10 Queen St" ,
                                    "suburb"   : "Woollahra" ,
                                    "state"    : "NSW" ,
                                    "city"     : null ,
                                    "postCode" : "2025"
                                }
                            } ,
                            "EquityHolderContactNumber" : "02 5555 1234" ,
                            "EquityHolderEmail"         : "freddie@queen.co.uk"
                        }
                    ]
                }
            } ,
            "ApplicationDetails"    : {
                "PartnershipManager" : {
                    "FirstName" : "Jimi" ,
                    "LastName"  : "Hendrix" ,
                    "RequestID" : "123456789"
                } ,
                "ExerciseDate"       : {
                    "ExerciseDate" : "01/01/2019"
                }
            } ,
            "ActionsRequired"       : {
                "Mortgages"        : {
                    "PracticeMortgagesOption" : "No"
                } ,
                "Agreements"       : {
                    "PracticeAgreementsOption" : "No"
                } ,
                "MandatoryActions" : {
                    "PracticeMandatoryActionsConfirmation" : true
                }
            } ,
            "FurtherTerms"          : {
                "AmendedTerms" : {
                    "PracticeAmendedTermsOption" : "No"
                }
            } ,
            "ReviewSection"         : {
                "ReviewSummaryBlock"     : {} ,
                "UploadSignedPagesBlock" : {} ,
                "ReviewStickyBlock"      : {}
            }
        }
    };

    public getBlockValue ( _fdn ) {
        let block = getIn( _fdn , this._modelData , 0 );
        console.log( '********** >>>' );
        console.log( '_fdn' , _fdn );
        console.log( 'block' , block );
        console.log( '<<<< ********** ' );
        return block;
    }

    public getControlModel ( _fdn ) {
        let model = getIn( _fdn , this._modelData ,0 );
        console.log( 'model' , model );
        return model;
    }
}
