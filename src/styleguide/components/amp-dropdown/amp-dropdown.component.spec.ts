import {
    it ,
    injectAsync ,
    describe ,
    beforeEachProviders ,
    expect
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpDropdownComponent } from '../../../app/components/amp-dropdown/amp-dropdown.component';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'amp-dropdown component' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : MockElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        template   : `
            <form  #formModel='ngForm' class='nl-form' >
                <amp-dropdown
                        [isInSummaryState]='false'
                        [id]='"Title"'
                        [label]='"Title"'
                        [labelHidden]='"HiddenLabel"'
                        [options]='titleOptions'
                        [parentControl]="control"
                        [isRequired]="true">
                </amp-dropdown>
            </form>
        ` ,
        directives : [ AmpDropdownComponent ]
    } )
    class AmpdropdownTest {
        control : Control = new Control();
        isInSummaryState  = false;
        clickedOnThedropdown;
        private dropdown  = {
            id          : 'anId' ,
            disabled    : false ,
            required    : true ,
            checked     : false ,
            scrollOutOn : null
        };

        private onAcknowledgeSelect ( value ) {
            this.clickedOnThedropdown = value;
        }
    }
    // it( 'Should contain 1 dropdown input field with proper data-automation-id and name attributes ' ,
    //     injectAsync( [
    //         TestComponentBuilder ,
    //         ProgressObserverService ,
    //         ElementRef ,
    //         FormModelService ,
    //         ScrollService
    //     ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
    //         return tcb
    //             .createAsync( AmpdropdownTest )
    //             .then( ( fixture : any ) => {
    //                 let Element         = fixture.nativeElement;
    //                 let AmpdropdownTest = fixture.debugElement;
    //                 let Component       = AmpdropdownTest.componentInstance;
    //                 let dropdown        = Element.querySelector( 'input[type="dropdown"]' );
    //                 let Labels          = Element.querySelector( 'label' );
    //                 fixture.detectChanges();
    //                 // expect( dropdown ).toBeDefined();
    //                 // expect( dropdown.name ).toBe( Component.dropdown.id );
    //                 // expect( dropdown.id ).toBe( Component.dropdown.id );
    //                 // expect( dropdown.getAttribute( 'data-automation-id' ) ).toBe( 'dropdown_' + Component.dropdown.id );
    //             } );
    //     } )
    // );
} );

