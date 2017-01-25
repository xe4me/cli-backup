import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FormGroup ,
    FormBuilder
} from '@angular/forms';
import {
    AmpApplicantGeneratorService
} from "../../../app/modules/amp-single-joint-block/services/amp-applicant-generator.service";

const applicantJSON = require ( './applicant-def.json');
const formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'amp-single-joint-basic-usage',
    templateUrl : './basic_usage.html',
    providers : [ AmpApplicantGeneratorService ],
    styles      : [ require( './basic_usage.scss' ) ]
} )
export default class AmpSingleJointBlockBasicUsage {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> ,
                  private _builder : FormBuilder,
                  public applicantService : AmpApplicantGeneratorService  ) {
        this.form = this._builder.group( {} );
        this.applicantService.applicantDef = applicantJSON;
    }
}
