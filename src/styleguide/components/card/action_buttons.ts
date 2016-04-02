import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'card-action-buttons'})
@View({
  templateUrl: 'src/styleguide/components/card/action_buttons.html',
  styleUrls: ['src/styleguide/components/card/action_buttons.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardActionButtons {
}
