import {View, Component, ChangeDetectorRef} from 'angular2/core';
import {ContactDetailsBlockComponent} from 'src/app/blocks/bolr/dialogueState/contactDetails/ContactDetailsBlock.component';


@Component({selector: 'bolr-contact-details-block-basic-usage'})
@View({
  templateUrl: 'src/styleguide/blocks/bolr/dialogue/contactDetails/basic_usage.html',
  styles: [require('./basic_usage.scss').toString()],
  directives: [ContactDetailsBlockComponent]
})
export default class BOLRContactDetailsBlockBasicUsage {//implements AfterViewInit {

  constructor (private _cd: ChangeDetectorRef) {  }

}
