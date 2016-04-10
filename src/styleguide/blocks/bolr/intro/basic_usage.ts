import {View, Component, AfterViewInit, ChangeDetectorRef} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {IntroBlockComponent} from '../../../../app/blocks/bolr/initState/IntroBlock.component';
import {FormModelService} from "amp-ddc-ui-core/src/app/services/formModel.service";

@Component({
    selector: 'bolr-intro-block-basic-usage',
    providers: [FormModelService]
})
@View({
  templateUrl: 'src/styleguide/blocks/bolr/intro/basic_usage.html',
  styles: [require('./basic_usage').toString()],
  directives: [IntroBlockComponent]
})
export default class BOLRIntrolBlockBasicUsage {//implements AfterViewInit {

  constructor (private _cd: ChangeDetectorRef) {  }

}
