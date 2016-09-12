import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  private childBlocks            = {
        name        : 'AmpButtonComponentSection' ,
        blockType   : 'PageSectionComponent' ,
        blockLayout : 'SECTION' ,
        commonBlock : true ,
        path        : 'sections/page-section.component' ,
        custom      : { label : 'Beneficiaries' } ,
        blocks      : [
            {
                name        : 'ampButton' ,
                blockType   : 'AmpGroupButtonComponent' ,
                blockLayout : 'INLINE' ,
                commonBlock : true ,
                path        : 'components/amp-group-button/amp-group-button.component' ,
                custom      : {
                    parentControl : new FormControl() ,
                    id            : 'ApplicantDetails-gender' ,
                    label         : 'Gender' ,
                    buttons       : [
                        { id : 'ApplicantDetails-femaleId' , value : 'F' , label : 'Female' } ,
                        { id : 'ApplicantDetails-maleId' , value : 'M' , label : 'Male' }
                    ]
                }
            }
        ]
    };
  constructor() { }

  ngOnInit() {
  }

}
