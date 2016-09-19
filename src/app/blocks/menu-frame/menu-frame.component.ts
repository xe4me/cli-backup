import {
    Component ,
    ElementRef ,
    ChangeDetectorRef
}from '@angular/core';
import {
    AmpBlockLoaderDirective ,
    AmpButton ,
    FormSectionService ,
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService
} from "amp-ddc-components";
import { FormGroup } from "@angular/forms";
import { StickyProgressHeaderBlockComponent } from "../sticky-progress-header-block/sticky-progress-header-block.component";
@Component( {
    selector    : 'menu-frame' ,
    templateUrl : './menu-frame.component.html' ,
    styles      : [ require( './menu-frame.component.scss' ) ] ,
    directives  : [ StickyProgressHeaderBlockComponent , AmpButton , AmpBlockLoaderDirective ]
} )
export class MenuFrameBlockComponent {
    private calculatedProgress     = 0;
    private stickyAnimatedIntoView = false;
    private dialogIsVisible        = true;
    private __form : FormGroup;
    //private childTitle : string = 'This text is passed to child';
    constructor ( private _el : ElementRef ,
                  private formModelService : FormModelService ,
                  private progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  private _cd : ChangeDetectorRef ) {
        this.progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress( message ) );
    }

    ngAfterViewChecked () : any {
        if ( ! this.stickyAnimatedIntoView ) {
            this.introHasPassed();
        }
        return undefined;
    }

    private introHasPassed () {
        if ( this.formModelService.getFlags( 'introIsDone' ) ) {
            this.stickyAnimatedIntoView = true;
            setTimeout( () => {
                this._el.nativeElement.children[ 0 ].className += ' frame--sticky';
            } , 200 );
        }
    }

    private calculateProgress ( message ) {
        let form = (<any>this.__form.controls).Application;
        if ( form ) {
            if ( form.controls ) {
                let valids : number   = 0;
                let formControlLength = Object.keys( form.controls ).length;
                Object.keys( form.controls ).map( ( value , index ) => {
                    if ( form.controls[ value ].valid ) {
                        valids ++;
                    }
                } );
                this.calculatedProgress = Math.floor( (100 * valids / formControlLength) );
            }
        }
    }
}
