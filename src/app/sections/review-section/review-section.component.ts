import {
    Component ,
    ViewContainerRef ,
    ChangeDetectorRef ,
    Input
} from '@angular/core';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
import { FormSectionService } from '../../services/form-section/form-section.service';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
import { AmpReviewItem, AmpReviewSection } from 'amp-ddc-components';
@Component( {
    selector   : 'review-section' ,
    template   : `
    <div class='section' [id]='label' [ngClass]='{"section__hide": !showReviewSection()}'>
        <div class="container">
            <div class="review-wrapper">

                <div class="grid__container 1/1" *ngIf="__custom.reviewSectionTitle">
                    <div class="grid__item_floated lap-and-up-3/4 review-main">
                        <h2 class="heading heading-intro review-heading" [innerHtml]="__custom.reviewSectionTitle"></h2>
                    </div>
                </div>

                <div class="grid__container 1/1">

                    <div class="grid__item_floated lap-and-up-3/4 review-main">

                        <div class="grid__container 1/1 review-item" *ngFor="let block of _summaryBlocks">
                            <div class="grid__item_floated lap-and-up-4/12">
                                <strong>{{ block.formGroup.__prettyName }}</strong>
                            </div>
                            <div class="grid__item_floated lap-and-up-7/12" [innerHTML]="formatControlValue(block.formGroup)"></div>
                            <div class="grid__item_floated lap-and-up-1/12 utils__align--right-lap-and-up">
                                {{ block.name }}
                            </div>
                        </div>

                        <div [amp-block-loader]="_review_blocks" [fdn]="__fdn" [form]="__form"></div>
                    </div>

                    <div class="grid__item_floated lap-and-up-1/4 review-item__col--padding">
                        <div [amp-block-loader]="_sticky_blocks" [fdn]="__fdn" [form]="__form"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  ` ,
    styles   : [ require('./review-section.component.scss') ] ,
    directives : [
        AmpBlockLoaderDirective,
        AmpReviewItem
    ]
} )
export class ReviewSectionComponent {

    private _review_blocks;
    private _sticky_blocks;
    private __child_blocks;
    private __form;

    private __custom = this.__custom || {};

    private _summaryBlocks = [];

    constructor ( public _viewContainerRef : ViewContainerRef ,
                  public progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  private formModelService : FormModelService ,
                  public _cd : ChangeDetectorRef ) {
    }

    ngOnInit() {

        // Filter blocks for review main and sticky columns
        this._review_blocks = Object.assign({}, this.__child_blocks);
        this._sticky_blocks = Object.assign({}, this.__child_blocks);

        this._review_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout !== 'STICKY';
        });

        this._sticky_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout === 'STICKY';
        });

        this.createBlocksOfFormModel();
    }

    createBlocksOfFormModel (){
        this._summaryBlocks = [];
        let ctrls = this.__form.controls.Application.controls.PageSection.controls;

        for (let key in ctrls) {
            if (ctrls.hasOwnProperty(key)) {
                this._summaryBlocks.push({
                    name: key,
                    formGroup: ctrls[key]
                });
            }
        }
    }
}
