import {
    Component ,
    ViewContainerRef ,
    ChangeDetectorRef ,
    Input ,
    ElementRef ,
    OnInit
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
    <div id='Application-ReviewSection-block'>
        <div class='section' *ngIf="reviewSectionVisible">
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
    styles   : [ require('./review-section.component.scss') ] ,
    directives : [
        AmpBlockLoaderDirective,
        AmpReviewItem,
        AmpStickyOnScrollDirective
    ]
} )
export class ReviewSectionComponent implements OnInit {

    private reviewSectionVisible = false;
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
        this.scrollService.$scrolled.subscribe((_fdnString) => {
             this.reviewSectionVisible = _fdnString === this.__fdn.join('-') + '-block';
        });

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

    showReviewSection () : boolean {
        return true;
    }

    public shouldStick = () : boolean => {
        return this.scrollService.getMyWindowOffset( this.el ) <= 80;
    };
}
