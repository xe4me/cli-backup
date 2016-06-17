import {View, Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'whiteframe-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/whiteframe/basic_usage.html',
  styleUrls: ['src/styleguide/components/whiteframe/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class WhiteframeBasicUsage {
}
