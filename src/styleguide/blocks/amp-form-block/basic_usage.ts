import { Component , ChangeDetectorRef , ViewChild } from '@angular/core';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
import { Store , provideStore } from '@ngrx/store';
import { FormGroup , FormBuilder } from '@angular/forms';
import { FormSectionService } from '../../../app/services/form-section/form-section.service';
import { AmpFirstNameComponent } from '../../../../src/app/components/amp-first-name/amp-first-name.component';
import{ Highlight } from '../../highlight';
let formDef = require( './form-def.def.json' );

@Component( {
    selector    : 'amp-form-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/amp-form-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    providers   : [ FormSectionService ] ,
    directives  : [ Highlight , AmpBlockLoaderDirective , AmpFirstNameComponent ]
} )
export default class AmpFormBlockBasicUsage {
    public  __controlGroup         = new FormGroup( {} );
    public  __custom               = { controls : [ { id : 'controlId' } ] };
    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup;

    constructor ( public store : Store<any> , private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
}
