import { Component , ChangeDetectorRef } from '@angular/core';
import { AmpFormBlockComponent } from "../../../app/blocks/amp-form-block/amp-form-block.component";
import { MdInputComponent } from "../../../app/components/my-md-input/my-md-input.component";
import { ThemeService } from "../../services/theme";
import { FormBlock } from "../../../app/form-block";
import {
    Action ,
    UIControlService ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector   : 'sample-experience-block' ,
    template   : `
        <amp-form-block [context]="context">
            <h1 class="heading heading-intro">What's your first name?</h1>
            <!--<my-md-input-->
                    <!--[attr.theme]="themeService.theme.attr"-->
                    <!--[id]="'firstname'"-->
                    <!--[label]="'Name'"-->
                    <!--[parentControl]="firstnameControl"-->
                    <!--[isRequired]="true"-->
                    <!--[valPattern]="'^([0-9])*$'"-->
                    <!--[valMaxLength]="'12'"-->
                    <!--[valMinLength]="'4'"-->
                    <!--[currency]="'$'">-->
            <!--</my-md-input>-->
             <div class='errors mt-25 mb-15' *ngIf="firstnameControl.touched && firstnameControl.errors">
                <div *ngIf="firstnameControl.errors.required">
                    <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                    This field is required.
                </div>
                <div *ngIf="firstnameControl.errors.mdPattern">
                    <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                    This field is not valid.
                </div>
                <div *ngIf="firstnameControl.errors.mdMaxLength">
                    <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                    Error in max length.
                </div>
                <div *ngIf="firstnameControl.errors.mdMinLength">
                    <span class='icon icon--close icon-errors' aria-hidden="true"></span>
                    Error in min length.
                </div>
            </div>

        </amp-form-block>
    ` ,
    directives : [ AmpFormBlockComponent , MdInputComponent ] ,
    providers  : [ ThemeService ]
} )
export class SampleExperienceBlock extends FormBlock {
    constructor ( private themeService : ThemeService ,
                  formModelService : FormModelService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , progressObserver );
    }

    context () {
        return this;
    }
}
