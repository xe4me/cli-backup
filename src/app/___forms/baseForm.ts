import {ControlGroup, Control, FormBuilder} from 'angular2/common';
import {DynamicComponentLoader, ChangeDetectorRef, ElementRef, ComponentRef, Component} from "angular2/core";

import {Action} from './action';
import {FormDefinition, BlockLayout} from "./formDefinition";
import {FormBlock} from "../blocks/formBlock";

import {DerbyFormService} from '../services/derby-form.service';
import {Observable}     from 'rxjs/Observable';
import {Router, RouteParams} from 'angular2/router';


export abstract class BaseForm {
  // State information, lets use Redux or the likes to manage state in a predictable/controlled way. No state immutation without going thru pure function reducers.
  // NOTE: Shouldn't need to keep internal state if using the URL to manage the state of the page.
  //public pageIndex = 0;

  constructor(
    public _formDefinition: FormDefinition,      // Default formDefinition or retrieve from a saved form
    public formModel: ControlGroup,
    private _derbyFormService: DerbyFormService,
    public _dcl: DynamicComponentLoader,
    public _elementRef: ElementRef,
    public _cd: ChangeDetectorRef,
    public _router: Router,
    public routeParams: RouteParams
  ){}

  get formDefinition(): FormDefinition {
    // Note: this is a shallow clone of the object...how shallow, I have no idea o..O
    // return Object.assign({ __proto__: this._formDefinition.__proto__ }, this._formDefinition);

    return this._formDefinition;
  }

  loadAllFormBlocks(_formBlocksDef: Array<any>, elementRef: ElementRef, anchorName: string) {
    // Maps all FormBlocksDefinition (JSON array) onto the form
    if (_formBlocksDef && _formBlocksDef.length > 0) {
      _formBlocksDef.map(function (value, index, blocks) {
        this.loadFormBlock(value, this.elementRef, this.anchorName);
      }, {
        loadFormBlock: this.loadFormBlock,
        elementRef: elementRef,
        anchorName: anchorName,
        _dcl: this._dcl,
        _cd: this._cd,
        formModel: this.formModel,
        loadAllFormBlocks: this.loadAllFormBlocks,
        copyFormBlockDefProperty: this.copyFormBlockDefProperty,
      });
    }
  }

  // Important: This method is currently triggered from a Component lifecycle method ngOnInit, so do not rely on the ordering of the other lifecycle event on different components
  loadFormBlock(_formBlockDef: any, hostLocation: ElementRef, anchorName: string) {
    var baseFormObj = this, type;
    var waitForChunk = require('bundle!../blocks/' + _formBlockDef.path + _formBlockDef.blockType + "\.ts");

    waitForChunk(function (file) {
      // Assuming that the file is loaded via Webpack
      if (file['default']) {
        type = file['default'];
      } else {
        type = file[_formBlockDef.blockType];
      }

      // Maybe we need those Provider parameters after all.
      baseFormObj._dcl.loadIntoLocation(type, hostLocation, anchorName)
        .then((ref: ComponentRef) => {

          // Populate the dynamically created instance with the formBlock properties from the FormDefinition
          baseFormObj.copyFormBlockDefProperty(ref, _formBlockDef);

          // Updates the formControls array with the properties obtained from the formDef properties
          ref.instance.constructFormControls();

          // Invoke the bind all method on each dcl component to bind all component control to formModel
          ref.instance.bindAllFormControls(baseFormObj.formModel);

          // Recursively load all formblocks
          baseFormObj.loadAllFormBlocks(_formBlockDef.blocks, ref.location, "nestedBlock");

          // Trigger a Change Detection, as the model is changed after the view is loaded and its not done by {event, http, timer}
          baseFormObj._cd.detectChanges();
        });
    });
  }

  copyFormBlockDefProperty(formBlockRef: ComponentRef, _blockDef) {
    // Generic FormBlock properties
    formBlockRef.instance.path = _blockDef.path;
    formBlockRef.instance.blockType = _blockDef.blockType;
    formBlockRef.instance.blockLayout = _blockDef.blockLayout;

    // FormPage properties
    if (_blockDef.blockLayout === BlockLayout[BlockLayout.PAGE]) {
      Object.assign(formBlockRef.instance, _blockDef.page);
    }

    // FormBlock custom properties
    if (_blockDef.custom) {
      Object.assign(formBlockRef.instance, _blockDef.custom);
    }
  }

  saveForm(): Observable<string> {
    console.log("About to save the form", this.formModel.value);
    return this._derbyFormService.saveForm(this.formModel);
  }
}
