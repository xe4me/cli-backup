import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AmpReviewSection } from '../../../app/blocks/amp-review/amp-review-section/amp-review-section.component';

describe( 'amp-review Section' , () => {

    beforeEach( async( () => {
        TestBed.configureTestingModule({
            imports: [  ],
            declarations: [
                AmpReviewSection,
                AmpReviewSectionTestWithTitle,
                AmpReviewSectionTestWithoutTitle,
                AmpReviewSectionTestWithChangeLink1,
                AmpReviewSectionTestWithChangeLink2
            ]
        });

        TestBed.compileComponents();
    }));

    describe('Section WITH a title AND content inside the tags', () => {

        it( 'Should add a title if one is supplied' , () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithTitle> = TestBed.createComponent(AmpReviewSectionTestWithTitle);
            fixture.detectChanges();

            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let title = Element.querySelector( '.amp-review-section__title' );

            expect( title ).toBeDefined();
            expect( title.textContent.trim() ).toEqual( Component.reviewSection.title );
        });

        it( 'Should wrap any html that is placed inside of the element tags (ie transcluded)' , () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithTitle> = TestBed.createComponent(AmpReviewSectionTestWithTitle);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let transculdedContent = Element.querySelector( '.test-transcluded-content' );

            expect( transculdedContent ).not.toBeNull();
        });
    });

    describe('Section WITHOUT a title', () => {
        it( 'Should NOT display a title if title is NOT supplied' , () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithoutTitle> = TestBed.createComponent(AmpReviewSectionTestWithoutTitle);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let title = Element.querySelector( '.amp-review-section__title' );

            expect( title ).toBeNull();
        });
    });

    describe('Section WITH change link', () => {
        it( 'Should display a change link' , () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithChangeLink1> = TestBed.createComponent(AmpReviewSectionTestWithChangeLink1);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let link = Element.querySelector( '.amp-review-section__change-link' );

            expect( link ).toBeDefined();
        });

        it( 'Should call the change callback with the callback target WHEN the link is clicked', () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithChangeLink1> = TestBed.createComponent(AmpReviewSectionTestWithChangeLink1);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let button = Element.querySelector( '.amp-review-section__change-link button' );

            button.click();
            expect( Component.reviewSection.changeCallback ).toHaveBeenCalledWith(Component.reviewSection.changeTarget);
        });
    } );

    describe('Section WITHOUT change link', () => {

        it( 'Should NOT display a change link' , () => {
            let fixture : ComponentFixture<AmpReviewSectionTestWithChangeLink2> = TestBed.createComponent(AmpReviewSectionTestWithChangeLink2);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let link = Element.querySelector( '.amp-review-section__change-link' );

            expect( link ).toBeNull();
        });
    } );
} );

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

@Component( {
    template   : `
        <amp-review-section
        ></amp-review-section>
    ` ,
    directives : [ AmpReviewSection ]
} )
class AmpReviewSectionTestWithoutTitle {}

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
class AmpReviewSectionTestWithChangeLink1 {
    private spyChangeCallback = jasmine.createSpy('spyChangeCallback');
    private reviewSection = {
        changeCallback : this.spyChangeCallback,
        changeTarget : 'target-id'
    };
}

@Component( {
    template   : `
        <amp-review-section>
        </amp-review-section>
    ` ,
    directives : [ AmpReviewSection ]
} )
class AmpReviewSectionTestWithChangeLink2 {}
