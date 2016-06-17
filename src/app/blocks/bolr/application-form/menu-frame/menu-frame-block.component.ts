import { Component , AfterViewChecked , ElementRef } from '@angular/core';
import { FormBlock, provideParent } from '../../../formBlock';
import { StickyProgressHeaderBlockComponent } from '../../../../../../src/app/blocks/bolr/application-form/sticky-progress-header-block/sticky-progress-header-block.component';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
@Component( {
    selector   : 'menu-frame' ,
    template   : `
        <div class='frame'>
             <sticky-progress-header-block
                    class='sticky-progressbar'
                    determinate='determinate'
                    [value]='calculatedProgress'>
             </sticky-progress-header-block>
             <div class='hr--solid frame__divider'></div>
             <div class='content'>
                 <div class='menu grid__item '>
                    <div class='menu--left'>
                        <div class='menu--left--title'>Your request details</div>
                    </div>
                    <div id='scroll-root' class='menu--right bolr-right-padding utils__position--rel'>
                        <!-- Dynamic form blocks driven from the Form Definition -->
                        <div #nestedBlock></div>
                    </div>

                </div>
            </div>
        </div>
    ` ,
    styles     : [ require( './menu-frame-block.component.scss' ).toString() ] ,
    directives : [ StickyProgressHeaderBlockComponent , AmpButton ],
    providers  : [ provideParent( MenuFrameBlockComponent ) ]
} )
export class MenuFrameBlockComponent extends FormBlock implements AfterViewChecked, FormBlock {
    static CLASS_NAME              = 'MenuFrameBlockComponent';
    private calculatedProgress     = 0;
    private formControlLength : number;
    private stickyAnimatedIntoView = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private _el : ElementRef ,
                  private formModelService : FormModelService ) {
        super();
        progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress() );
    }

    ngAfterViewChecked () : any {
        if ( ! this.stickyAnimatedIntoView ) {
            this.introHasPassed();
        }
        return undefined;
    }

    preBindControls ( _formBlockDef : any ) : void {
    }

    private introHasPassed () {
        if ( this.formModelService.getFlags( 'introIsDone' ) ) {
            this.stickyAnimatedIntoView = true;
            TimerWrapper.setTimeout( () => {
                this._el.nativeElement.children[ 0 ].className += ' frame--sticky';
            } , 1200 );
        }
    }

    private calculateProgress () {
        if ( this.formModel ) {
            var that = this;
            if ( that.formModel.controls ) {
                let valids : number   = 0;
                let formControlLength = Object.keys( that.formModel.controls ).length;
                Object.keys( that.formModel.controls ).map( function( value , index ) {
                    if ( that.formModel.controls[ value ].valid ) {
                        valids ++;
                    }
                } );
                that.calculatedProgress = Math.floor( (100 * valids / formControlLength) );
            }
        }
    }
}
