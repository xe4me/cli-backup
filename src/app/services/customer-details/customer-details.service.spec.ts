import {
    addProviders,
    inject,
    async,
    TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { provide } from '@angular/core';

import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
 } from '@angular/http';

import { AmpHttpService } from '../amp-http/amp-http.service';
import { CustomerDetailsService } from './customer-details.service';

const customerDetailsBody = {
    'meta': {
        'url': '/ddc/secure/api/customer/customer-details?scvid=2239410',
        'method': 'GET',
        'responseTimeMs': 2262
    },
    'payload': {
        'title': 'Mr.',
        'givenName': 'Yibqv',
        'firstMiddleName': 'Xvkvt',
        'familyName': 'Xdkkvt',
        'genderType': 'M',
        'birthDate': '1974-06-19',
        'contactDetails': {
            'residentialAddress': {
                'scrubbedAddressIndicator': false,
                'addressId': '572343952077051101',
                'suburbName': 'COOROY',
                'cityName': 'Not Available',
                'stateCode': 'QLD',
                'countryCode': '9',
                'country': 'Australia',
                'postcode': '4563',
                'addressLine1': 'Cooroy Mountain Road'
            },
            'businessAddress': {
                'scrubbedAddressIndicator': true,
                'dPID': '40107265',
                'addressId': '947543929589426402',
                'suburbName': 'Noosa Heads',
                'cityName': 'Not Available',
                'stateCode': 'QLD',
                'countryCode': '9',
                'country': 'Australia',
                'postcode': '4567',
                'addressLine1': 'Shop 1 36 Sunshine Beach Rd'
            },
            'postalAddress': {
                'scrubbedAddressIndicator': true,
                'addressId': '947243929589427602',
                'suburbName': 'Noosaville',
                'cityName': 'Not Available',
                'stateCode': 'QLD',
                'countryCode': '9',
                'country': 'Australia',
                'postcode': '4566',
                'addressLine1': 'PO Box 196'
            },
            'workPhone': '1300846347',
            'emailAddress': 'XBIL_B_FAPXLVE@BCX.RDC.BI',
            'homePhone': '0754477110',
            'mobilePhone': '0411121661'
        },
        'contracts': [
            {
                'productSystemCode': 'BK',
                'productCode': '1235',
                'productName': 'Investment Builder Account',
                'contractComponents': [
                    {
                        'contractComponentType': 'ContractAddress',
                        'contractLocationUsage': 'Contract Correspondence Address',
                        'wrongContractLocationIndicator': false,
                        'contractLocation': {
                            'scrubbedAddressIndicator': true,
                            'addressId': '947243929589427602',
                            'suburbName': 'Noosaville',
                            'cityName': 'Not Available',
                            'stateCode': 'QLD',
                            'countryCode': '9',
                            'country': 'Australia',
                            'postcode': '4566',
                            'addressLine1': 'PO Box 196'
                        }
                    }
                ],
                'pasContractId': '423438506',
                'displayContractId': '423438506'
            },
            {
                'productSystemCode': 'CP',
                'productCode': 'FCI',
                'productName': 'Flexible Lifetime - Protection',
                'contractComponents': [
                    {
                        'contractComponentType': 'ContractAddress',
                        'contractLocationUsage': 'Contract Correspondence Address',
                        'wrongContractLocationIndicator': false,
                        'contractLocation': {
                            'scrubbedAddressIndicator': true,
                            'addressId': '947243929589427602',
                            'suburbName': 'Noosaville',
                            'cityName': 'Not Available',
                            'stateCode': 'QLD',
                            'countryCode': '9',
                            'country': 'Australia',
                            'postcode': '4566',
                            'addressLine1': 'PO Box 196'
                        }
                    }
                ],
                'pasContractId': 'NT5191547C',
                'displayContractId': 'NT5191547C'
            },
            {
                'productSystemCode': 'U2',
                'productCode': 'FL',
                'productName': 'Flexible Lifetime - Super',
                'contractComponents': [
                    {
                        'contractComponentType': 'ContractAddress',
                        'contractLocationUsage': 'Contract Correspondence Address',
                        'wrongContractLocationIndicator': false,
                        'contractLocation': {
                            'scrubbedAddressIndicator': true,
                            'addressId': '947243929589427602',
                            'suburbName': 'Noosaville',
                            'cityName': 'Not Available',
                            'stateCode': 'QLD',
                            'countryCode': '9',
                            'country': 'Australia',
                            'postcode': '4566',
                            'addressLine1': 'PO Box 196'
                        }
                    }
                ],
                'pasContractId': 'M701391775',
                'displayContractId': '701391775'
            },
            {
                'productSystemCode': 'BK',
                'productCode': '1240',
                'productName': 'eASYSAVER Account',
                'contractComponents': [
                    {
                        'contractComponentType': 'ContractAddress',
                        'contractLocationUsage': 'Contract Correspondence Address',
                        'wrongContractLocationIndicator': false,
                        'contractLocation': {
                            'scrubbedAddressIndicator': true,
                            'addressId': '947243929589427602',
                            'suburbName': 'Noosaville',
                            'cityName': 'Not Available',
                            'stateCode': 'QLD',
                            'countryCode': '9',
                            'country': 'Australia',
                            'postcode': '4566',
                            'addressLine1': 'PO Box 196'
                        }
                    }
                ],
                'pasContractId': '717360432',
                'displayContractId': '717360432'
            }
        ]
    }
};

const mockHttpProvider = {
    deps:       [ MockBackend, BaseRequestOptions ],
    useFactory: (backend : MockBackend, defaultOptions : BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe( 'Fetch customer details from server' , () => {
    let service : CustomerDetailsService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers    : [ BaseRequestOptions,
                             CustomerDetailsService,
                             MockBackend,
                             provide(AmpHttpService, mockHttpProvider) ]
        } );
        TestBed.compileComponents();
    }));

    beforeEach( inject( [CustomerDetailsService, MockBackend],
                        (customerDetailsService : CustomerDetailsService, mockBackend : MockBackend) => {
        service = customerDetailsService;
        backend = mockBackend;
    }));

    it('gets the details with an http call to /customer/customer-details', (done) => {
        backend.connections.subscribe((connection : MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify( customerDetailsBody )
            });
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe('/customer/customer-details');
            connection.mockRespond(new Response(options));
        });

        service.fetchCustomerDetails()
               .subscribe(
                    (response) => {
                        expect(response).toEqual(customerDetailsBody);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to fetch customer details');
                    }
                );
      });
});
describe( 'getCustomerDetails()' , () => {
    let service : CustomerDetailsService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers    : [ BaseRequestOptions,
                             CustomerDetailsService,
                             MockBackend,
                             provide(AmpHttpService, mockHttpProvider) ]
        } );
        TestBed.compileComponents();
    }));

    beforeEach( inject( [CustomerDetailsService, MockBackend],
                        (customerDetailsService : CustomerDetailsService, mockBackend : MockBackend) => {
        service = customerDetailsService;
        backend = mockBackend;
    }));

    it('should gets the correct customer details with an http call to /customer/customer-details', (done) => {
        // Changing the customer payload because user has updated his/her profile in CMDM
        let updatedCustomerDetails = JSON.parse(JSON.stringify(customerDetailsBody));
        updatedCustomerDetails.payload.familyName = 'kwok';

        let responseOptionsArr = [];
        responseOptionsArr.push(new ResponseOptions({body: JSON.stringify( customerDetailsBody )}));
        responseOptionsArr.push(new ResponseOptions({body: JSON.stringify( updatedCustomerDetails )}));

        backend.connections.subscribe((connection : MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe('/customer/customer-details');

            connection.mockRespond(new Response(responseOptionsArr.shift()));
        });

        service.getCustomerDetails()
               .then(
                    (response) => {
                        expect(response).toEqual(customerDetailsBody);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to get customer details');
                    }
                );

        // GetCustomerDetails using cached version should still get the old customerDetailsBody
        service.getCustomerDetails()
               .then(
                    (response) => {
                        expect(response).toEqual(customerDetailsBody);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to get customer details');
                    }
                );

        // GetCustomerDetails with 
        service.getCustomerDetails(false)
               .then(
                    (response) => {
                        expect(response).toEqual(updatedCustomerDetails);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to get customer details');
                    }
                );
    });
});
