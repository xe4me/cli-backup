import { Component, ViewEncapsulation } from '@angular/core';<% if (isMobile) { %>
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';<% } %>

@Component({
  selector: '<%= prefix %>-root',
  <% if (isMobile) { %>
    template: `
  <h1>
    {{title}}
  </h1>
  `,
  styles: [ require( '../styles/all.scss' ).toString() ],
  directives: [APP_SHELL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
  <% } else { %>
  styles: [ require( '../styles/all.scss' ).toString() ],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
  <% } %>
})
export class AppComponent {
  title = 'Welcome to your new AMP DDC Experience!';
}
