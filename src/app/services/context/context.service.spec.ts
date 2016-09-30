import {
  addProviders,
  inject,
  async,
  TestBed
} from '@angular/core/testing';

import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';

import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
 } from '@angular/http';

import { ContextService } from './context.service';
import { AmpHttpService } from '../amp-http/amp-http.service';

const contextBody = {
                'errors': [],
                'data'  : {
                    'realUser'                  : 'BCABB-F',
                    'actingAsUser'              : null,
                    'impersonatedUser'          : '',
                    'isPrincipal'               : true,
                    'practiceName'              : 'Pinnacle Financial Pty Ltd',
                    'licensee'                  : 'DEA_AMPFP',
                    'payeeID'                   : 'BCABB-F',
                    'practicePrincipalFirstName': 'Darron',
                    'practicePrincipalLastName' : 'Smith',
                    'iat'                       : 1461207449,
                    'exp'                       : 1466474035,
                    'jwt_realUserFirstName'     : 'Tamas',
                    'jwt_realUserLastName'      : 'Ridly',
                    'jwt_realUser'              : 'BCABB-F',
                    'jwt_iss'                   : 'Portal',
                    'jwt_impersonatedUser'      : ''
                }
    };

const mockHttpProvider = {
    deps:       [ MockBackend, BaseRequestOptions ],
    useFactory: (backend : MockBackend, defaultOptions : BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe( 'Fetch context from server' , () => {
    let subject : ContextService = null;
    let backend : MockBackend = null;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers    : [ BaseRequestOptions,
                             ContextService,
                             MockBackend,
                             provide(AmpHttpService, mockHttpProvider) ]
        } );
        TestBed.compileComponents();
    }));

    beforeEach( inject( [ContextService, MockBackend],
                        (contextService : ContextService, mockBackend : MockBackend) => {
        subject = contextService;
        backend = mockBackend;
    }));

    it('gets the context with an http call to /usersession.', (done) => {
        backend.connections.subscribe((connection : MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify( contextBody )
            });
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe('/usersession');
            connection.mockRespond(new Response(options));
        });

        subject.fetchContext()
               .subscribe(
                    (response) => {
                        expect(response).toEqual(contextBody);
                        done();
                    },
                    (error) => {
                        done.fail('Failed to obtain the context');
                    }
                );
      });
});
