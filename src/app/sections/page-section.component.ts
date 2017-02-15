import {
    Component,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { ScrollService } from '../services/scroll/scroll.service';
import { BlockLoaderAbstracts } from '../abstracts';
@Component( {
    selector        : 'page-section',
    template        : `
     <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form" [repeaterIndex]="__repeaterIndex" (loaded)='onAllLoaded()'></div>
  `,
    host            : {
        '[hidden]'        : 'isHidden',
        '[id]'            : 'getFdnJoined(__fdn)',
        '[class.visited]' : '__controlGroup.touched || isATab',
        '[class.done]'    : '__controlGroup.valid && __controlGroup.touched',
        '[class.valid]'   : '__controlGroup.valid',
        '[attr.label]'    : '__custom?.label',
        '[attr.tab]'      : 'isATab',
        '[tabindex]'      : '"-1"'
    },
    styles          : [ require( './page-section.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PageSectionComponent extends BlockLoaderAbstracts {

    public isHidden : boolean;
    public scrolledSubscription;
    public isATab = false;
    public sectionReveal = false;

    constructor( public vcf : ViewContainerRef,
                 public scrollService : ScrollService,
                 public _cd : ChangeDetectorRef ) {
        super();
    }

    ngOnInit () {
        this.__custom = this.__custom || {};
        this.isATab   = this.__custom.isATab;
        this.sectionReveal   = this.__custom.sectionReveal;
        this.isHidden = this.isATab || this.sectionReveal;

        if ( this.isATab ) {
            this.scrolledSubscription =
                this.scrollService.$scrolled.subscribe( ( changes : { section : string, componentSelector : string } ) => {
                    if ( changes && changes.componentSelector ) {
                        this.isHidden = !this.isBlockInCurrentSection( changes );
                    }
                } );
        }

        if ( this.sectionReveal ) {
            if ( this.__isRetrieved ) {
                this.isHidden = false;
            } else {
                this.scrolledSubscription = this.scrollService.$scrolling.subscribe(( changes ) => {
                    if (changes &&
                        changes.componentSelector &&
                        this.isBlockInCurrentSection( changes ) &&
                        this.isHidden) {

                        this.isHidden = false;
                        this._cd.markForCheck();

                        this.scrollService.stopAnimation()
                            .then(() => {
                                this.scrolledSubscription.unsubscribe();
                                this.scrollService.scrollToNextUndoneBlock(this.__form);
                            });
                    }
                });
            }
        }

        this.updateLabel();
    }

    isBlockInCurrentSection ( changes ) {
        return changes.componentSelector.indexOf( this.getFdnJoined( this.__fdn ) ) > -1;
    }

    updateLabel () {
        if ( this.__custom && this.__custom.updateLabel ) {
            this.__custom.updateLabel.call( this );
        }
    }

    onAllLoaded () {
        this.__emitChildLoaded( {
            fdn  : this.__fdn,
            name : this.__name
        } );
    }

    getFdnJoined ( _fdn ) {
        return _fdn ? _fdn.join( '-' ) : '';
    }

    ngOnDestroy () {
        if ( this.scrolledSubscription ) {
            this.scrolledSubscription.unsubscribe();
        }
    }
}
