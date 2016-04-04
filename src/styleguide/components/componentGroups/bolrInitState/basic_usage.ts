import {View, Component, AfterViewInit, ChangeDetectorRef} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {BOLRInitState} from '../../../../app/blocks/bolr/initState/BOLRInitState';

@Component({selector: 'bolr-init-state-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/componentGroups/bolrInitState/basic_usage.html',
  styles: [require('./basic_usage.scss')],
  directives: [BOLRInitState]
})
export default class BOLRInitStateBasicUsage {//implements AfterViewInit {

  constructor (private _cd: ChangeDetectorRef) {  }

  // ngAfterViewInit() {
  //   this.visibilityRule = new Action((toggle) => {
  //       // console.log("toggleFlag", toggle, this.toggleFlag);
  //       // For some reason the parameters are not working as it should.
  //       return this.toggleFlag;
  //     }, [this.toggleFlag] );
  //
  //   // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
  //   this._cd.detectChanges();
  // }

}
