import { Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AmpFormBlockComponent } from "../../../../app/blocks/amp-form-block/amp-form-block.component";
import { ThemeService } from "../../../services/theme";
import { FormBlock } from "../../../../app/form-block";
import { ScrollService } from "../../../../app/services/scroll/scroll.service";
import { FormModelService } from "../../../../app/services/form-model/form-model.service";
import { ProgressObserverService } from "../../../../app/services/progress-observer/progress-observer.service";
import { AmpInputComponent } from "../../../../app/components/amp-input/amp-input.component";
import { AmpFormRowComponent } from "../../../../app/blocks/amp-form-row/amp-form-row.component";
import { AmpCheckboxComponent } from "../../../../app/components/amp-checkbox/amp-checkbox.component";
import { FDN } from "../Application.fdn";
import { FormService } from "../../../../app/services/form/form.service";
@Component( {
    selector        : 'block-with-checkbox' ,
    template        : `
        <amp-form-block [context]="context()" [attr.theme]="themeService.theme.attr" [theme]="themeService.theme.attr">
            <amp-form-row [attr.theme]="themeService.theme.attr">
                <div class="grid__item_floated palm-1/1 tablet-1/1 lap-and-up-1/1 mr+ mt0">
                    <amp-redux [fdn]="__fdn.concat([__custom.controls[0].id])">
                         <amp-checkbox
                                #ampReduxRef
                                [attr.theme]="themeService.theme.attr"
                                [isInSummaryState]='isInSummaryState'
                                [controlGroup]="__controlGroup"
                                [required]='true'
                                [id]='__custom.controls[0].id'>
                                <label class='palm-1/1 tablet-1/1 lap-and-up-1/1 label'>This a label for a checkbox that is really long </label>
                        </amp-checkbox>
                    </amp-redux>
                </div>
            </amp-form-row>
        </amp-form-block>
    ` ,
    directives      : [ AmpFormBlockComponent , AmpCheckboxComponent , AmpFormRowComponent ] ,
    encapsulation   : ViewEncapsulation.Emulated,
    changeDetection : ChangeDetectionStrategy.OnPush,

} )
export class BlockWithCheckbox extends FormBlock {
    private contactControl;

    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  private formService : FormService ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    ngOnInit () : any {
        this.contactControl = this.formService.getControlFromGroup( FDN.samplefieldsblock.concat( [ 'contactNumber' ] ) , this.__form );
        return undefined;
    }

    context () {
        return this;
    }
}
