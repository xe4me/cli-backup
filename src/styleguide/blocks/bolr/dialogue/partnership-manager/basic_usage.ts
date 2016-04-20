import {View, Component, OnInit, ChangeDetectorRef, provide, ViewChild} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {PartnershipManagerBlockComponent} from '../../../../../app/blocks/bolr/dialogueState/partnership-manager/partnership-manager.component';
import {FormModelService} from 'amp-ddc-ui-core/src/app/services/formModel.service';
import {Observable}     from 'rxjs/Observable';
import {BlockID} from 'amp-ddc-ui-core/ui-core';
import {MockFormModelService} from '../../intro/basic_usage';

@Component({
    selector: 'partnership-manager-block-basic-usage',
    providers: [provide(FormModelService , {useClass: MockFormModelService})]
})
@View({
  templateUrl: '/basic_usage.html',
  styles: [require( './basic_usage.scss').toString()],
  directives: [PartnershipManagerBlockComponent]
})
export default class BOLRPartnershipManagerlBlockBasicUsage {
    constructor (private _cd: ChangeDetectorRef) {  }
}
