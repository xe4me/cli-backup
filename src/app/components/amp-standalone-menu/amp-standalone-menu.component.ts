import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit , OnDestroy , ChangeDetectionStrategy , OnInit
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ScrollService } from '../../services/scroll/scroll.service';
@Component( {
    selector        : 'amp-standalone-menu' ,
    template        : `
                   <aside class="sidebar">
                        <button class="btn" type="button">
                            <i class="icon icon--time" aria-hidden="true"></i>
                            <span>Save application</span>
                        </button>
                   </aside>
                ` ,

    styles          : [ require( './amp-standalone-menu.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpStandAloneMenuComponent  {
    public control : FormControl       = new FormControl( null );
    public errors                      = {};
    private _selected : string         = null;
    private _disabled : boolean        = false;
    private _required : boolean        = false;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup;

    constructor ( private changeDetector : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private scrollService : ScrollService ) {
    }
}
