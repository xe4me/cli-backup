import { Subscription } from 'rxjs';
import { GreenIdStatusService } from './green-id-status.service';

describe( 'Service: GreenId Status', () => {
    let greenIdStatusService : GreenIdStatusService;
    const applicantOneIndex = 1;
    const applicantTwoIndex = 2;

    beforeEach ( () => {
        greenIdStatusService = new GreenIdStatusService();
    } );

    describe ( 'WHEN the green id verification is triggered for Applicant 1', () => {

        it ( 'SHOULD trigger the subscription with green id verification result set to be true Applicant 1', ()  => {
            const greenIdSub : Subscription = greenIdStatusService
                .isGreenIdVerified()
                .subscribe( ( greenIdResults ) => {

                    expect( greenIdResults[applicantOneIndex] ).toBe( true );

                    greenIdSub.unsubscribe();
                });

            greenIdStatusService.greenIdVerified( applicantOneIndex );

            return greenIdSub;
        });
    });

    describe ( 'WHEN the green id verification is triggered for Applicant 1 and 2', () => {
        it ( 'SHOULD trigger the subscription with green id verification result set to be true for Applicant 1 and 2 ', ()  => {
            greenIdStatusService.greenIdVerified( applicantOneIndex );

            const greenIdSub : Subscription = greenIdStatusService
                .isGreenIdVerified()
                .subscribe( ( greenIdResults ) => {

                    expect( greenIdResults[applicantOneIndex] ).toBe( true );

                    expect( greenIdResults[applicantTwoIndex] ).toBe( true );

                    greenIdSub.unsubscribe();
                });

            greenIdStatusService.greenIdVerified( applicantTwoIndex );

            return greenIdSub;
        });
    });
});
