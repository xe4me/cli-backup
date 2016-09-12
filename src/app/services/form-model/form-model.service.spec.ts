// import {
//   addProviders,
//   inject
// } from '@angular/core/testing';
// import { TestComponentBuilder } from '@angular/core/testing';
// import { Component , provide } from '@angular/core';
// import { BaseRequestOptions , Http , HTTP_PROVIDERS , XHRBackend } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS, Validators } from '@angular/common';
// // Load the implementations that should be tested
// import { FormModelService } from './form-model.service.ts';
// import { FormDefinition , BlockID } from '../../form/formDefinition';
// import { AmpHttpService } from '../amp-http/amp-http.service.ts';
// class MockFormDefinition extends FormDefinition {
// }
// var formModelService: FormModelService;
// var mockFormDef = {
//     id     : 'BuyBackForm' ,
//     version: '0.0.1' ,
//     path   : '/' ,
//     status : 'NEW' ,
//     blocks : [
//         {
//             blockType  : 'DetailsPage' ,
//             blockLayout: 'PAGE' ,
//             path       : 'pages/DetailsPage' ,
//             page       : {
//                 pageId    : null ,
//                 nextPageId: 'confirmation' ,
//                 prevPageId: null ,
//                 routeName : 'BuyBackForm'
//             } ,
//             blocks     : [
//                 {
//                     blockType  : 'IntroBlockComponent' ,
//                     blockLayout: 'INLINE' ,
//                     path       : 'blocks/bolr/init-state/IntroBlock.component'
//                 } ,
//                 {
//                     blockType  : 'ContactDetailsBlockComponent' ,
//                     blockLayout: 'INLINE' ,
//                     path       : 'blocks/bolr/dialogue-state/contact-details/ContactDetailsBlock.component'
//                 } ,
//                 {
//                     blockType  : 'PlannerDetailsBlock' ,
//                     blockLayout: 'INLINE' ,
//                     path       : 'component-groups/PlannerDetailsBlock' ,
//                     custom     : {
//                         id   : 'planner1' ,
//                         label: 'First name'
//                     }
//                 } ,
//                 {
//                     blockType  : 'MultipleComponentsBlock' ,
//                     blockLayout: 'INLINE' ,
//                     path       : 'component-groups/MultipleComponentsBlock' ,
//                     custom     : {
//                         practice: {
//                             id   : 'MultiPracticeName' ,
//                             label: 'Multi Practice name'
//                         } ,
//                         payee   : {
//                             id   : 'MultiPayeeID' ,
//                             label: 'Payee ID'
//                         }
//                     }
//                 } ,
//                 {
//                     blockType  : 'NestedBlock' ,
//                     blockLayout: 'INLINE' ,
//                     path       : 'component-groups/NestedBlock' ,
//                     blocks     : [
//                         {
//                             blockType  : 'ContentBlock' ,
//                             blockLayout: 'INLINE' ,
//                             path       : 'components/ContentBlock' ,
//                             custom     : {
//                                 id   : 'NestedContentBlock' ,
//                                 label: 'Nested content block'
//                             }
//                         } ,
//                         {
//                             blockType  : 'PlannerDetailsBlock' ,
//                             blockLayout: 'INLINE' ,
//                             path       : 'component-groups/PlannerDetailsBlock' ,
//                             custom     : {
//                                 id   : 'NestedPlanner' ,
//                                 label: 'Nested Planner Details'
//                             }
//                         } ,
//                         {
//                             blockType  : 'NestedBlock' ,
//                             blockLayout: 'INLINE' ,
//                             path       : 'component-groups/NestedBlock' ,
//                             blocks     : [
//                                 {
//                                     blockType  : 'ContentBlock' ,
//                                     blockLayout: 'INLINE' ,
//                                     path       : 'components/ContentBlock' ,
//                                     custom     : {
//                                         id   : 'NestedContentBlock2' ,
//                                         label: 'Nested content block2'
//                                     }
//                                 } ,
//                                 {
//                                     blockType  : 'PlannerDetailsBlock' ,
//                                     blockLayout: 'INLINE' ,
//                                     path       : 'component-groups/PlannerDetailsBlock' ,
//                                     custom     : {
//                                         id   : 'NestedPlanner2' ,
//                                         label: 'Nested Planner Details2'
//                                     }
//                                 } ,
//                             ] ,
//                             custom     : {
//                                 id   : 'ParentPayeeId2' ,
//                                 label: 'Parent Payee Id2'
//                             }
//                         } ,
//                     ] ,
//                     custom     : {
//                         id   : 'ParentPayeeId' ,
//                         label: 'Parent Payee Id'
//                     }
//                 } ,
//             ]
//         } ,
//         {
//             blockType  : 'ConfirmationPage' ,
//             blockLayout: 'PAGE' ,
//             path       : 'pages/ConfirmationPage' ,
//             page       : {
//                 pageId    : 'confirmation' ,
//                 nextPageId: null ,
//                 prevPageId: 'details' ,
//                 routeName : 'BuyBackForm'
//             } ,
//             custom     : {
//                 id   : 'confirmationBuyBack' ,
//                 label: 'Your buyer of last resort request has been successfully submitted.'
//             }
//         }
//     ]
// };
// describe( 'FormModelService SAM state methods' , () => {
//     beforeEach(() => addProviders([
//         HTTP_PROVIDERS,
//         FormModelService,
//         AmpHttpService,
//         {
//             provide: XHRBackend,
//             useClass: MockBackend
//         }
//     ]));
//     it( 'isContextValid should check for the existence of the 4 key fields' , inject( [
//         XHRBackend ,
//         AmpHttpService ,
//         FormModelService
//     ] , ( mockBackend , ampHttp , formModelService ) => {
//         formModelService.formDefinition = new MockFormDefinition( mockFormDef , null );
//         expect( formModelService.isPracticeContextValid() ).toBeFalsy();
//         // Hydrate the model
//         let contextData = {
//             data: {
//                 initialized                : false ,
//                 licensee                   : null ,
//                 practicePrincipalFirstName: 'John' ,
//                 practicePrincipalLastName : null ,
//                 payeeID                    : null ,
//                 practiceName               : 'Pinnacle financial pty ltd' ,
//                 realUser                  : 'fred' ,
//                 actingAsUser               : null ,
//                 impersonatedUser           : null ,
//                 isPrincipal                : true ,
//                 iat                        : 1460707004 ,
//                 exp                        : 1465891004
//             }
//         };
//         formModelService.present( {
//             action : 'setContext' ,
//             context: contextData
//         } );
//         expect( formModelService.isPracticeContextValid() ).toBeFalsy();
//         // Hydrate the model
//         contextData = {
//             data: {
//                 initialized                : false ,
//                 licensee                   : 'DEA_HILLROSS' ,
//                 practicePrincipalFirstName: 'John' ,
//                 practicePrincipalLastName : 'Smith' ,
//                 payeeID                    : null ,
//                 practiceName               : 'Pinnacle financial pty ltd' ,
//                 realUser                  : 'fred' ,
//                 actingAsUser               : null ,
//                 impersonatedUser           : null ,
//                 isPrincipal                : true ,
//                 iat                        : 1460707004 ,
//                 exp                        : 1465891004
//             }
//         };
//         formModelService.present( {
//             action : 'setContext' ,
//             context: contextData
//         } );
//         expect( formModelService.isPracticeContextValid() ).toBeFalsy();
//         // Hydrate the model
//         contextData = {
//             data: {
//                 initialized                : false ,
//                 licensee                   : null ,
//                 practicePrincipalFirstName: 'John' ,
//                 practicePrincipalLastName : 'Smith' ,
//                 payeeID                    : 'ABCED-F' ,
//                 practiceName               : 'Pinnacle financial pty ltd' ,
//                 realUser                  : 'fred' ,
//                 actingAsUser               : null ,
//                 impersonatedUser           : null ,
//                 isPrincipal                : true ,
//                 iat                        : 1460707004 ,
//                 exp                        : 1465891004
//             }
//         };
//         formModelService.present( {
//             action : 'setContext' ,
//             context: contextData
//         } );
//         expect( formModelService.isPracticeContextValid() ).toBeFalsy();
//         // Hydrate the model
//         contextData = {
//             data: {
//                 initialized                : false ,
//                 licensee                   : 'DEA_AMPFP' ,
//                 practicePrincipalFirstName: 'John' ,
//                 practicePrincipalLastName : 'Smith' ,
//                 payeeID                    : 'ABCED-F' ,
//                 practiceName               : 'Pinnacle financial pty ltd' ,
//                 realUser                  : 'fred' ,
//                 actingAsUser               : null ,
//                 impersonatedUser           : null ,
//                 isPrincipal                : true ,
//                 iat                        : 1460707004 ,
//                 exp                        : 1465891004
//             }
//         };
//         formModelService.present( {
//             action : 'setContext' ,
//             context: contextData
//         } );
//         expect( formModelService.isPracticeContextValid() ).toBeTruthy();
//     } ) );
// } );
// describe( 'FormModelService SAM Model present data by Action' , () => {
//     beforeEach(() => addProviders([
//         HTTP_PROVIDERS,
//         {
//             provide: XHRBackend,
//             useClass: MockBackend
//         },
//         FormModelService,
//         AmpHttpService
//     ]));
//     it( 'should handle "next" action and return the next block name' , inject( [
//         XHRBackend ,
//         AmpHttpService ,
//         FormModelService
//     ] , ( mockBackend , ampHttp , formModelService ) => {
//         formModelService.formDefinition = new MockFormDefinition( mockFormDef , null );
//         expect( formModelService.getModel() ).not.toBeNull();
//         expect( formModelService.getModel().currentBlockID.index ).toBe( 0 );
//         let nextBlockID = FormDefinition.getNextBlockID( formModelService.formDefinition , formModelService.getModel().currentBlockID );
//         expect( nextBlockID.index ).toBe( 1 );
//         let nextBlock = FormDefinition.getBlockByBlockId( formModelService.formDefinition.blocks , nextBlockID );
//         expect( nextBlock._id ).toEqual( nextBlockID );
//         expect( nextBlock.blockType ).toBe( 'IntroBlockComponent' );
//         nextBlockID = FormDefinition.getNextBlockID( formModelService.formDefinition , nextBlockID );
//         expect( nextBlockID.index ).toBe( 2 );
//         nextBlock = FormDefinition.getBlockByBlockId( formModelService.formDefinition.blocks , nextBlockID );
//         expect( nextBlock._id ).toEqual( nextBlockID );
//         expect( nextBlock.blockType ).toBe( 'ContactDetailsBlockComponent' );
//         nextBlockID = FormDefinition.getNextBlockID( formModelService.formDefinition , nextBlockID );
//         expect( nextBlockID.index ).toBe( 3 );
//         nextBlock = FormDefinition.getBlockByBlockId( formModelService.formDefinition.blocks , nextBlockID );
//         expect( nextBlock._id ).toEqual( nextBlockID );
//         expect( nextBlock.blockType ).toBe( 'PlannerDetailsBlock' );
//         nextBlock = FormDefinition.getBlockByBlockId( formModelService.formDefinition.blocks , new BlockID( null , 9 ) );
//         expect( nextBlock.blockType ).toBe( 'ContentBlock' );
//     } ) );
//     it( 'should be able to invoke FormDefinition.getBlockByBlockId and get the block anywhere in the formDef' , inject( [
//         XHRBackend ,
//         FormModelService
//     ] , ( mockBackend , formModelService ) => {
//         formModelService.formDefinition = new MockFormDefinition( mockFormDef , 'confirmation' );
//         let nextBlock                   = FormDefinition.getBlockByBlockId( formModelService.formDefinition.blocks , new BlockID( 'confirmation' , 0 ) );
//         expect( nextBlock.blockType ).toBe( 'ConfirmationPage' );
//     } ) );
//     it( 'should handle "setContext" action and store it in the model' , inject( [
//         XHRBackend ,
//         FormModelService
//     ] , ( mockBackend , formModelService ) => {
//         formModelService.formDefinition = new MockFormDefinition( mockFormDef , null );
//         expect( formModelService.getModel() ).not.toBeNull();
//         expect( formModelService.getModel().currentBlockID.index ).toBe( 0 );
//         expect( formModelService.getModel().context.licensee ).toBeNull();
//         // Hydrate the model
//         let contextData = {
//             data: {
//                 initialized                : true ,
//                 licensee                   : 'DEA_HILLROSS' ,
//                 practicePrincipalFirstName: 'John' ,
//                 practicePrincipalLastName : 'Smith' ,
//                 payeeID                    : 'ABCDE-F' ,
//                 practiceName               : 'Pinnacle financial pty ltd' ,
//                 realUser                  : 'fred' ,
//                 actingAsUser               : null ,
//                 impersonatedUser           : null ,
//                 isPrincipal                : true ,
//                 iat                        : 1460707004 ,
//                 exp                        : 1465891004 ,
//                 jwt_realUserFirstName      : null ,
//                 jwt_realUserLastName       : null ,
//                 jwt_actingAsUserFirstName  : null ,
//                 jwt_actingAsUserLastName   : null ,
//                 jwt_realUser               : null ,
//                 jwt_actingAsUser           : null ,
//                 jwt_iss                    : null ,
//                 jwt_saleid                 : null ,
//                 jwt_impersonatedUser       : null
//             }
//         };
//         formModelService.present( {
//             action : 'setContext' ,
//             context: contextData
//         } );
//         expect( formModelService.getModel().context.licensee ).toBe( contextData.data.licensee );
//         expect( formModelService.getModel().context.practicePrincipalFirstName ).toBe( contextData.data.practicePrincipalFirstName );
//         expect( formModelService.getModel().context ).toEqual( contextData.data );
//     } ) );
//     it( 'should handle "error" action and store it in the model' , inject( [
//         XHRBackend ,
//         FormModelService
//     ] , ( mockBackend , formModelService ) => {
//         expect( formModelService.getModel() ).not.toBeNull();
//         expect( formModelService.getModel().errors.length ).toBe( 0 );
//         // Hydrate the model
//         let errors = [ 'Input fields are all mandatory' , 'You can\'t put letters into a date field silly' ];
//         formModelService.present( {
//             action: 'error' ,
//             errors: errors
//         } );
//         expect( formModelService.getModel().errors ).toEqual( errors );
//     } ) );
// } );
//
// describe( 'FormModelService enable and disable validators' , () => {
//     it( 'should temporary store the validator function into a hidden field' , () => {
//         let ctrl = new Control();
//         ctrl.validator = Validators.required;
//
//         FormModelService.disableValidators(ctrl);
//         expect( ctrl.validator ).not.toBeDefined();
//
//         FormModelService.enableValidators(ctrl);
//         expect( ctrl.validator ).toBeDefined();
//         expect( ctrl.validator ).toBe( Validators.required );
//     });
//     it( 'should temporary store the validator function even if called out of order' , () => {
//         let ctrl = new Control();
//         ctrl.validator = Validators.required;
//         FormModelService.enableValidators(ctrl);
//         expect( ctrl.validator ).toBeDefined();
//         expect( ctrl.validator ).toBe( Validators.required );
//
//         FormModelService.disableValidators(ctrl);
//         expect( ctrl.validator ).not.toBeDefined();
//
//         FormModelService.disableValidators(ctrl);
//         expect( ctrl.validator ).not.toBeDefined();
//
//         FormModelService.enableValidators(ctrl);
//         expect( ctrl.validator ).toBeDefined();
//         expect( ctrl.validator ).toBe( Validators.required );
//
//         FormModelService.enableValidators(ctrl);
//         expect( ctrl.validator ).toBeDefined();
//         expect( ctrl.validator ).toBe( Validators.required );
//     });
// });
