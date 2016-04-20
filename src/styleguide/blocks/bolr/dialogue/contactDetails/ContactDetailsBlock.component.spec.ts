import {
    it , inject , injectAsync , describe , beforeEachProviders , TestComponentBuilder
} from 'angular2/testing';
import { Component , provide , ElementRef } from 'angular2/core';
import { ContactDetailsBlockComponent } from '../../../../../app/blocks/bolr/dialogueState/contactDetails/ContactDetailsBlock.component';
import { MockFormModelService } from './MockFormModelService';
import { MockScrollService } from './MockScrollService';
import { FormModelService , BlockID , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { BrowserDomAdapter } from 'angular2/src/platform/browser/browser_adapter';
import { AnimationBuilder } from "angular2/src/animate/animation_builder";
describe( 'ContactDetailsBlockComponent isCurrentBlockActive' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : ElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    it( 'Should return false if user hasn\'t clicked on ok in intro block ' , inject( [
        ElementRef , FormModelService , ScrollService
    ] , ( el , formModelService , scrollService ) => {
        let mockFormModelService         = new MockFormModelService();
        let contactDetailsBlockComponent = new ContactDetailsBlockComponent( el , formModelService , scrollService );
        expect( contactDetailsBlockComponent.isCurrentBlockActive() ).toBeFalsy();
    } ) );
    it( 'Should subscribes to scroll service and when window is scrolling should update CurrentBlockClassName in' + ' the modelService accordingly ' , inject( [
        ScrollService , MockFormModelService
    ] , ( scrollService , mockFormModelService ) => {
        scrollService.$scrolled.subscribe( function( result ) {
            let INITIAL_BLOCK_NAME = 'IntroBlockComponent';
            mockFormModelService.setCurrentBlock( INITIAL_BLOCK_NAME );
            expect( mockFormModelService.currentComponent ).toEqual( INITIAL_BLOCK_NAME );
            let BLOCK_NAME = 'ContactDetailsBlockComponent';
            expect( result ).toEqual( 'scrolling' );
            expect( scrollService.amIVisible( BLOCK_NAME ) ).toBeTruthy();
            expect( mockFormModelService.currentComponent ).toEqual( BLOCK_NAME );
        } )
        scrollService.onScroll();
    } ) );
} );
