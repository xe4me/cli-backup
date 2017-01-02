import { Component , ViewContainerRef , ChangeDetectorRef , ElementRef , OnInit } from '@angular/core';
import { FormSectionService } from '../../services/form-section/form-section.service';
import { FormModelService } from '../../services/form-model/form-model.service';
import { ProgressObserverService } from '../../services/progress-observer/progress-observer.service';
import { ScrollService } from '../../services/scroll/scroll.service';
@Component( {
    selector   : 'review-section' ,
    template   : `
    <div id='Application-ReviewSection-block' data-section='ReviewSection'>
        <div class='section' *ngIf="createReviewSection" [hidden]="hideReviewSection">
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
    </div>  
 ` ,
    styles   : [ require('./review-section.component.scss') ]
} )
export class ReviewSectionComponent implements OnInit {

    private hideReviewSection : boolean = false;
    private createReviewSection : boolean = false;
    private _review_blocks;
    private _sticky_blocks;
    private __child_blocks;
    private __form = this.__form;
    private __fdn = this.__fdn;
    private __custom = this.__custom || {};

    constructor ( public _viewContainerRef : ViewContainerRef ,
                  public progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef,
                  public _cd : ChangeDetectorRef ) {
    }

    ngOnInit() {
        this.scrollService.$scrolling.subscribe((event) => {
            if (event.componentSelector === this.__fdn.join('')) {
                this.hideReviewSection = false;
                this.createReviewSection = true;
                this._cd.markForCheck();
            }
        });

        this.scrollService.$scrolled.subscribe((event) => {
            let block = event.componentSelector || '';
            this.hideReviewSection = block.indexOf(this.__fdn.join('-')) === -1;
            this._cd.markForCheck();
        });

        // Filter blocks for review main and sticky columns.
        this._review_blocks = Object.assign({}, this.__child_blocks);
        this._sticky_blocks = Object.assign({}, this.__child_blocks);

        this._review_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout !== 'STICKY';
        });

        this._sticky_blocks.blocks = this.__child_blocks.blocks.filter((block) => {
            return block.blockLayout === 'STICKY';
        });
    }

    public shouldStick = () : boolean => {
        return this.scrollService.getMyWindowOffset( this.el ) <= 80;
    }
}
