import {
    it ,
    injectAsync ,
    describe ,
    beforeEachProviders ,
    TestComponentBuilder
} from '@angular/core/testing';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpRadioButtonGroupComponent } from '../../../app/components/amp-radio-button-group/amp-radio-button-group.component';
import { MockScrollService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-scroll.service';
import { MockFormModelService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-form-mode.service';
describe( 'amp-radio-group-button component , multiple items usage' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : ElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        template   : `
            <form  #formModel='ngForm' class='nl-form' >
                <div id='multiple-radio-group' class='group-buttons'>
                    <amp-radio-button-group
                        [autoSelectOnOne]='"true"'
                        required='true'
                        scrollOutOn='null'
                        class='grid__item 1/1'
                        (select)='onMultipleRadioButtonSelect($event)'
                        [buttons]='radiosMultipleOptions.buttons'
                        [parentControl]='multipleOptionControl'
                        [groupName]='radiosMultipleOptions.groupName'>
                    </amp-radio-button-group>
                    <div class='control-value'>
                        Control value : {{ multipleOptionControl.value}}
                    </div>
                </div>
            </form>
        ` ,
        directives : [ AmpRadioButtonGroupComponent ]
    } )
    class AmpRadioGroupButtonTest {
        oneOptionControl : Control      = new Control();
        multipleOptionControl : Control = new Control();
        public radiosOneOption          = {
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
    it( 'Should contain 4 radio input fields with proper data-automation-id and name attributes ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
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
        } )
    );
    it( 'Should update the control value after selecting the first radio option and this value should be null' +
        ' initially' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
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
        } ) );
    it( 'Should emit a \"select\" event to it\'s parent after selecting one of the radio options ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
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
                    expect( Component.onRadioButtonSelectedValue ).toBeNull( Component.radiosMultipleOptions.buttons[ 1 ].value );
                } );
        } ) );
} );
describe( 'amp-radio-group-button component , single item usage' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : ElementRef } ) ,
            provide( ScrollService , { useClass : MockScrollService } ) ,
            provide( ProgressObserverService , { useClass : ProgressObserverService } ) ,
            provide( MockScrollService , { useClass : MockScrollService } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        template   : `
            <form  #formModel='ngForm' class='nl-form' >
                <div id='single-radio-group' class='group-buttons'>
                    <amp-radio-button-group
                            [autoSelectOnOne]='autoSelectOnOne'
                            required='true'
                            scrollOutOn='null'
                            class='grid__item 1/1'
                            (select)='onOneRadioButtonSelect($event)'
                            [buttons]='radiosOneOption.buttons'
                            [parentControl]='oneOptionControl'
                            [groupName]='radiosOneOption.groupName'>
                    </amp-radio-button-group>
                    <div class='control-value'>
                        Control value : {{ oneOptionControl.value}}
                    </div>
                </div>
            </form>
        ` ,
        directives : [ AmpRadioButtonGroupComponent ]
    } )
    class AmpRadioGroupButtonTest {
        oneOptionControl : Control        = new Control();
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
    it( 'Should contain 1 radio input field with proper data-automation-id and name attributes ' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
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
        } )
    );
    it( 'Should be able to preselect if there is only one option and autoSelectOnOne attr is set to true' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
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
        } ) );
    it( 'Should have one label field with the correct text' ,
        injectAsync( [
            TestComponentBuilder ,
            ProgressObserverService ,
            ElementRef ,
            FormModelService ,
            ScrollService
        ] , ( tcb , progressObserver , el , formModelService , scrollService ) => {
            return tcb
                .createAsync( AmpRadioGroupButtonTest )
                .then( ( fixture : any ) => {
                    fixture.detectChanges();
                    const Element               = fixture.nativeElement;
                    let AmpRadioGroupButtonTest = fixture.debugElement;
                    let Component               = AmpRadioGroupButtonTest.componentInstance;
                    let singleRadioGroup        = Element.querySelector( '#single-radio-group' );
                    let labelText               = singleRadioGroup.querySelectorAll( '.label' )[ 0 ];
                    let input                   = singleRadioGroup.querySelectorAll( 'input' )[ 0 ];
                    expect( labelText.innerHTML.trim() ).toBe( Component.radiosOneOption.buttons[ 0 ].label.trim() );
                } );
        } ) );
} );
