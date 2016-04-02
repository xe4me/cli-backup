import {Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone} from 'angular2/core';
import {AbstractControl, FormBuilder, Control, ControlGroup, ControlArray, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES, NgControl, FORM_PROVIDERS} from 'angular2/common';
import {MySelectComponent} from '../../components/my-select/my-select.component';
import {MdInputComponent} from '../../components/my-md-input/my-md-input.component';
import {Action} from '../action';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {FormComponent} from '../formComponent';
import {DerbyFormService} from '../../services/derby-form.service';

declare var google:any;

@Component({
  selector: 'ootb-form',
  providers: [ ...FORM_PROVIDERS, DerbyFormService ],
  template: `
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,200,300,600" rel="stylesheet">
  <div class="ootb-form">
    <h1>OOTB form implementation</h1>

    <form  [ngFormModel]="derbyForm" class="nl-form" (ngSubmit)="saveForm()">
      <p>I,
        <my-md-input [id]="model[1].id" [label]="model[1].label" [parentControl]="derbyForm.controls[model[1].label]" [placeholder]="model[1].placeholder" [visibility]="model[1].visibility"
            isRequired="true"
            valPattern="^([A-Za-z ])*$"
            valMaxLength="50">
          <div md-messages="{{model[1].label}}" role="alert">
            <div md-message="required">You must supply a {{model[1].label}}.</div>
            <div md-message="mdPattern">That doesn't look like a valid {{model[1].label}}.</div>
            <div md-message="mdMaxLength">{{model[1].label}} is too long.</div>
          </div>
        </my-md-input>
        from
          <my-md-input [id]="model[0].id" [label]="model[0].label" [parentControl]="derbyForm.controls[model[0].label]" [placeholder]="model[0].placeholder" [visibility]="model[0].visibility"
              isRequired="false"
              valPattern="^.*$"
              valMaxLength="300">
            <div md-messages="{{model[0].label}}" role="alert">
              <div md-message="required">You must supply a {{model[0].label}}.</div>
              <div md-message="mdPattern">That doesn't look like a valid {{model[0].label}}.</div>
              <div md-message="mdMaxLength">{{model[0].label}} is too long.</div>
            </div>
          </my-md-input>
        , would like to exercise a partial licensee buy back facility. We're located at
        <my-md-input [id]="model[2].id" [label]="model[2].label" [parentControl]="derbyForm.controls[model[2].label]" [placeholder]="model[2].placeholder"
            isRequired="false"
            valPattern="^.*$"
            valMaxLength="3000">
        </my-md-input>.
      </p>
      <button type="submit" class="btn btn--secondary btn--bravo" [disabled]="derbyForm.pristine || !derbyForm.valid">OK</button>
    </form>

    <h3>Current Form Model:</h3>
    <pre>{{derbyForm.value | json}}</pre>

    <h3>Saved Form Model:</h3>
    <pre>{{savedForm | json}}</pre>

    <h3>TODO</h3>
    <ul>
      <li>Cross component validations - DONE (Can be done across control group)</li>
      <li>Cross component visibility - DONE (Coarse grain level, fine grain might need more investigation)</li>
      <li>Single parent Form control cross multiple child componoents - DONE</li>
      <li>Data driven form components - DONE. Is it applicable to natural language form...maybe needs an abstraction layer</li>
    </ul>
  </div>
  `,
  styles: [require('./buyback-form.scss')],
  directives: [MySelectComponent, MdInputComponent, ...CORE_DIRECTIVES, ...FORM_DIRECTIVES, ...MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated
})
export class BuyBackFormComponent implements OnInit, AfterViewInit {
  //private practiceName: Control = new Control('', this.uniquePracticeName);
  private practiceName: Control = new Control();
  private practicePrincipal: Control = new Control();
  private fullOrPartial: Control = new Control();
  private payeeIdControl: Control = new Control();

  // Default Model (i.e. the default standard layout)
  private model: Array<FormComponent> = [];

  // JSON representation of the Model
  // TODO: This should be a String, which we call JSON.parse to obtain the JSON representation, use straight JSON now for convenience
  private formDefinition =
    [{
      type: "input",
      label: "Practice Name",
      placeholder: "Pinnacle Financial Pty Ltd"
    }];

  // The actual form, which hold the user input for submission
  private formModel: ControlGroup = this.builder.group({
    test: ["", Validators.required]
  });
  private derbyForm: ControlGroup = this.builder.group({});

  errorMessage: string;
  heroes: Object;
  savedForm: Object;

  constructor(private _derbyFormService: DerbyFormService, private zone:NgZone, private builder: FormBuilder) {}

  ngOnInit() {
    // this.initializeModel(this.formDefinition);
    this.model.push(
      new FormComponent('input', 'practiceName', 'Practice Name', this.practiceName, null),
      new FormComponent('input', 'practicePrincipal', 'Practice Principal', this.practicePrincipal, null),
      new FormComponent('input', 'practiceAddress', null, new Control(), " ")
      // new FormComponent('input', 'Payee ID', this.payeeIdControl, 'BCABB-F'),
      // new FormComponent('input', 'Email', new Control(), 'john_smith@amp.com.au'),
      // new FormComponent('input', 'Phone number', new Control(), '(02) 9345 1234)'),
      // new FormComponent('select', 'Some enum', new Control(), null, 'What is this select option', ['Show me some value','Show me the money'])

      // new FormComponent('select', 'Full or Partial', this.fullOrPartial, null, 'Full or Partial is a required field', ['the full','a partial'],
      //     // visibility
      //     new Action((control) => control.valid || !control.pristine, [this.practicePrincipal])),
    );

    // Add all model components to the control group
    this.model.map(component => {this.derbyForm.addControl(component.label, component.parentControl)});

    // this._derbyFormService.getHeroes()
    //                         .subscribe(
    //                           heroes => {
    //                               this.heroes = heroes;
    //                               console.log("Hero", this.heroes);
    //                             },
    //                           error =>  {
    //                             this.errorMessage = <any>error;
    //                             console.log("Error", this.errorMessage);
    //                           }
    //                         );
  }

  ngAfterViewInit () {
    // Binding Google Places Address api to google_places_ac input field
    var input : any = document.getElementById('practiceAddress');
    var autocomplete = new google.maps.places.Autocomplete(input, {});

    google.maps.event.addListener(autocomplete, 'place_changed', ()=>{
      this.zone.run(() => {
        var place = autocomplete.getPlace();
        this.model[2].parentControl.updateValue(place.formatted_address);
        // console.log('place change');
      });
    });

  }

  saveBuyBackForm () {
    console.log("About to save the form", this.derbyForm.value);
    this._derbyFormService.saveForm(this.derbyForm)
                          .subscribe(
                                data => {
                                  this.savedForm = data;
                                  console.log("SavedForm", this.savedForm);
                                },
                                error => {
                                  this.errorMessage = <any>error;
                                  console.log("Error", this.errorMessage);
                                }
                          );
  }


  // initializeModel (formDef: Array<Object>) {
  //   formDef.map(formComponentDef => {
  //     component = new FormComponent(<string>formComponentDef.type, formComponentDef.label, formComponentDef)
  //     this.model.
  //     this.formModel.addControl
  //   });
  //   // TODO: Convert the JSON to FormComponent and push into the model
  // }

  // uniquePracticeName(c: Control) {
  //   if (c.value && this.practicePrincipal && c.value == this.practicePrincipal.value) {
  //     return {
  //       unique: false
  //     };
  //   }
  //   return null;
  // }

  // <!-- Library of possible components -->
  // <span *ngFor="#m of model">
  //   <span [ngSwitch]="m.type">
  //     <!-- Input component -->
  //     <my-md-input *ngSwitchWhen="'input'" [label]="m.label" [parentControl]="m.parentControl" [placeholder]="m.placeholder" [visibility]="m.visibility"></my-md-input>
  //
  //     <!-- Select component -->
  //     <my-select *ngSwitchWhen="'select'" [label]="m.label" [errorMessage]="m.errorMessage" [parentControl]="m.parentControl" [options]="m.options" [visibility]="m.visibility"></my-select>
  //
  //     <!-- Unknown component -->
  //     <span *ngSwitchDefault>Oops! This control type is unknown {{m.type}} {{m.type=='input'}}. Contact the creator</span><br/>
  //
  //   </span>
  // </span>



  // <input type="text" name="test" placeholder="testPlaceholder" [ngFormControl]="derbyForm.controls['test']"/>



  // <p>I,
  //   <my-md-input [label]="model[1].label" [parentControl]="model[1].parentControl" [placeholder]="model[1].placeholder" [visibility]="model[1].visibility"
  //       isRequired="true"
  //       valPattern="^([A-Za-z ])*$"
  //       valMaxLength="50">
  //     <div md-messages="{{model[1].label}}" role="alert">
  //       <div md-message="required">You must supply a {{model[1].label}}.</div>
  //       <div md-message="mdPattern">That doesn't look like a valid {{model[1].label}}.</div>
  //       <div md-message="mdMaxLength">{{model[1].label}} is too long.</div>
  //     </div>
  //   </my-md-input>
  //   from
  //     <my-md-input [label]="model[0].label" [parentControl]="model[0].parentControl" [placeholder]="model[0].placeholder" [visibility]="model[0].visibility"
  //         isRequired="false"
  //         valPattern="^.*$"
  //         valMaxLength="300">
  //       <div md-messages="{{model[0].label}}" role="alert">
  //         <div md-message="required">You must supply a {{model[0].label}}.</div>
  //         <div md-message="mdPattern">That doesn't look like a valid {{model[0].label}}.</div>
  //         <div md-message="mdMaxLength">{{model[0].label}} is too long.</div>
  //       </div>
  //     </my-md-input>
  //   , would like to exercise
  //   <my-select [label]="model[2].label" [errorMessage]="model[2].errorMessage" [parentControl]="model[2].parentControl" [options]="model[2].options" [visibility]="model[2].visibility"></my-select>
  //   licensee buy back facility. We're located at
  //   <my-md-input [label]="model[3].label" [parentControl]="model[3].parentControl" [placeholder]="model[3].placeholder"
  //       isRequired="false"
  //       valPattern="^.*$"
  //       valMaxLength="3000">
  //   </my-md-input>.
  // </p>

}
