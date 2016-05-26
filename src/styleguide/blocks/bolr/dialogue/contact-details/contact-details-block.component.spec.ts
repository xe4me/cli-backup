import {
    it , inject , injectAsync , describe , beforeEachProviders , TestComponentBuilder
} from 'angular2/testing';
import { Component , provide , ElementRef } from 'angular2/core';
import { ContactDetailsBlockComponent } from '../../../../../app/blocks/bolr/notification-form/dialogue-state/contact-details/contact-details-block.component.ts';
import { MockFormModelService } from './mock-form-mode.service';
import { MockScrollService } from './mock-scroll.service';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
describe( 'ContactDetailsBlockComponent isCurrentBlockActive' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : ElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    it( 'Should return false if user hasn\'t clicked on ok in intro block ' , inject( [
        ProgressObserverService , ElementRef , FormModelService , ScrollService
    ] , ( progressObserver , el , formModelService , scrollService ) => {
        let mockFormModelService         = new MockFormModelService();
        let contactDetailsBlockComponent = new ContactDetailsBlockComponent( progressObserver , el , formModelService , scrollService );
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
        } );
        scrollService.onScroll();
    } ) );
} );
