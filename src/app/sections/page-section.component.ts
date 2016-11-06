import {
    Component ,
    ViewContainerRef ,
    ChangeDetectorRef ,
    ChangeDetectionStrategy
} from '@angular/core';
import { AmpBlockLoaderDirective , LoadedBlockInfo } from '../amp-block-loader.directive';
import { FormSectionService } from '../services/form-section/form-section.service';
import { FormModelService } from '../services/form-model/form-model.service';
import { ProgressObserverService } from '../services/progress-observer/progress-observer.service';
import { ScrollService } from '../services/scroll/scroll.service';
@Component( {
    selector        : 'page-section' ,
    template        : `
    <div class='section'>
         <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form" (loaded)='onAllLoaded()'></div>
    </div>
  ` ,
    host            : {
        '[id]'            : 'getFdnJoined(__fdn)' ,
        '[class.visited]' : '__controlGroup.touched' ,
        '[class.done]'    : '__controlGroup.valid && __controlGroup.touched' ,
        '[attr.label]'    : '__custom?.label' ,
        '[class.active]'  : 'isActive'
    } ,
    styles          : [
        `
    .section {
      border: 0px solid black;
    }
  `
    ] ,
    directives      : [ AmpBlockLoaderDirective ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class PageSectionComponent {
    private isActive = false;
    private __fdn;
    private __controlGroup;
    private __custom;
    private __emitChildLoaded;
    private __name;

    constructor ( public _viewContainerRef : ViewContainerRef ,
                  public progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  public scrollService : ScrollService ,
                  public formModelService : FormModelService ,
                  public _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        /*
         * Looks like the code bellow does not do anything but a markForCheck ?????
         *
         * */
        // this.scrollService.$scrolled.subscribe( ( blockchanges ) => {
        //     if ( blockchanges ) {
        //         let componentSelector = blockchanges.componentSelector;
        //         let fdn               = this.__fdn.join( '-' );
        //         // this.isActive = componentSelector && componentSelector.indexOf(fdn) > -1 ? true : false;
        //         this._cd.markForCheck();
        //     }
        // } );
    }

    onAllLoaded () {
        this.__emitChildLoaded( {
            fdn  : this.__fdn ,
            name : this.__name
        } );
    }

    getFdnJoined ( _fdn ) {
        return _fdn.join( '-' )
    }
}
