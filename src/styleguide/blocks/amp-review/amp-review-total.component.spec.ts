import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AmpReviewTotal } from '../../../app/blocks/amp-review/amp-review-total/amp-review-total.component';

describe( 'amp-review Total' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule({
            imports: [  ],
            declarations: [
                AmpReviewTotal,
                AmpReviewTotalTest1,
                AmpReviewTotalTest2,
                AmpReviewTotalTest3,
                AmpReviewTotalTest4
            ]
        });

        TestBed.compileComponents();
    }));


    describe('Total with a label AND value BUT NO frequency', () => {
        it( 'Should display the label AND value' , () => {
            let fixture: ComponentFixture<AmpReviewTotalTest1> = TestBed.createComponent(AmpReviewTotalTest1);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-total__label' );
            let value = Element.querySelector( '.amp-review-total__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( Component.reviewItem.value );
        });
    });

    describe('Item with a label AND value AND frequency', () => {
        it( 'Should display the label AND value WITH the frequency' , () => {
            let fixture: ComponentFixture<AmpReviewTotalTest2> = TestBed.createComponent(AmpReviewTotalTest2);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-total__label' );
            let value = Element.querySelector( '.amp-review-total__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toMatch( new RegExp(`^${Component.reviewItem.value}\\W*${Component.reviewItem.frequency}$`) );
        });
    });

    describe('Item with a label but NO value OR frequency', () => {
        it( 'Should display the label AND a dash (-) for the value' , () => {
            let fixture: ComponentFixture<AmpReviewTotalTest3> = TestBed.createComponent(AmpReviewTotalTest3);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-total__label' );
            let value = Element.querySelector( '.amp-review-total__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( '-' );
        });
    });

    describe('Item with a label AND frequency BUT NO value', () => {

        it( 'Should display the label AND a dash (-) for the value BUT NOT display a frequency' , () => {
            let fixture: ComponentFixture<AmpReviewTotalTest4> = TestBed.createComponent(AmpReviewTotalTest4);
            fixture.detectChanges();
            let Element = fixture.nativeElement;
            let AmpReviewSection = fixture.debugElement;
            let Component = AmpReviewSection.componentInstance;
            let label = Element.querySelector( '.amp-review-total__label' );
            let value = Element.querySelector( '.amp-review-total__value' );

            expect( label.textContent.trim() ).toEqual( Component.reviewItem.label );
            expect( value.textContent.trim() ).toEqual( '-' );
            expect( value.textContent.trim() ).not.toContain( Component.reviewItem.frequency );
        });
    });
} );

@Component( {
    template   : `
        <amp-review-total
            [label]="reviewItem.label"
            [value]="reviewItem.value"
        ></amp-review-total>
    ` ,
    directives : [ AmpReviewTotal ]
} )
class AmpReviewTotalTest1 {
    private reviewItem = {
        label : 'A label',
        value: 'A value'
    };
}

@Component( {
    template   : `
        <amp-review-total
            [label]="reviewItem.label"
            [value]="reviewItem.value"
            [frequency]="reviewItem.frequency"
        ></amp-review-total>
    ` ,
    directives : [ AmpReviewTotal ]
} )
class AmpReviewTotalTest2 {
    private reviewItem = {
        label : 'A label',
        value: 'A value',
        frequency: 'Monthly'
    };
}

@Component( {
    template   : `
        <amp-review-total
            [label]="reviewItem.label"
        ></amp-review-total>
    ` ,
    directives : [ AmpReviewTotal ]
} )
class AmpReviewTotalTest3 {
    private reviewItem = {
        label : 'A label'
    };
}

@Component( {
    template   : `
        <amp-review-total
            [label]="reviewItem.label"
            [frequency]="reviewItem.frequency"
        ></amp-review-total>
    ` ,
    directives : [ AmpReviewTotal ]
} )
class AmpReviewTotalTest4 {
    private reviewItem = {
        label : 'Total',
        frequency : 'Monthly'
    };
}
