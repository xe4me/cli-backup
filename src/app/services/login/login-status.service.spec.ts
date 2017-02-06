import { Subscription } from 'rxjs';
import { LoginStatusService } from './login-status.service';

describe( 'Service: Login status', () => {

    describe( 'When the userHasLoggedIn event has been subscribed to AND the loginSuccess is called', () => {
        let loginStatusService : LoginStatusService;

        beforeEach( () => {
            loginStatusService = new LoginStatusService();
        } );

        it( 'should trigger the subscription event', () => {
            const loggedInSub : Subscription = loginStatusService.userHasLoggedIn()
                .subscribe( ( isLoggedIn ) => {
                    expect( isLoggedIn ).toBe( true );
                } );

            loginStatusService.loginSuccess();

            return loggedInSub;
        } );
    } );

    // TODO: This is skipped as the test only passes if the Observable has already been
    //       subscribed to before the event is triggered which is not the desired behaviour
    //       it should replay the action no matter when the subscribe is called
    //       Github issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/7
    xdescribe('When the userHasLoggedIn event has been subscribed to again', () => {
        let loginStatusService : LoginStatusService;

        beforeEach(() => {
            loginStatusService = new LoginStatusService();
        });
        it('should trigger the subscription event straight away', () => {
            loginStatusService.loginSuccess();

            return loginStatusService.userHasLoggedIn()
                .subscribe((isLoggedIn) => {
                    expect(isLoggedIn).toBe(true);
                });
        });
    });
} );
