import {
    it ,
    injectAsync ,
    describe ,
    expect
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { AmpReviewItem } from '../../../app/blocks/amp-review/amp-review-item/amp-review-item.component';

describe( 'amp-review Item' , () => {

    describe('Item with a label AND value BUT NO frequency', () => {
        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                    [value]="reviewItem.value"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )

        class AmpReviewItemTestWithValue {
            private reviewItem = {
                label : 'A label',
                value: 'A value'
            };
        }

        it( 'Should display the label AND value' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewItemTestWithValue )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let label = Element.querySelector( '.amp-review-item__label' );
                        let value = Element.querySelector( '.amp-review-item__value' );

                        expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
                        expect( value.textContent.trim() ).toEqual( Component.reviewItem.value );
                    } );
            } )
        );
    });

    describe('Item with a label AND value AND frequency', () => {
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

        class AmpReviewItemTestWithValue {
            private reviewItem = {
                label : 'A label',
                value: 'A value',
                frequency: 'Monthly'
            };
        }

        it( 'Should display the label AND value WITH the frequency' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewItemTestWithValue )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let label = Element.querySelector( '.amp-review-item__label' );
                        let value = Element.querySelector( '.amp-review-item__value' );

                        expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
                        expect( value.textContent.trim() ).toMatch( new RegExp(`^${Component.reviewItem.value}\\W*${Component.reviewItem.frequency}$`) );
                    } );
            } )
        );
    });

    describe('Item with a label but NO value OR frequency', () => {
        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )

        class AmpReviewItemTestWithValue {
            private reviewItem = {
                label : 'A label'
            };
        }

        it( 'Should display the label AND a dash (-) for the value' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewItemTestWithValue )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let label = Element.querySelector( '.amp-review-item__label' );
                        let value = Element.querySelector( '.amp-review-item__value' );

                        expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
                        expect( value.textContent.trim() ).toEqual( '-' );
                    } );
            } )
        );
    });

    describe('Item with a label AND frequency BUT NO value', () => {
        @Component( {
            template   : `
                <amp-review-item
                    [label]="reviewItem.label"
                    [frequency]="reviewItem.frequency"
                ></amp-review-item>
            ` ,
            directives : [ AmpReviewItem ]
        } )

        class AmpReviewItemTestWithValue {
            private reviewItem = {
                label : 'A label',
                frequency : 'Monthly'
            };
        }

        it( 'Should display the label AND a dash (-) for the value BUT NOT display a frequency' ,
            injectAsync( [
                TestComponentBuilder
            ] , ( tcb ) => {
                return tcb
                    .createAsync( AmpReviewItemTestWithValue )
                    .then( ( fixture : any ) => {
                        fixture.detectChanges();
                        let Element = fixture.nativeElement;
                        let AmpReviewSection = fixture.debugElement;
                        let Component = AmpReviewSection.componentInstance;
                        let label = Element.querySelector( '.amp-review-item__label' );
                        let value = Element.querySelector( '.amp-review-item__value' );

                        expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
                        expect( value.textContent.trim() ).toEqual( '-' );
                        expect( value.textContent.trim() ).not.toContain( Component.reviewItem.frequency );
                    } );
            } )
        );
    });
} );
