import {Component, DynamicComponentLoader, ViewEncapsulation, OnInit, AfterViewInit, NgZone, ElementRef, ChangeDetectorRef} from 'angular2/core';
import {AbstractControl, FormBuilder, Control, ControlGroup, ControlArray, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES, NgControl, FORM_PROVIDERS} from 'angular2/common';
import {MySelectComponent} from '../../components/my-select/my-select.component';
import {MdInputComponent} from '../../components/my-md-input/my-md-input.component';
import {Action} from '../action';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {FormComponent} from '../formComponent';
import {DerbyFormService} from '../../services/derby-form.service';
import {BaseForm} from "../baseForm";
import {FormBlock} from "../../blocks/formBlock";
import {BuyBackFormDefinition, _buyBackFormDef} from "./buyback-formDefinition";
import {RouteConfig, Router, RouteParams, CanDeactivate, ComponentInstruction} from 'angular2/router';

@Component({
  selector: 'buy-back-form',
  providers: [ ...FORM_PROVIDERS, DerbyFormService  ],
  template: `
  <div class="ootb-form">
    <h1>Buy Back form</h1>

    <form [ngFormModel]="formModel" class="nl-form" (ngSubmit)="saveBuyBackForm()">
      <!-- Dynamic form blocks driven from the Form Definition -->
      <div #formBlocks></div>

    </form>

    <h3>Current Form Model:</h3>
    <pre>{{formModel.value | json}}</pre>

  </div>
  `,
  styles: [require('./buyback-form.scss')],
  directives: [MySelectComponent, MdInputComponent, ...CORE_DIRECTIVES, ...FORM_DIRECTIVES, ...MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated
})
export class BuyBackFormComponent extends BaseForm implements OnInit, CanDeactivate {
  constructor (
    dcl: DynamicComponentLoader,
    derbyFormService: DerbyFormService,
    elementRef: ElementRef,
    private builder: FormBuilder,
    cd: ChangeDetectorRef,
    _router: Router,
    routeParams: RouteParams) {
      super(null, builder.group({}), derbyFormService, dcl, elementRef, cd, _router, routeParams);
  }

  ngOnInit () {
     // _buyBackFormDef is defaulted at the moment. Should formDef incorporate formData? Should formDef comes from db?
     if (!this._formDefinition) {
       this._formDefinition = new BuyBackFormDefinition(_buyBackFormDef, this.routeParams.get('id'));
     }

     this.loadAllFormBlocks(this._formDefinition.blocks, this._elementRef, "formBlocks");

     // TODO: Pre-pop
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
    return true;
  }

  /** Probably should move this into the parent class */

  saveBuyBackForm() {
    super.saveForm()
          .do(data => console.log("SaveDerbyForm", data));
          // .subscribe(data => {}, error => {}, complete);
  }

}
