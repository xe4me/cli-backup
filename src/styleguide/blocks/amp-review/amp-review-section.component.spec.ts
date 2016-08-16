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

    describe('Section WITH a title', () => {

        @Component( {
            template   : `
            <amp-review-section
                [title]='reviewSection.title'
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
                        expect( title.textContent ).toContain( Component.reviewSection.title );
                    } );
            } )
        );

        it( 'Should wrap any html that is placed inside of the element tags (ie transculded)' ,
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
} );
