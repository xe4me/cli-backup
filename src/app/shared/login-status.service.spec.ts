import {
    LoginStatusService
} from '../shared';

fdescribe('Service: Login status', () => {
    let loginStatusService : LoginStatusService;

    beforeEach(() => {
        loginStatusService = new LoginStatusService();
    });

    describe(`When the userHasLoggedIn event has been subscribed to AND 
                the loginSuccess is called`, () => {
        it('should trigger the subscription event', () => {
            const loggedInSub = loginStatusService.userHasLoggedIn()
                .subscribe((isLoggedIn) => {
                    expect(isLoggedIn).toBe(true);
                });

            loginStatusService.loginSuccess();

            return loggedInSub;
        });

        describe(`When the userHasLoggedIn event has been subscribed to again`, () => {
            it('should trigger the subscription event straight away', () => {
                const loggedInSub = loginStatusService.userHasLoggedIn()
                    .subscribe((isLoggedIn) => {
                        expect(isLoggedIn).toBe(false);
                    });

                return loggedInSub;
            });
        });
    });
});
