import {
    LoginStatusService
} from '../shared';

describe('Service: Login status', () => {
    describe(`When the userHasLoggedIn event has been subscribed to AND 
                the loginSuccess is called`, () => {
        let loginStatusService : LoginStatusService;

        beforeEach(() => {
            loginStatusService = new LoginStatusService();
        });

        it('should trigger the subscription event', () => {
            const loggedInSub = loginStatusService.userHasLoggedIn()
                .subscribe((isLoggedIn) => {
                    expect(isLoggedIn).toBe(true);
                });

            loginStatusService.loginSuccess();

            return loggedInSub;
        });

    });

    // TODO: This is skipped as the test only passes if the Observable has already been
    //       subscribed to before the event is triggered which is not the desired behaviour
    //       it should replay the action no matter when the subscribe is called
    //       Github issue: https://gitlab.ccoe.ampaws.com.au/DDC/experience-bett3r/issues/3
    xdescribe('When the userHasLoggedIn event has been subscribed to again', () => {
        let loginStatusService : LoginStatusService;

        beforeEach(() => {
            loginStatusService = new LoginStatusService();
        });
        it('should trigger the subscription event straight away', () => {
            // loginStatusService.userHasLoggedIn()
            //     .subscribe((isLoggedIn) => {
            //         console.log('I triggered', isLoggedIn);
            //     });

            loginStatusService.loginSuccess();

            return loginStatusService.userHasLoggedIn()
                .subscribe((isLoggedIn) => {
                    expect(isLoggedIn).toBe(true);
                });
        });
    });
});
