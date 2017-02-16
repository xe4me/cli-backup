import {GreenIdStatusService} from './green-id-status.service';
import {async} from '@angular/core/testing';

describe( 'Service: GreenId Status', () => {
    let greenIdStatusService : GreenIdStatusService;

    beforeEach ( () => {
        greenIdStatusService = new GreenIdStatusService();
    } );

    describe ( 'WHEN the green id verification is triggered with an index', () => {
        it ( 'should trigger the subscription with correct data', ()  => {
            let applicantOneIndex = 2;
            greenIdStatusService
                .isGreenIdVerified()
                .subscribe( ( greenIdResults ) => {
                    expect( greenIdResults[applicantOneIndex] ).toBe( true );
                });
            greenIdStatusService.greenIdVerified( applicantOneIndex );
        });
    });
});
