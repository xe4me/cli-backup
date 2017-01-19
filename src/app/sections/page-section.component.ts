import {
    Component,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { ScrollService } from '../services/scroll/scroll.service';
@Component( {
    selector        : 'page-section',
    template        : `
     <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form" (loaded)='onAllLoaded()'></div>
  `,
    host            : {
        '[hidden]'        : 'isHidden',
        '[id]'            : 'getFdnJoined(__fdn)',
        '[class.visited]' : '__controlGroup.touched || isATab',
        '[class.done]'    : '__controlGroup.valid && __controlGroup.touched',
        '[attr.label]'    : '__custom?.label',
        '[tabindex]'      : '"-1"'
    },
    styles          : [ require( './page-section.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PageSectionComponent {
    private __fdn;
    private __controlGroup;
    private __custom;
    private __emitChildLoaded;
    private __name;
    private isHidden : boolean;
    private scrolledSubscribtion;
    private isATab = false;

    constructor ( public vcf : ViewContainerRef,
                  public scrollService : ScrollService,
                  public _cd : ChangeDetectorRef ) {

    }

    ngOnInit () {
        this.isATab   = this.__custom ? this.__custom.isATab : false;
        this.isHidden = this.isATab;
        if ( this.isATab ) {
            this.scrolledSubscribtion =
                this.scrollService.$scrolled.subscribe( ( changes : { section : string, componentSelector : string } ) => {
                    if ( changes && changes.componentSelector ) {
                        this.isHidden = changes.componentSelector.indexOf( this.getFdnJoined( this.__fdn ) ) < 0;
                    }
                } );
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
        if ( this.scrolledSubscribtion ) {
            this.scrolledSubscribtion.unsubscribe();
        }
    }
}
