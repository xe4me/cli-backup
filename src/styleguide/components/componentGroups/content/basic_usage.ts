import {View, Component, AfterViewInit, ChangeDetectorRef} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {ContentBlock} from '../../../../app/blocks/ContentBlock';

console.log("ContentBlock file is loaded and intepreted");


@Component({selector: 'content-block-basic-usage'})
@View({
  templateUrl: 'src/styleguide/components/componentGroups/content/basic_usage.html',
  styles: [require('./basic_usage.scss')],
  directives: [ContentBlock]
})
export default class ContentBlockBasicUsage {//implements AfterViewInit {

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
