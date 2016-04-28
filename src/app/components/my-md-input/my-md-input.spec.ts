import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';

// Load the implementations that should be tested
import {MdInputComponent} from './my-md-input.component';

describe('my-md-input directive', () => {
  // Create a test component to test directives
  @Component({
    template: `
      <form  #formModel='ngForm' class='nl-form' >
        <my-md-input [id]="'firstname'" [label]="'Name'" [parentControl]='firstnameControl'
          isRequired='true'
          valPattern='^([A-Za-z ])*$'
          valMaxLength='50'>blah</my-md-input>
      </form>
      `,
    directives: [ MdInputComponent ]
  })
  class TestComponent {
    firstnameControl: Control = new Control();
  }

  it('should contain a label element with name as value and firstname as for attribute', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();

        let compiledTestComponent = fixture.debugElement;
        let compiledForm = compiledTestComponent.children[0];
        let compiledMyMdInput = compiledForm.children[0];
        let compiledMdInputContainer = compiledMyMdInput.children[0];
        let compiledLabel = compiledMdInputContainer.children[0];
        let compiledInput = compiledMdInputContainer.children[1];

        expect(compiledLabel.name).toBe('label');
        expect(compiledLabel.nativeElement.innerHTML).toBe('Name');
        expect(compiledLabel.nativeElement.attributes[1].value).toBe('firstname');
      });
  }));

  it('should contain an input element with name, id and data-automation-id attribute', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();

        let compiledTestComponent = fixture.debugElement;
        let compiledForm = compiledTestComponent.children[0];
        let compiledMyMdInput = compiledForm.children[0];
        let compiledMdInputContainer = compiledMyMdInput.children[0];
        let compiledLabel = compiledMdInputContainer.children[0];
        let compiledInput = compiledMdInputContainer.children[1];

        expect(compiledInput.name).toBe('input');
        expect(compiledInput.nativeElement.attributes['class'].name).toBe('class');
        expect(compiledInput.nativeElement.attributes['class'].value).toContain('md-input');

        expect(compiledInput.nativeElement.attributes['name'].name).toBe('name');
        expect(compiledInput.nativeElement.attributes['name'].value).toBe('firstname');

        expect(compiledInput.nativeElement.attributes['id'].name).toBe('id');
        expect(compiledInput.nativeElement.attributes['id'].value).toBe('firstname');

        expect(compiledInput.nativeElement.attributes['data-automation-id'].name).toBe('data-automation-id');
        expect(compiledInput.nativeElement.attributes['data-automation-id'].value).toBe('text_firstname');
      });
  }));

  it('should have 2 validators', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();

        let compiledTestComponent = fixture.debugElement;
        let compiledForm = compiledTestComponent.children[0];
        let compiledMyMdInput = compiledForm.children[0];
        let compiledMdInputContainer = compiledMyMdInput.children[0];
        let compiledLabel = compiledMdInputContainer.children[0];
        let compiledInput = compiledMdInputContainer.children[1];

        // TODO: Change the number of validators back to 2 Milad.
        expect(compiledInput.componentInstance._validators.length).toBe(2);
        // expect(compiledInput.componentInstance._validators[0]).toBe(MdPatternValidator);
        expect(compiledInput.componentInstance._validators[0].mdPattern).toBe('^([A-Za-z ])*$');
        // TODO: Fix the MaxLength validator in my-md-input by Milad
        expect(compiledInput.componentInstance._validators[1].mdMaxLength).toBe('50');

        // TODO: Work out the mandatory validator that got added to the Control but doesn't show up.
      });
  }));


});
