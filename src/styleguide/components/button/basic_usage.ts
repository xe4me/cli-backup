import {View, Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';


@Component({selector: 'button-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/button/basic_usage.html',
  styleUrls: ['src/styleguide/components/button/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ButtonBasicUsage {
  googleUrl: string = 'https://www.google.com';
  title1: string = 'Button';
  title4: string = 'Warn';
  isDisabled: boolean = true;

}
