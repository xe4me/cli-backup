import {
    TestBed,
    async,
    inject
} from '@angular/core/testing';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
} from '@angular/http';
import {
    AmpHttpService
} from 'amp-ddc-components';
import { EligibleAccountsService } from './eligible-accounts.service';

const mockHttpProvider = {
    provide    : Http,
    deps       : [ MockBackend, BaseRequestOptions ],
    useFactory : ( backend : MockBackend, defaultOptions : BaseRequestOptions ) => {
        return new Http( backend, defaultOptions );
    }
};

describe('Service: Eligible accounts', () => {
    let service : EligibleAccountsService;
    let backend : MockBackend;
    const mockEligibleAccounts = {
        deposit: [],
        offset: [],
        loan: []
    };

    beforeEach( async (() => {
        TestBed.configureTestingModule({
            providers: [
                mockHttpProvider,
                MockBackend,
                BaseRequestOptions,
                AmpHttpService,
                EligibleAccountsService
            ]
        });
    }));

    beforeEach(inject([ EligibleAccountsService, MockBackend ],
        ( eligibleAccountService : EligibleAccountsService, mockBackend : MockBackend ) => {
            service = eligibleAccountService;
            backend = mockBackend;
        }));

    it(`should get the collection of eligible accounts and 
        emit the result to the subscription`, ( done ) => {
        backend.connections.subscribe( ( connection : MockConnection ) => {
            expect( connection.request.method ).toBe( RequestMethod.Get );
            let options = new ResponseOptions( {
                body : JSON.stringify( mockEligibleAccounts )
            } );

            connection.mockRespond( new Response( options ) );
        } );

        service.getEligibleAccounts()
            .subscribe(
                ( response ) => {
                    expect( response ).toEqual( mockEligibleAccounts );
                    done();
                },
                ( error ) => {
                    done.fail(error);
                }
            );
    });
});
