import {
    Component ,
    ViewContainerRef ,
    ChangeDetectorRef
} from '@angular/core';
import { AmpBlockLoaderDirective } from "../amp-block-loader.directive";
import { FormSectionService } from "../services/form-section/form-section.service";
import { FormModelService } from "../services/form-model/form-model.service";
import { ProgressObserverService } from "../services/progress-observer/progress-observer.service";
@Component( {
    selector   : 'page-section' ,
    template   : `
    <div class='section' [id]='label' [ngClass]='{"section__hide": !isCurrentSection()}'>
         <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form"></div>
    </div>
  ` ,
    styles     : [
        `
    .section {
      border: 0px solid black;
    }
    .section__hide {
      display: none;
    }
  `
    ] ,
    directives : [ AmpBlockLoaderDirective ]
    // encapsulation: ViewEncapsulation.Emulated
} )
export class PageSectionComponent {
    public CLASS_NAME = 'PageSectionComponent';

    constructor ( public _viewContainerRef : ViewContainerRef ,
                  public progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  public formModelService : FormModelService ,
                  public _cd : ChangeDetectorRef ) {

        // this.formModelService.dynamicFormLoaded.subscribe((isLoaded) => {
        //     this._cd.detectChanges();
        // });
    }

    isCurrentSection () : boolean {
        //return this.formSectionService.currentSection === this.fullyDistinguishedName;
        //return this.formSectionService.isCurrentSection( this.__fdn );
        return true;
    }
}
