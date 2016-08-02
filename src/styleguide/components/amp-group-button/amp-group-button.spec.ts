// import {
//     it ,
//     injectAsync ,
//     describe ,
//     beforeEachProviders ,
//     expect
// } from '@angular/core/testing';
// import { TestComponentBuilder } from '@angular/compiler/testing';
// import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
// import { Component , provide , ElementRef } from '@angular/core';
// import { Control } from '@angular/common';
// import { AmpGroupButtonComponent } from '../../../../src/app/components/amp-group-button/amp-group-button.component';
// import { MockScrollService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-scroll.service';
// import { MockFormModelService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-form-mode.service';
//
// class MockElementRef implements ElementRef {
//   nativeElement = {};
// }
//
// describe( 'amp-group-button directive' , () => {
//     beforeEachProviders( () => {
//         return [
//             provide( FormModelService , { useClass : MockFormModelService } ) ,
//             provide( MockFormModelService , { useClass : MockFormModelService } ) ,
//             provide( ElementRef , { useClass : MockElementRef } ) ,
//             provide( ScrollService , { useClass : MockScrollService } ) ,
//             provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
//             provide( MockScrollService , { useClass : MockScrollService } ) ,
//             provide( Window , { useValue : window } )
//         ];
//     } );
//     @Component( {
//         template   : `
//       <form  #formModel='ngForm' class='nl-form' >
//         <amp-group-button
//                 scrollOutOn='full'
//                 class='1/5'
//                 (select)='onButtonClick($event)'
//                 [buttons]='fullOrPartialButtons.buttons'
//                 [parentControl]='control'
//                 [groupName]='fullOrPartialButtons.fullOrPartial'
//         >
//         </amp-group-button>
//       </form>
//       ` ,
//         directives : [ AmpGroupButtonComponent ]
//     } )
//     class AmpGroupButtonTest {
//         control : Control            = new Control();
//         private fullOrPartialButtons = {
//             buttons       : [
//                 {
//                     id    : 'fullId' ,
//                     value : 'full' ,
//                     label : 'Full sale'
//                 } ,
//                 {
//                     id    : 'partialId' ,
//                     value : 'partial' ,
//                     label : 'Partial sale'
//                 }
//             ] ,
//             fullOrPartial : 'fullOrPartial'
//         };
//
//         private onButtonClick () {
//         }
//     }
//     it( 'Should contain 2 radio input field  with proper data-automation-id and name attributes ' ,
//         injectAsync( [
//             TestComponentBuilder ,
//             ProgressObserverService ,
//             ElementRef ,
//             FormModelService ,
//             ScrollService
//         ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
//             return tcb
//                 .createAsync( AmpGroupButtonTest )
//                 .then( ( fixture : any ) => {
//                     fixture.detectChanges();
//                     const Element = fixture.nativeElement;
//                     //let AmpGroupButtonTest = fixture.debugElement;
//                     let Form      = Element.querySelector( 'form' );
//                     let Inputs    = Element.querySelectorAll( 'input' );
//                     expect( Inputs[ '0' ].name ).toBe( 'fullOrPartial' );
//                     expect( Inputs[ '0' ].getAttribute( 'data-automation-id' ) ).toBe( 'radio_button_fullId' );
//                     expect( Inputs.length ).toBe( 2 );
//                 } );
//         } ) );
//     it( 'Should contain 2 label field with proper text ' ,
//         injectAsync( [
//             TestComponentBuilder ,
//             ProgressObserverService ,
//             ElementRef ,
//             FormModelService ,
//             ScrollService
//         ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
//             return tcb
//                 .createAsync( AmpGroupButtonTest )
//                 .then( ( fixture : any ) => {
//                     fixture.detectChanges();
//                     const Element = fixture.nativeElement;
//                     let Labels    = Element.querySelectorAll( 'label' );
//                     expect( Labels.length ).toBe( 2 );
//                     expect( Labels[ '0' ].innerHTML.trim() ).toBe( 'Full sale' );
//                     expect( Labels[ '1' ].innerHTML.trim() ).toBe( 'Partial sale' );
//                 } );
//         } ) );
//     it( 'Should update component control value to full after clicking on Full button' ,
//         injectAsync( [
//             TestComponentBuilder ,
//             ProgressObserverService ,
//             ElementRef ,
//             FormModelService ,
//             ScrollService
//         ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
//             return tcb
//                 .createAsync( AmpGroupButtonTest )
//                 .then( ( fixture : any ) => {
//                     fixture.detectChanges();
//                     const Element   = fixture.nativeElement;
//                     const Component = fixture.componentInstance;
//                     let Labels      = Element.querySelectorAll( 'label' );
//                     Labels[ '0' ].click();
//                     fixture.detectChanges();
//                     expect( Component.control.value ).toBe( 'full' );
//                     expect( Component.control.value ).not.toBe( 'partial' );
//                 } );
//         } ) );
//     it( 'Should make the Full button checked after the Component programmatically updated its control value' ,
//         injectAsync( [
//             TestComponentBuilder ,
//             ProgressObserverService ,
//             ElementRef ,
//             FormModelService ,
//             ScrollService
//         ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
//             return tcb
//                 .createAsync( AmpGroupButtonTest )
//                 .then( ( fixture : any ) => {
//                     fixture.detectChanges();
//                     const Element   = fixture.nativeElement;
//                     const Component = fixture.componentInstance;
//                     let Inputs      = Element.querySelectorAll( 'input' );
//                     Component.control.updateValue( 'full' );
//                     fixture.detectChanges();
//                     expect( Inputs[ '0' ].checked ).toBeTruthy();
//                     expect( Inputs[ '1' ].checked ).toBeFalsy();
//                 } );
//         } ) );
//     it( 'Should make all the inputs unchecked ' ,
//         injectAsync( [
//             TestComponentBuilder ,
//             ProgressObserverService ,
//             ElementRef ,
//             FormModelService ,
//             ScrollService
//         ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
//             return tcb
//                 .createAsync( AmpGroupButtonTest )
//                 .then( ( fixture : any ) => {
//                     fixture.detectChanges();
//                     const Element   = fixture.nativeElement;
//                     const Component = fixture.componentInstance;
//                     let Inputs      = Element.querySelectorAll( 'input' );
//                     Component.control.updateValue( 'null' );
//                     fixture.detectChanges();
//                     for ( let i = 0 ; i < Inputs.length ; i ++ ) {
//                         expect( Inputs[ i ].checked ).toBeFalsy();
//                     }
//                 } );
//         } ) );
// } );
