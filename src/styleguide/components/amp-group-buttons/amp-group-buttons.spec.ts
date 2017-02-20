import {
    async,
    fakeAsync,
    tick,
    TestBed,
    ComponentFixtureAutoDetect
} from '@angular/core/testing';
import {
    Component,
    ViewChild
} from '@angular/core';
import {
    FormsModule,
    FormControl,
    ReactiveFormsModule,
    FormGroup
} from '@angular/forms';
import { MockScrollService } from '../../services/mock-scroll.service';
import { ScrollService } from '../../../app/services';
import { AmpGroupButtonsModule } from '../../../app/modules/amp-group-buttons';

describe( 'amp-group-buttons components', () => {
    let fixture;
    let Element;
    let Component;
    let Form;
    let Inputs;
    let Labels;
    let options;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpGroupButtonsModule ],
            declarations : [
                AmpGroupButtonTest
            ],
            providers    : [
                {
                    provide  : ScrollService,
                    useClass : MockScrollService
                },
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( () => {
        fixture = TestBed.createComponent( AmpGroupButtonTest );
        fixture.detectChanges();
        Element   = fixture.nativeElement;
        Component = fixture.componentInstance;
        Form      = Element.querySelector( 'form' );
        Inputs    = Element.querySelectorAll( 'input' );
        Labels    = Element.querySelectorAll( 'label' );
        options   = Component.fullOrPartialButtons;
    } );
    it( 'Should contain 2 radio input field  with proper data-automation-id and name attributes ', () => {
        expect( Inputs[ '0' ].name ).toBe( Component.groupButtonsCmp.randomizedId );
        expect( Inputs[ '0' ].getAttribute( 'data-automation-id' ) ).toBe( 'group_button' + '_' + Component.groupButtonsCmp.randomizedId + '_fullId' );
        expect( Inputs.length ).toBe( 2 );
    } );
    it( 'Should contain 2 label field with proper text ', () => {
        expect( Labels.length ).toBe( 2 );
        expect( Labels[ '0' ].innerText.trim() ).toBe( 'Full sale' );
        expect( Labels[ '1' ].innerText.trim() ).toBe( 'Partial sale' );
    } );
    it( 'Should update component control value to full after clicking on Full button', () => {
        Labels[ '0' ].click();
        fixture.detectChanges();
        expect( Component.control.value ).toBe( 'full' );
        expect( Component.control.value ).not.toBe( 'partial' );
    } );
    describe( 'When setting value programatically', () => {
        it( 'Should make the Full button checked ', () => {
            Component.control.setValue( 'full' );
            fixture.detectChanges();
            expect( Inputs[ '0' ].checked ).toBeTruthy();
            expect( Inputs[ '1' ].checked ).toBeFalsy();
        } );
        it( 'Should make all the inputs unchecked ', () => {
            Component.control.setValue( 'full' );
            fixture.detectChanges();
            Component.control.setValue( null );
            fixture.detectChanges();
            expect( Inputs[ '0' ].checked ).toBe(false);
            expect( Inputs[ '1' ].checked ).toBe(false);
            expect( Labels[ '0' ].getAttribute('checked') ).toBeFalsy();
            expect( Labels[ '1' ].getAttribute('checked') ).toBeFalsy();
        } );
    } );
    describe( 'When it\'s retrieved ', () => {
        describe( 'When it has a value', () => {
            it( 'should have the button pre selected ', () => {
                Component.show = false; // to force recreate the inside component
                fixture.detectChanges();
                Component.controlGroup = new FormGroup( {
                    [options.fullOrPartial] : new FormControl( options.buttons[ 0 ].value )
                } );
                Component.show         = true;
                fixture.detectChanges();
                Inputs = Element.querySelectorAll( 'input' );
                expect( Inputs[ '0' ].checked ).toBe( true );
                expect( Inputs[ '1' ].checked ).toBe( false );
            } );
            it( 'should emit the select event', fakeAsync( () => {
                Component.show = false; // to force recreate the inside component
                expect( Component.clicked ).toBe( false );
                fixture.detectChanges();
                Component.controlGroup = new FormGroup( {
                    [options.fullOrPartial] : new FormControl( options.buttons[ 0 ].value )
                } );
                Component.show         = true;
                fixture.detectChanges();
                tick();
                Inputs = Element.querySelectorAll( 'input' );
                expect( Inputs[ '0' ].checked ).toBe( true );
                expect( Inputs[ '1' ].checked ).toBe( false );
                expect( Component.clicked ).toBe( true );
            } ) );
        } );
        describe( 'When it has NOT a value', () => {
            it( 'should NOT have any of the buttons pre selected ', () => {
                Component.show = false; // to force recreate the inside component
                fixture.detectChanges();
                Component.controlGroup = new FormGroup( {
                    [options.fullOrPartial] : new FormControl( null )
                } );
                Component.show         = true;
                fixture.detectChanges();
                Inputs = Element.querySelectorAll( 'input' );
                expect( Inputs[ '0' ].checked ).toBe( false );
                expect( Inputs[ '1' ].checked ).toBe( false );
            } );
            it( 'should NOT emit the select event', fakeAsync( () => {
                Component.show = false; // to force recreate the inside component
                expect( Component.clicked ).toBe( false );
                fixture.detectChanges();
                Component.controlGroup = new FormGroup( {
                    [options.fullOrPartial] : new FormControl( null )
                } );
                Component.show         = true;
                fixture.detectChanges();
                tick();
                Inputs = Element.querySelectorAll( 'input' );
                expect( Inputs[ '0' ].checked ).toBe( false );
                expect( Inputs[ '1' ].checked ).toBe( false );
                expect( Component.clicked ).toBe( false );
            } ) );
        } );
    } );
} );
@Component( {
    template : `
        <form  #formModel='ngForm' class='nl-form' *ngIf="show">
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
    private show                     = true;
    private clicked                  = false;
    private controlGroup : FormGroup = new FormGroup( {} );
    private fullOrPartialButtons     = {
        buttons       : [
            {
                id    : 'fullId',
                value : 'full',
                label : 'Full sale'
            },
            {
                id    : 'partialId',
                value : 'partial',
                label : 'Partial sale'
            }
        ],
        fullOrPartial : 'fullOrPartial'
    };

    get control() {
        return this.controlGroup.controls[ 'fullOrPartial' ];
    }

    private onButtonClick( event ) {
        this.clicked = !this.clicked;
    }
}
