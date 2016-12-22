// import {
//     async,
//     ComponentFixture,
//     TestBed
// } from '@angular/core/testing';
// import {
//     Component,
//     ElementRef,
//     ViewChild,
//     Renderer
// } from '@angular/core';
// import { HttpModule } from '@angular/http';
// import {
//     FormsModule,
//     ReactiveFormsModule,
//     FormGroup,
//     FormControl
// } from '@angular/forms';
// import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
// import {
//     By,
//     BrowserModule
// } from '@angular/platform-browser';
// import {
//     fakeAsync,
//     tick
// } from '@angular/core/testing/fake_async';
// import { ComponentFixtureAutoDetect } from '@angular/core/testing/test_bed';
// import {
//     AmpTypeaheadModule,
//     AmpTooltipModule,
//     AmpPipesModule,
//     AmpDirectivesModule,
//     AmpQasAddressModule,
//     AmpInputsModule,
//     AmpCheckboxModule,
//     AmpTextareaModule,
//     AmpGroupButtonsModule,
//     AmpRadioButtonGroupModule,
//     AmpErrorModule,
//     AmpButtonModule,
//     FormBlock,
//     ScrollService,
//     FormModelService,
//     ProgressObserverService,
//     AmpFormBlockComponent,
//     AmpOverlayComponent,
//     AmpIntroBlockComponent,
//     AmpLoadingComponent,
//     AmpRowRepeaterModule,
//     AmpStandAloneMenuModule,
//     AmpHttpService,
//     FormSectionService
// } from 'amp-ddc-components';
// import { MyAMPLoginBlockComponent } from './my-amplogin-block.component';
// let formDef = require( './DummyTest-form-def.def.json' );
//
// // Load the implementations that should be tested
// describe( 'Component: MyAMPLoginBlock', () => {
//     beforeEach( async( () => {
//         TestBed.configureTestingModule( {
//             imports : [
//                 AmpRowRepeaterModule,
//                 AmpTooltipModule,
//                 AmpButtonModule,
//                 AmpTypeaheadModule,
//                 AmpPipesModule,
//                 AmpDirectivesModule,
//                 AmpQasAddressModule,
//                 AmpInputsModule,
//                 AmpErrorModule,
//                 AmpCheckboxModule,
//                 AmpTextareaModule,
//                 AmpGroupButtonsModule,
//                 AmpRadioButtonGroupModule,
//                 AmpStandAloneMenuModule,
//                 BrowserModule,
//                 FormsModule,
//                 ReactiveFormsModule,
//                 HttpModule
//             ],
//             declarations : [
//                 TestComponent,
//                 AmpIntroBlockComponent,
//                 AmpFormBlockComponent,
//                 AmpOverlayComponent,
//                 AmpLoadingComponent
//             ],
//             providers : [
//                 { provide : ElementRef, useClass : MockElementRef },
//                 { provide : Window, useClass : window },
//                 { provide : ComponentFixtureAutoDetect, useValue : true },
//                 { provide : FormModelService, useClass : FormModelService },
//                 { provide : ScrollService, useClass : ScrollService },
//                 { provide : ProgressObserverService, useClass : ProgressObserverService },
//                 { provide : AmpHttpService, useClass : AmpHttpService },
//                 { provide : FormSectionService, useClass : FormSectionService },
//                 BrowserDomAdapter,
//                 Renderer
//             ]
//         } );
//         TestBed.compileComponents();
//     } ) );
//     describe( 'UI', () => {
//         it( 'should contain an input for username', <any> fakeAsync( () => {
//             let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//             fixture.detectChanges();
//             tick( 1 );
//             let compiledTestComponent = fixture.debugElement;
//             let Component = fixture.componentInstance;
//             let compiledInput = compiledTestComponent.query(
//                 By.css( '.myAmp-login input[name=Application-MyAMPLoginBlock-userId]' ) );
//
//             expect( compiledInput ).toBeDefined();
//             expect( compiledInput.nativeElement.name )
//                 .toBe( 'Application-MyAMPLoginBlock-userId' );
//             expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value )
//                 .toBe( 'text_Application-MyAMPLoginBlock-userId' );
//         } ) );
//         it( 'should contain an input for password', <any> fakeAsync( () => {
//             let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//             fixture.detectChanges();
//             tick( 1 );
//             let compiledTestComponent = fixture.debugElement;
//             let Component = fixture.componentInstance;
//             let compiledInput = compiledTestComponent.query(
//                 By.css( '.myAmp-login input[name=Application-MyAMPLoginBlock-password]' ) );
//
//             expect( compiledInput ).toBeDefined();
//             expect( compiledInput.nativeElement.name )
//                 .toBe( 'Application-MyAMPLoginBlock-password' );
//             expect( compiledInput.nativeElement.attributes[ 'data-automation-id' ].value )
//                 .toBe( 'text_Application-MyAMPLoginBlock-password' );
//         } ) );
//     } );
//     describe( 'removeLoginAndProceed', () => {
//         it( 'should cleanUp and then call super.onNext', <any> fakeAsync( () => {
//             let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//             fixture.detectChanges();
//             tick( 1 );
//
//             let myAMPLoginBlockComponentFixture = fixture.debugElement.query( By.directive( MyAMPLoginBlockComponent ) );
//             let myAMPLoginBlockComponent = <MyAMPLoginBlockComponent> myAMPLoginBlockComponentFixture.componentInstance;
//
//             spyOn( myAMPLoginBlockComponent, 'cleanUp' ).and.returnValue( true );
//             spyOn( FormBlock.prototype, 'onNext' ).and.returnValue( true );
//
//             myAMPLoginBlockComponent.removeLoginAndProceed();
//
//             expect( myAMPLoginBlockComponent[ 'cleanUp' ] ).toHaveBeenCalled();
//             expect( FormBlock.prototype.onNext ).toHaveBeenCalled();
//         } ) );
//     } );
//     describe( 'onLoginSuccess', () => {
//         it( 'should call removeLoginAndProceed', <any> fakeAsync( () => {
//             let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//             fixture.detectChanges();
//             tick( 1 );
//
//             let myAMPLoginBlockComponentFixture = fixture.debugElement.query( By.directive( MyAMPLoginBlockComponent ) );
//             let myAMPLoginBlockComponent = <MyAMPLoginBlockComponent> myAMPLoginBlockComponentFixture.componentInstance;
//
//             spyOn( myAMPLoginBlockComponent, 'removeLoginAndProceed' ).and.returnValue( true );
//
//             myAMPLoginBlockComponent[ 'onLoginSuccess' ]();
//
//             expect( myAMPLoginBlockComponent.removeLoginAndProceed ).toHaveBeenCalled();
//         } ) );
//     } );
//     describe( 'onLoginFail', () => {
//         it( 'should indicate there is an error', <any> fakeAsync( () => {
//             let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//             fixture.detectChanges();
//             tick( 1 );
//
//             let myAMPLoginBlockComponentFixture = fixture.debugElement.query( By.directive( MyAMPLoginBlockComponent ) );
//             let myAMPLoginBlockComponent = <MyAMPLoginBlockComponent> myAMPLoginBlockComponentFixture.componentInstance;
//
//             expect( myAMPLoginBlockComponent[ 'errorCode' ] ).toBeNull();
//
//             myAMPLoginBlockComponent[ 'onLoginFail' ]();
//
//             expect( myAMPLoginBlockComponent[ 'errorCode' ] ).toBe( 'default' );
//         } ) );
//     } );
//     describe( 'onNext and ngOnDestroy', () => {
//         it( 'should create the hidden iframe, attach listener, submit and clean up the listener on destroy',
//             <any> fakeAsync( () => {
//
//                 let fixture : ComponentFixture<TestComponent> = TestBed.createComponent( TestComponent );
//                 fixture.detectChanges();
//                 tick( 1 );
//
//                 let myAMPLoginBlockComponentFixture = fixture.debugElement.query( By.directive( MyAMPLoginBlockComponent ) );
//                 let myAMPLoginBlockComponent = <MyAMPLoginBlockComponent> myAMPLoginBlockComponentFixture.componentInstance;
//
//                 spyOn( myAMPLoginBlockComponent, 'canGoNext' ).and.returnValue( true );
//
//                 myAMPLoginBlockComponent[ '__controlGroup' ] = new FormGroup( {
//                     'userId' : new FormControl( 'dummy' ),
//                     'password' : new FormControl( 'dummy' )
//                 } );
//
//                 expect( window.frames.length ).toBe( 0 );
//                 // spyOn(myAMPLoginBlockComponent, 'submitCallback').and.callThrough();
//
//                 // Invoke the login, which creates the listener
//                 myAMPLoginBlockComponent.onNext();
//
//                 // Check that the form was submitted and the result got loaded in the iframe
//                 // expect(myAMPLoginBlockComponent['submitCallback']).toHaveBeenCalled();
//
//                 // Should have hidden form and iframe created and submitted
//                 expect( window.frames.length ).toBe( 1 );
//
//                 // Check listener is not null
//                 expect( myAMPLoginBlockComponent[ 'removeLoginFrameListener' ] ).not.toBeUndefined();
//                 spyOn( myAMPLoginBlockComponent, 'removeLoginFrameListener' ).and.callThrough();
//
//                 // Invoke the destroy
//                 myAMPLoginBlockComponent.ngOnDestroy();
//
//                 // Check remove listener func is invoked
//                 expect( myAMPLoginBlockComponent[ 'removeLoginFrameListener' ] ).toHaveBeenCalled();
//             } ) );
//     } );
// } );
//
// class MockElementRef implements ElementRef {
//     public nativeElement = {};
// }
//
// // Create a test component to test directives
// @Component( {
//     template : `
//         <form [formGroup]="form" class='nl-form myAmp-login'>
//             <div [amp-block-loader]="childBlocks"
//                 [fdn]="fullyDistinguishedName"
//                 [form]="form"
//                 [requireMethod]="'ALL'"></div>
//         </form>
//     `
// } )
// class TestComponent {
//     @ViewChild( 'myAmpLoginCmp' )
//     public myAmpLoginCmp;
//     public form : FormGroup = new FormGroup( {} );
//
//     private fullyDistinguishedName = [];
//     private childBlocks = formDef;
// }
