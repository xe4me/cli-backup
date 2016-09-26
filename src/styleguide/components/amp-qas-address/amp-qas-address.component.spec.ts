// import { async , ComponentFixture , TestBed } from '@angular/core/testing';
// import { Component , provide , ElementRef , ReflectiveInjector , Injector } from '@angular/core';
// import { FormControl , FormsModule , ReactiveFormsModule , FormGroup , FormBuilder } from '@angular/forms';
// import { AmpQasAddressComponent } from '../../../app/modules/amp-qas-address/amp-qas-address.component';
// import { Http , ResponseOptions , Response , BaseRequestOptions , Jsonp , ConnectionBackend } from "@angular/http";
// import { MockBackend } from "@angular/http/testing/mock_backend";
// describe( 'amp-qas-address component' , () => {
//     var url = 'http://foo.bar';
//     var http : Http;
//     var injector : Injector;
//     var backend : MockBackend;
//     var baseResponse : Response;
//     var jsonp : Jsonp;
//     beforeEach( () => {
//         injector     = ReflectiveInjector.resolveAndCreate( [
//             BaseRequestOptions , MockBackend , {
//                 provide    : Http ,
//                 useFactory : function( backend : ConnectionBackend , defaultOptions : BaseRequestOptions ) {
//                     return new Http( backend , defaultOptions );
//                 } ,
//                 deps       : [ MockBackend , BaseRequestOptions ]
//             } ,
//             {
//                 provide    : Jsonp ,
//                 useFactory : function( backend : ConnectionBackend , defaultOptions : BaseRequestOptions ) {
//                     return new Jsonp( backend , defaultOptions );
//                 } ,
//                 deps       : [ MockBackend , BaseRequestOptions ]
//             }
//         ] );
//         http         = injector.get( Http );
//         jsonp        = injector.get( Jsonp );
//         backend      = injector.get( MockBackend );
//         baseResponse = new Response( new ResponseOptions( { body : 'base response' } ) );
//     } );
//     afterEach( () => backend.verifyNoPendingRequests() );
//     beforeEach( async( () => {
//         TestBed.configureTestingModule( {
//             imports      : [ FormsModule , ReactiveFormsModule ] ,
//             declarations : [
//                 AmpQasAddressComponent ,
//                 AmpQasAddressComponentTest
//             ] ,
//             providers    : [ Http ]
//         } );
//         TestBed.compileComponents();
//     } ) );
//     it( 'should have create 2 controls and add them to the control group' , () => {
//         let fixture : ComponentFixture<AmpQasAddressComponentTest> = TestBed.createComponent( AmpQasAddressComponentTest );
//         fixture.detectChanges();
//         const Element = fixture.nativeElement;
//         // let AmpQasAddressComponentTest = fixture.debugElement;
//         const Component = fixture.componentInstance;
//         expect( (<any>Component.__controlGroup.controls).length ).toEqual( 2 );
//     } );
// } );
// @Component( {
//     template : `
//         <form [formGroup]="form" class='nl-form'>
//             <amp-qas-address
//                 class="1/3"
//                 [controlGroup]="__controlGroup"
//                 [id]="__custom.controls[0].id"
//                 [required]="__custom.controls[0].required"
//                 [label]="__custom.controls[0].label"
//                 >
//             </amp-qas-address>
//         </form>
//     `
// } )
// class AmpQasAddressComponentTest {
//     public __controlGroup = new FormGroup( {} );
//     public __custom       = {
//         controls : [
//             {
//                 id       : 'amp-qas' ,
//                 label    : 'Search here' ,
//                 required : true
//             }
//         ]
//     };
//     private form : FormGroup;
//
//     constructor ( private _builder : FormBuilder ) {
//         this.form = this._builder.group( {} );
//     }
// }
