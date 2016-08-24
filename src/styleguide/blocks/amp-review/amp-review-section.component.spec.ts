import {
    it ,
    injectAsync ,
    describe ,
    expect
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { AmpReviewSection } from '../../../app/blocks/amp-review/amp-review-section/amp-review-section.component';

describe( 'amp-review Section' , () => {

    describe('Section WITH a title AND content inside the tags', () => {
        @Component( {
            template   : `
                <amp-review-section
                    [title]="reviewSection.title"
                >
                    <div class="test-transcluded-content"></div>
                </amp-review-section>
            ` ,
            directives : [ AmpReviewSection ]
        } )

        class AmpReviewSectionTestWithTitle {
            private reviewSection = {
                title : 'A title'
            };
        }

        it( 'Should add a title if one is supplied' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithTitle )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let title = Element.querySelector( '.amp-review-section__title' );

                        expect( title ).toBeDefined();
                        expect( title.textContent.trim() ).toEqual( Component.reviewSection.title );
                    } );
            } )
        );

        it( 'Should wrap any html that is placed inside of the element tags (ie transcluded)' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithTitle )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let transculdedContent = Element.querySelector( '.test-transcluded-content' );

                        expect( transculdedContent ).not.toBeNull();
                    } );
            } )
        );
    });

    describe('Section WITHOUT a title', () => {

        @Component( {
            template   : `
                <amp-review-section
                ></amp-review-section>
            ` ,
            directives : [ AmpReviewSection ]
        } )

        class AmpReviewSectionTestWithoutTitle {}

        it( 'Should NOT display a title if title is NOT supplied' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithoutTitle )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let title = Element.querySelector( '.amp-review-section__title' );

                        expect( title ).toBeNull();
                    } );
            } )
        );
    } );

    describe('Section WITH change link', () => {
        @Component( {
            template   : `
                <amp-review-section
                    [changeCallback]="reviewSection.changeCallback"
                    [changeTarget]="reviewSection.changeTarget"
                >
                </amp-review-section>
            ` ,
            directives : [ AmpReviewSection ]
        } )

        class AmpReviewSectionTestWithChangeLink {
            private spyChangeCallback = jasmine.createSpy('spyChangeCallback');
            private reviewSection = {
                changeCallback : this.spyChangeCallback,
                changeTarget : 'target-id'
            };
        }

        it( 'Should display a change link' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithChangeLink )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let link = Element.querySelector( '.amp-review-section__change-link' );

                        expect( link ).toBeDefined();
                    } );
            } )
        );

        it( 'Should call the change callback with the callback target WHEN the link is clicked',
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithChangeLink )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let button = Element.querySelector( '.amp-review-section__change-link button' );

                        button.click();
                        expect( Component.reviewSection.changeCallback ).toHaveBeenCalledWith(Component.reviewSection.changeTarget);
                    } );
            } )
        );
    } );

    describe('Section WITHOUT change link', () => {
        @Component( {
            template   : `
                <amp-review-section>
                </amp-review-section>
            ` ,
            directives : [ AmpReviewSection ]
        } )

        class AmpReviewSectionTestWithChangeLink {}

        it( 'Should NOT display a change link' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewSectionTestWithChangeLink )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let link = Element.querySelector( '.amp-review-section__change-link' );

                        expect( link ).toBeNull();
                    } );
            } )
        );
    } );
} );
