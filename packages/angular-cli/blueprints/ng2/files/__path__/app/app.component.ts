import { Component, ViewEncapsulation } from '@angular/core';<% if (isMobile) { %>
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';<% } %>

@Component({
  selector: '<%= prefix %>-root',<% if (inlineTemplate) { %>
  template: `
  <h1>
    {{title}}
  </h1>
  `,<% } else { %>
  templateUrl: './app.component.html',<% } %>
    styles: [ require( '../styles/all.scss' ) ]  ,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = '<%= prefix %> , welcome to your new DDC experience!';
}
