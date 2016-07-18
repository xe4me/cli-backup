import {
    it , inject , injectAsync , describe , beforeEachProviders , expect
} from '@angular/core/testing';
import { Component , provide , ElementRef, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { ContactDetailsBlockComponent } from '../../../../../app/blocks/bolr/notification-form/dialogue-state/contact-details/contact-details-block.component.ts';
import { MockFormModelService } from './mock-form-mode.service';
import { MockScrollService } from './mock-scroll.service';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'ContactDetailsBlockComponent isCurrentBlockActive' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : MockElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } ),
            provide( ChangeDetectorRef, { useValue : ChangeDetectorRef }),
            provide( ViewContainerRef, { useValue : ViewContainerRef })
        ];
    } );
    it( 'Should return false if user hasn\'t clicked on ok in intro block ' , inject( [
        ProgressObserverService , ElementRef , FormModelService , ScrollService, ChangeDetectorRef, ViewContainerRef
    ] , ( progressObserver , el , formModelService , scrollService , cd , vcr) => {
        let mockFormModelService         = new MockFormModelService();
        let contactDetailsBlockComponent = new ContactDetailsBlockComponent( cd, progressObserver , el , formModelService , scrollService, vcr );
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
