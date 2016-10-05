import {
    Component ,
    ViewContainerRef ,
    ChangeDetectorRef ,
    Input ,
    ElementRef ,
    AfterViewInit
} from '@angular/core';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
import { FormSectionService } from '../../services/form-section/form-section.service';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
import { AmpReviewItem } from '../../blocks/amp-review/amp-review-item/amp-review-item.component';
import { AmpReviewSection } from '../../blocks/amp-review/amp-review-section/amp-review-section.component';
import { AmpStickyOnScrollDirective } from '../../modules/amp-directives/directives/auto-sticky-on-scroll/amp-sticky-on-scroll.directive';
import { ScrollService } from '../../services/scroll/scroll.service';
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
                        <div [amp-block-loader]="_review_blocks" [fdn]="__fdn" [form]="__form"></div>
                    </div>

                    <div class="grid__item_floated lap-and-up-1/4 review-item__col--padding" [sticky-on-scroll]='shouldStick'>
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
        AmpReviewItem,
        AmpStickyOnScrollDirective
    ]
} )
export class ReviewSectionComponent implements AfterViewInit {

    private _review_blocks;
    private _sticky_blocks;
    private __child_blocks;
    private __form = this.__form;
    private __custom = this.__custom || {};

    private _summaryBlocks = [];

    constructor ( public _viewContainerRef : ViewContainerRef ,
                  public progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef,
                  public _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit() {

        // Filter blocks for review main and sticky columns
        this._review_blocks = Object.assign({}, this.__child_blocks);
        this._sticky_blocks = Object.assign({}, this.__child_blocks);

        this._review_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout !== 'STICKY';
        });

        this._sticky_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout === 'STICKY';
        });
    }

    ngAfterViewInit () {
          this.createBlocksOfFormModel();
    }

    createBlocksOfFormModel () {
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

    showReviewSection () : boolean {
        return true;
    }

    public shouldStick = () : boolean => {
        return this.scrollService.getMyWindowOffset( this.el ) <= 80;
    };
}
