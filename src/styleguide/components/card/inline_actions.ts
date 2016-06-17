import {View, Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({selector: 'card-inline-actions'})
@View({
  templateUrl: 'src/styleguide/components/card/inline_actions.html',
  styleUrls: ['src/styleguide/components/card/inline_actions.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardInlineActions {
}
