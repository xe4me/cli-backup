import {View, Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'toolbar-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/toolbar/basic_usage.html',
  styleUrls: ['src/styleguide/components/toolbar/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ToolbarBasicUsage {
  clicked(message: string) {
    alert(message);
  }
}
