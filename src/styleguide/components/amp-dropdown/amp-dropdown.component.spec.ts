import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { FormControl, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AmpDropdownComponent } from '../../../app/components/amp-dropdown/amp-dropdown.component';
import { MockScrollService } from '../../services/mock-scroll.service';
import { MockFormModelService } from '../../services/mock-form-mode.service';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'amp-dropdown component' , () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule, FormsModule ],
            declarations: [
                AmpDropdownComponent,
                AmpdropdownTest
            ],
            providers: [
                { provide: FormModelService, useClass: MockFormModelService },
                { provide: ElementRef, useClass: MockElementRef },
                { provide: ScrollService, useClass: MockScrollService },
                ProgressObserverService,
                { provide: Window, useClass: window }
            ]
        });

        TestBed.compileComponents();
    }));
    it( 'Should contain 1 dropdown input field with proper data-automation-id and name attributes ' , () => {
        let fixture: ComponentFixture<AmpdropdownTest> = TestBed.createComponent(AmpdropdownTest);
        fixture.detectChanges();

        let Element         = fixture.nativeElement;
        let ampdropdownTest = fixture.debugElement;
        let Component       = ampdropdownTest.componentInstance;
        let dropdown        = Element.querySelector( 'select' );
        let options         = dropdown.children;
        expect( dropdown ).toBeDefined();
        expect( dropdown.id ).toBe( 'Title' );
        expect( dropdown.getAttribute( 'data-automation-id' ) ).toBe( 'slt_Title' );
        expect( options ).toBeDefined();
        expect( options.length ).toBe(6);
        expect( options[0].value ).toEqual('');
        expect( options[1].value ).toEqual('mr');
        expect( options[2].value ).toEqual('mrs');
        expect( options[3].value ).toEqual('miss');
        expect( options[4].value ).toEqual('ms');
        expect( options[5].value ).toEqual('dr');
    });
});

@Component( {
    template   : `
        <form #formModel  class='nl-form' >
            <amp-dropdown
                    [attr.theme]='"forms"'
                    [isInSummaryState]='false'
                    [id]='"Title"'
                    [label]='"Title"'
                    [labelHidden]='"HiddenLabel"'
                    [options]='titleOptions'
                    [parentControl]="control"
                    [isRequired]="true">
            </amp-dropdown>
        </form>
    `
})
class AmpdropdownTest {
    control : FormControl = new FormControl();
    isInSummaryState  = false;
    clickedOnThedropdown;
    titleOptions      = [
        { value : 'mr' , label : 'Mr' } ,
        { value : 'mrs' , label : 'Mrs' } ,
        { value : 'miss' , label : 'Miss' } ,
        { value : 'ms' , label : 'Ms' } ,
        { value : 'dr' , label : 'Dr' }
    ];

    private onAcknowledgeSelect ( value ) {
        this.clickedOnThedropdown = value;
    }
};


