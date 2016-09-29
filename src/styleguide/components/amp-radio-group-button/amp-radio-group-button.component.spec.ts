import { async , ComponentFixture , TestBed } from '@angular/core/testing';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl , FormsModule , ReactiveFormsModule , FormGroup } from '@angular/forms';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpRadioButtonGroupModule } from '../../../app/modules/amp-radio-button-group';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
describe( 'amp-radio-group-button component , multiple items usage' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpRadioButtonGroupModule ] ,
            declarations : [
                AmpRadioGroupButtonTest1
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
    it( 'Should contain 4 radio input fields with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest1> = TestBed.createComponent( AmpRadioGroupButtonTest1 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let multipleRadioGroup      = Element.querySelector( '#multiple-radio-group' );
        let Inputs                  = multipleRadioGroup.querySelectorAll( 'input' );
        let Form                    = Element.querySelector( 'form' );
        expect( Inputs[ '0' ].name ).toBe( Component.radiosMultipleOptions.groupName );
        expect( Inputs[ '0' ].getAttribute( 'data-automation-id' ) ).toBe( 'radio_button_' + Component.radiosMultipleOptions.buttons[ 0 ].id );
        expect( Inputs.length ).toBe( 4 );
    } );
    it( 'Should update the control value after selecting the first radio option and this value should be null' +
        ' initially' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest1> = TestBed.createComponent( AmpRadioGroupButtonTest1 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let multipleRadioGroup      = Element.querySelector( '#multiple-radio-group' );
        let Labels                  = multipleRadioGroup.querySelectorAll( 'label' );
        expect( Component.multipleOptionControl.value ).toBeNull();
        Labels[ '0' ].click();
        fixture.detectChanges();
        expect( Component.multipleOptionControl.value ).toBe( Component.radiosMultipleOptions.buttons[ 0 ].value );
    } );
    it( 'Should emit a "select" event to it\'s parent after selecting one of the radio options ' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest1> = TestBed.createComponent( AmpRadioGroupButtonTest1 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let multipleRadioGroup      = Element.querySelector( '#multiple-radio-group' );
        let Labels                  = multipleRadioGroup.querySelectorAll( 'label' );
        expect( Component.multipleOptionControl.value ).toBeNull();
        expect( Component.onRadioButtonSelectedValue ).toBeNull();
        Labels[ '1' ].click();
        fixture.detectChanges();
        expect( Component.onRadioButtonSelectedValue ).toBe( Component.radiosMultipleOptions.buttons[ 1 ].value );
    } );
} );
describe( 'amp-radio-group-button component , single item usage' , () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule , ReactiveFormsModule , AmpRadioButtonGroupModule ] ,
            declarations : [
                AmpRadioGroupButtonTest2
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
    it( 'Should contain 1 radio input field with proper data-automation-id and name attributes ' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest2> = TestBed.createComponent( AmpRadioGroupButtonTest2 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let multipleRadioGroup      = Element.querySelector( '#single-radio-group' );
        let Inputs                  = multipleRadioGroup.querySelectorAll( 'input' );
        let Form                    = Element.querySelector( 'form' );
        expect( Inputs[ '0' ].name ).toBe( Component.radiosOneOption.groupName );
        expect( Inputs[ '0' ].getAttribute( 'data-automation-id' ) ).toBe( 'radio_button_' + Component.radiosOneOption.buttons[ 0 ].id );
        expect( Inputs.length ).toBe( 1 );
    } );
    it( 'Should be able to preselect if there is only one option and autoSelectOnOne attr is set to true' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest2> = TestBed.createComponent( AmpRadioGroupButtonTest2 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let singleRadioGroup        = Element.querySelector( '#single-radio-group' );
        let label                   = singleRadioGroup.querySelectorAll( 'label' )[ 0 ];
        let input                   = singleRadioGroup.querySelectorAll( 'input' )[ 0 ];
        expect( Component.oneOptionControl.value ).toBe( 'five_years' );
        expect( input.checked ).toBeTruthy();
        expect( (' ' + label.className + ' ').indexOf( ' checked ' ) ).toBeGreaterThan( - 1 );
    } );
    it( 'Should have one label field with the correct text' , () => {
        let fixture : ComponentFixture<AmpRadioGroupButtonTest2> = TestBed.createComponent( AmpRadioGroupButtonTest2 );
        fixture.detectChanges();
        const Element               = fixture.nativeElement;
        let AmpRadioGroupButtonTest = fixture.debugElement;
        let Component               = AmpRadioGroupButtonTest.componentInstance;
        let singleRadioGroup        = Element.querySelector( '#single-radio-group' );
        let labelText               = singleRadioGroup.querySelectorAll( '.label' )[ 0 ];
        let input                   = singleRadioGroup.querySelectorAll( 'input' )[ 0 ];
        expect( labelText.innerHTML.trim() ).toBe( Component.radiosOneOption.buttons[ 0 ].label.trim() );
    } );
} );
@Component( {
    template : `
        <form  #formModel='ngForm' class='nl-form' >
            <div id='multiple-radio-group' class='group-buttons'>
                <amp-radio-button-group
                    [autoSelectOnOne]='"true"'
                    [required]='true'
                    scrollOutOn='null'
                    class='grid__item 1/1'
                    (select)='onMultipleRadioButtonSelect($event)'
                    [buttons]='radiosMultipleOptions.buttons'
                    [controlGroup]='multipleOptioncontrolGroup'
                    [groupName]='radiosMultipleOptions.groupName'>
                </amp-radio-button-group>
                <div class='control-value'>
                    Control value : {{ multipleOptionControl.value}}
                </div>
            </div>
        </form>
    `
} )
class AmpRadioGroupButtonTest1 {
    multipleOptioncontrolGroup : FormGroup = new FormGroup( {} );

    get multipleOptionControl () {
        return this.multipleOptioncontrolGroup.controls[ this.radiosMultipleOptions.groupName ];
    }

    public radiosOneOption             = {
        buttons   : [
            {
                id    : 'five_years' ,
                value : 'five_years' ,
                label : 'At least five years'
            }
        ] ,
        groupName : 'practiceAssociation'
    };
    public radiosMultipleOptions       = {
        buttons   : [
            {
                id    : 'five_years2' ,
                value : 'five_years2' ,
                label : 'At least five years'
            } ,
            {
                id    : 'fewer_than_five_years' ,
                value : 'fewer_than_five_years' ,
                label : 'Fewer than five years'
            } ,
            {
                id    : 'more_than_five_years' ,
                value : 'more_than_five_years' ,
                label : 'More than five years'
            } ,
            {
                id    : 'amazing_value' ,
                value : 'amazing_value' ,
                label : 'How amazing this radio button is '
            }
        ] ,
        groupName : 'amazingRadioButtonGroupName'
    };
    private selectEventFiredOnClick    = false;
    private onRadioButtonSelectedValue = null;
    private autoSelectOnOne : boolean  = true;
    private color                      = 'red';

    private onOneRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }

    private onMultipleRadioButtonSelect ( $event ) {
        this.onRadioButtonSelectedValue = $event;
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
        this.selectEventFiredOnClick = true;
    }
}
@Component( {
    template : `
    <form  #formModel='ngForm' class='nl-form' >
        <div id='single-radio-group' class='group-buttons'>
            <amp-radio-button-group
                    [autoSelectOnOne]='autoSelectOnOne'
                    required='true'
                    scrollOutOn='null'
                    class='grid__item 1/1'
                    (select)='onOneRadioButtonSelect($event)'
                    [buttons]='radiosOneOption.buttons'
                    [controlGroup]='oneOptioncontrolGroup'
                    [groupName]='radiosOneOption.groupName'>
            </amp-radio-button-group>
            <div class='control-value'>
                Control value : {{ oneOptionControl.value}}
            </div>
        </div>
    </form>
`
} )
class AmpRadioGroupButtonTest2 {
    oneOptioncontrolGroup : FormGroup = new FormGroup( {} );

    get oneOptionControl () {
        return this.oneOptioncontrolGroup.controls[ this.radiosOneOption.groupName ];
    }

    public radiosOneOption            = {
        buttons   : [
            {
                id    : 'five_years' ,
                value : 'five_years' ,
                label : 'At least five years'
            }
        ] ,
        groupName : 'practiceAssociation'
    };
    private autoSelectOnOne : boolean = true;
    private color                     = 'red';

    private onOneRadioButtonSelect () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }
}
