import {View, Component, ViewEncapsulation} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'tabs-dynamic-height'})
@View({
  templateUrl: 'src/styleguide/components/tabs/dynamic_height.html',
  styleUrls: ['src/styleguide/components/tabs/dynamic_height.css'],
  directives: [MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export default class TabsDynamicHeight {
}
