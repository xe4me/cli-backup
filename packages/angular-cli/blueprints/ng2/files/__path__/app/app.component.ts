import { Component, ViewEncapsulation } from '@angular/core';<% if (isMobile) { %>
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';<% } %>

@Component({
  selector: '<%= prefix %>-root',<% if (inlineTemplate) { %>
  template: `
  <h1>
    {{title}}
  </h1>
  `,<% } else { %>
  templateUrl: './app.component.html',<% } %><% if (inlineStyle) { %>
    styles: [ require( '../styles/all.scss' ).toString() ]<% } else { %>
  styleUrls: ['./app.component.<%= styleExt %>']<% } %>
})
export class AppComponent {
  title = '<%= prefix %> , welcome to your new DDC experience!';
}
