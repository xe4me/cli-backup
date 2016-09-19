import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AmpReviewItem } from '../../../app/blocks/amp-review/amp-review-item/amp-review-item.component';

describe( 'amp-review Item' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule({
            imports: [  ],
            declarations: [
                AmpReviewItem,
                AmpReviewItemTest1,
                AmpReviewItemTest2,
                AmpReviewItemTest3,
                AmpReviewItemTest4
            ]
        });

        TestBed.compileComponents();
    }));

    describe('Item with a label AND value BUT NO frequency', () => {

        it( 'Should display the label AND value' , () => {
            let fixture : ComponentFixture<AmpReviewItemTest1> = TestBed.createComponent(AmpReviewItemTest1);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-item__label' );
            let value = Element.querySelector( '.amp-review-item__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( Component.reviewItem.value );
        });
    });

    describe('Item with a label AND value AND frequency', () => {
        it( 'Should display the label AND value WITH the frequency' , () => {
            let fixture : ComponentFixture<AmpReviewItemTest2> = TestBed.createComponent(AmpReviewItemTest2);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-item__label' );
            let value = Element.querySelector( '.amp-review-item__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toMatch( new RegExp(`^${Component.reviewItem.value}\\W*${Component.reviewItem.frequency}$`) );
        });
    });

    describe('Item with a label but NO value OR frequency', () => {
        it( 'Should display the label AND a dash (-) for the value' , () => {
            let fixture : ComponentFixture<AmpReviewItemTest3> = TestBed.createComponent(AmpReviewItemTest3);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-item__label' );
            let value = Element.querySelector( '.amp-review-item__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( '-' );
        });
    });

    describe('Item with a label AND frequency BUT NO value', () => {
        it( 'Should display the label AND a dash (-) for the value BUT NOT display a frequency' , () => {
            let fixture : ComponentFixture<AmpReviewItemTest4> = TestBed.createComponent(AmpReviewItemTest4);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-item__label' );
            let value = Element.querySelector( '.amp-review-item__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( '-' );
            expect( value.textContent.trim() ).not.toContain( Component.reviewItem.frequency );
        });
    });
} );

        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                    [value]="reviewItem.value"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )

        class AmpReviewItemTest1 {
            private reviewItem = {
                label : 'A label',
                value: 'A value'
            };
        }

        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                    [value]="reviewItem.value"
                    [frequency]="reviewItem.frequency"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )

        class AmpReviewItemTest2 {
            private reviewItem = {
                label : 'A label',
                value: 'A value',
                frequency: 'Monthly'
            };
        }

        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )
        class AmpReviewItemTest3 {
            private reviewItem = {
                label : 'A label'
            };
        }

        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                    [frequency]="reviewItem.frequency"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )
        class AmpReviewItemTest4 {
            private reviewItem = {
                label : 'A label',
                frequency : 'Monthly'
            };
        }
