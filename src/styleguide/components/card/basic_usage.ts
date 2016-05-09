import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'card-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/card/basic_usage.html',
 styleUrls: ['src/styleguide/components/card/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardBasicUsage {
  public imagePath: string = 'src/assets/images/washedout.png';
}
