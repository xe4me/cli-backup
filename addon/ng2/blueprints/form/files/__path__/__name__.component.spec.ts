/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject, ComponentFixture , TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { <%= classifiedModuleName %>Component } from './<%= dasherizedModuleName %>.component';

describe('Component: <%= classifiedModuleName %>', () => {
  beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [ ReactiveFormsModule ] ,
            declarations : [ ] ,
            providers    : [ ]
        } );
        TestBed.compileComponents();
    } ) );

  it('should create an instance', () => {
    let fixture: ComponentFixture<<%= classifiedModuleName %>Component> = TestBed.createComponent( <%= classifiedModuleName %>Component );
    fixture.detectChanges();
    let component       = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});