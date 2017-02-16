// import {GreenIdStatusService} from './green-id-status.service';
//
// describe( 'Service: GreenId Status', () => {
//     let greenIdStatusService : GreenIdStatusService;
//
//     beforeEach ( () => {
//         greenIdStatusService = new GreenIdStatusService();
//     } );
//
//     describe ( 'WHEN the green id verification is triggered for Applicant 1', () => {
//         it ( 'SHOULD trigger the subscription with green id verification result set to be true Applicant 1', ()  => {
//             let applicantOneIndex = 1;
//             greenIdStatusService.greenIdVerified( applicantOneIndex );
//             return greenIdStatusService
//                 .isGreenIdVerified()
//                 .subscribe( ( greenIdResults ) => {
//                     expect( greenIdResults[applicantOneIndex] ).toBe( true );
//                 });
//         });
//     });
//
//     describe ( 'WHEN the green id verification is triggered for Applicant 2', () => {
//         it ( 'SHOULD trigger the subscription with green id verification result set to be true for Applicant 2 ', ()  => {
//             let applicantTwoIndex = 2;
//             greenIdStatusService.greenIdVerified( applicantTwoIndex );
//             return greenIdStatusService
//                 .isGreenIdVerified()
//                 .subscribe( ( greenIdResults ) => {
//                     expect( greenIdResults[applicantTwoIndex] ).toBe( true );
//                 });
//         });
//     });
// });
