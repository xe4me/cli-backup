import {
    Component,
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
        '[id]'            : 'getFdnJoined(__fdn)',
        '[class.visited]' : '__controlGroup.touched',
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

    constructor ( public scrollService : ScrollService,
                  public _cd : ChangeDetectorRef ) {
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
}
