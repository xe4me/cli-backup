import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , ElementRef , ViewChild } from '@angular/core';
import { FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpGroupButtonsModule } from '../../../app/modules/amp-group-buttons';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-group-buttons directive' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpGroupButtonsModule ] ,
            declarations : [
                AmpGroupButtonTest
            ] ,
            providers    : [
                { provide : FormModelService , useClass : MockFormModelService } ,
                { provide : ElementRef , useClass : MockElementRef } ,
                { provide : ScrollService , useClass : MockScrollService } ,
                ProgressObserverService ,
                { provide : Window , useClass : window }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    it( 'Should contain 2 radio input field  with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpGroupButtonTest> = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        const Element   = fixture.nativeElement;
        const Component = fixture.componentInstance;
        // let AmpGroupButtonTest = fixture.debugElement;
        let Form        = Element.querySelector( 'form' );
        let Inputs      = Element.querySelectorAll( 'input' );
        expect( Inputs[ '0' ].name ).toBe( 'fullOrPartial' + '_' + Component.groupButtonsCmp._randomString );
        expect( Inputs[ '0' ].getAttribute( 'data-automation-id' ) ).toBe( 'group_button_fullId' + '_' + Component.groupButtonsCmp._randomString );
        expect( Inputs.length ).toBe( 2 );
    } );
    it( 'Should contain 2 label field with proper text ' , () => {
        let fixture : ComponentFixture<AmpGroupButtonTest> = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        const Element = fixture.nativeElement;
        let Labels    = Element.querySelectorAll( 'label' );
        expect( Labels.length ).toBe( 2 );
        expect( Labels[ '0' ].innerHTML.trim() ).toBe( 'Full sale' );
        expect( Labels[ '1' ].innerHTML.trim() ).toBe( 'Partial sale' );
    } );
    it( 'Should update component control value to full after clicking on Full button' , () => {
        let fixture : ComponentFixture<AmpGroupButtonTest> = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        const Element   = fixture.nativeElement;
        const Component = fixture.componentInstance;
        let Labels      = Element.querySelectorAll( 'label' );
        Labels[ '0' ].click();
        fixture.detectChanges();
        expect( Component.control.value ).toBe( 'full' );
        expect( Component.control.value ).not.toBe( 'partial' );
    } );
    it( 'Should make the Full button checked after the Component programmatically updated its control value' , () => {
        let fixture : ComponentFixture<AmpGroupButtonTest> = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        const Element   = fixture.nativeElement;
        const Component = fixture.componentInstance;
        let Inputs      = Element.querySelectorAll( 'input' );
        Component.control.setValue( 'full' );
        fixture.detectChanges();
        expect( Inputs[ '0' ].checked ).toBeTruthy();
        expect( Inputs[ '1' ].checked ).toBeFalsy();
    } );
    it( 'Should make all the inputs unchecked ' , () => {
        let fixture : ComponentFixture<AmpGroupButtonTest> = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        const Element   = fixture.nativeElement;
        const Component = fixture.componentInstance;
        let Inputs      = Element.querySelectorAll( 'input' );
        Component.control.setValue( 'null' );
        fixture.detectChanges();
        for ( let i = 0 ; i < Inputs.length ; i ++ ) {
            expect( Inputs[ i ].checked ).toBeFalsy();
        }
    } );
} );
@Component( {
    template : `
        <form  #formModel='ngForm' class='nl-form' >
            <amp-group-buttons
                    #groupButtonsCmp
                    scrollOutOn='full'
                    class='1/5'
                    (select)='onButtonClick($event)'
                    [buttons]='fullOrPartialButtons.buttons'
                    [controlGroup]='controlGroup'
                    [groupName]='fullOrPartialButtons.fullOrPartial'
                    >
            </amp-group-buttons>
        </form>
    `
} )
class AmpGroupButtonTest {
    @ViewChild( 'groupButtonsCmp' ) groupButtonsCmp;
    private controlGroup : FormGroup = new FormGroup( {} );
    private fullOrPartialButtons     = {
        buttons       : [
            {
                id    : 'fullId' ,
                value : 'full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'partial' ,
                label : 'Partial sale'
            }
        ] ,
        fullOrPartial : 'fullOrPartial'
    };

    get control () {
        return this.controlGroup.controls[ 'fullOrPartial' ];
    }

    private onButtonClick ( event ) {
    }
}
