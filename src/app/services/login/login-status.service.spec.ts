import { ReflectiveInjector } from '@angular/core';
import {
    fakeAsync,
    tick
} from '@angular/core/testing';
import {
    BaseRequestOptions,
    ConnectionBackend,
    Http,
    RequestOptions
} from '@angular/http';
import {
    Response,
    ResponseOptions
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import { Subscription } from 'rxjs';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { LoginStatusService } from './login-status.service';

describe( 'Service: Login status', () => {
    let loginStatusService : LoginStatusService;
    let res : Response;
    let connection : MockConnection;

    beforeEach(() => {
        let text : string;    // this will be set from mock response
        const injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            LoginStatusService,
            AmpHttpService
        ]);

        const backend = injector.get(ConnectionBackend);
        loginStatusService = injector.get(LoginStatusService);

        backend.connections.subscribe((c : MockConnection) => connection = c);
        res = new Response(new ResponseOptions({body : 'Something'}));
        res.ok = true;
    });

    describe( 'When the userHasLoggedIn event has been subscribed to AND the loginSuccess is called', () => {
        it( 'should trigger the subscription event', () => {
            const loggedInSub : Subscription = loginStatusService.userHasLoggedIn()
                .subscribe( ( isLoggedIn ) => {
                    expect( isLoggedIn ).toBe( true );
                } );

            loginStatusService.loginSuccess();

            return loggedInSub;
        } );
    } );

    describe('Given loginSuccess has already been called, When userHasLoggedIn event is subscribed to', () => {
        it('should trigger the subscription event straight away', () => {
            loginStatusService.loginSuccess();

            return loginStatusService.userHasLoggedIn()
                .subscribe((isLoggedIn) => {
                    expect(isLoggedIn).toBe(true);
                });
        });
    });

    describe('When the session is already loggedIn, further checking of the session status', () => {
        it('should only trigger the subscription event once', () => {
            loginStatusService.userHasLoggedIn()
                .scan((accumulatedValue) => {
                    return accumulatedValue + 1;
                }, 0)
                .subscribe((counter) => {
                    expect(counter).toBe(1);
                });

            loginStatusService.loginSuccess();
            loginStatusService.loginSuccess();
            loginStatusService.loginSuccess();
        });
    });

    describe('When the user is already loggedIn', () => {
        it('should trigger the subscription event once when checkLoginStatus is invoked', fakeAsync(() => {
            expect(loginStatusService.hasLoggedIn()).toBe(false);

            loginStatusService.checkLoginStatus();

            connection.mockRespond(res);
            tick();

            expect(loginStatusService.hasLoggedIn()).toBe(true);
        }));
    });

} );
