import {View, Component, ChangeDetectorRef} from 'angular2/core';
import {StickyProgressHeaderBlockComponent} from '../../../../app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component';


@Component({selector: 'sticky-progress-header-block-basic-usage'})
@View({
  templateUrl: 'src/styleguide/blocks/bolr/sticky-progress-header/basic_usage.html',
  styles: [require('./basic_usage.scss').toString()],
  directives: [StickyProgressHeaderBlockComponent]
})
export default class StickyProgressHeaderBlockBasicUsage {//implements AfterViewInit {

  constructor (private _cd: ChangeDetectorRef) {  }

}
