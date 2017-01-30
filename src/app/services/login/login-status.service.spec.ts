import { LoginStatusService } from './login-status.service';

describe( 'Service: Login status', () => {

    describe( 'When the userHasLoggedIn event has been subscribed to AND the loginSuccess is called', () => {
        let loginStatusService : LoginStatusService;

        beforeEach( () => {
            loginStatusService = new LoginStatusService();
        } );

        it( 'should trigger the subscription event', () => {
            const loggedInSub = loginStatusService.userHasLoggedIn()
                .subscribe( ( isLoggedIn ) => {
                    expect( isLoggedIn ).toBe( true );
                } );

            loginStatusService.loginSuccess();

            return loggedInSub;
        } );

    } );
} );
