import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';

@Component({
    selector: '<%= selector %>',
    directives: [ AmpBlockLoaderDirective ],<% if(inlineTemplate) { %>
    template: `
        <p>
          <%= dasherizedModuleName %> Works!
        </p>
    `,<% } else { %>
    templateUrl: '<%= dasherizedModuleName %>.component.html',<% } if(inlineStyle) { %>
    styles: []<% } else { %>
    styleUrls: ['<%= dasherizedModuleName %>.component.<%= styleExt %>']<% } %>
})
export class <%= classifiedModuleName %>Component implements OnInit {
    private fullyDistinguishedName = [ 'Application' ];
    private form   = this._builder.group( {} );
    private childBlocks            = {
        name        : 'AmpButtonComponentSection' ,
        blockType   : 'PageSectionComponent' ,
        blockLayout : 'SECTION' ,
        commonBlock : true ,
        path        : 'sections/page-section.component' ,
        custom      : { label : 'Beneficiaries' } ,
        blocks      : [
            // {
            //     name        : 'ampButton' ,
            //     blockType   : 'AmpGroupButtonsComponent' ,
            //     blockLayout : 'INLINE' ,
            //     commonBlock : true ,
            //     path        : 'components/amp-group-buttons/amp-group-buttons.component' ,
            //     custom      : {
            //         groupName     : 'Gender',
            //         controlGroup  : new FormGroup({}) ,
            //         id            : 'ApplicantDetails-gender' ,
            //         label         : 'Gender' ,
            //         buttons       : [
            //             { id : 'ApplicantDetails-femaleId' , value : 'F' , label : 'Female' } ,
            //             { id : 'ApplicantDetails-maleId' , value : 'M' , label : 'Male' }
            //         ]
            //     }
            // }
        ]
    };
  constructor(private _builder:FormBuilder) { }

  ngOnInit() {
  }

}
