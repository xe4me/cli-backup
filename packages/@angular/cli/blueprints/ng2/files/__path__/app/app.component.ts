import { Component , ViewEncapsulation} from '@angular/core';
@Component({
  selector: '<%= prefix %>-root',<% if (inlineTemplate) { %>
  template: `
  <h1>
    {{title}}
  </h1><% if (routing) { %>
  <router-outlet></router-outlet><% } %>
  `,<% } else { %>
  templateUrl: './app.component.html',<% } %>
  styles: [ require( '../styles/all.scss' ) ],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
    public title = '<%= prefix %> , welcome to your new DDC experience!';
}
