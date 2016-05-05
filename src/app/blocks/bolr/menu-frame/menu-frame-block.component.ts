import { Component , AfterViewChecked , ElementRef } from 'angular2/core';
import { FormBlock } from '../../formBlock';
import { StickyProgressHeaderBlockComponent } from '../../../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from 'angular2/src/facade/async';
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
                        <div class='menu--left--hr hr--solid'></div>
                        <div class='menu--left--download'><span class='icon icon--acrobat'></span>  Download a copy</div>
                        <!--<div class='menu&#45;&#45;left&#45;&#45;download'><span class='icon icon&#45;&#45;time'></span>  {{ formModelService.currentComponent}}</div>-->
                        <!--<button (click)='updateLicensee("LIC_HILLROSS")'>LIC_HILLROSS</button>-->
                        <!--<button (click)='updateLicensee("LIC_AMPFP")'>LIC_AMPFP</button>-->
                        <!--<button (click)='updateLicensee("LIC_CHARTER")'>LIC_CHARTER</button>-->
                    </div>
                    <div class='menu--right bolr-right-padding utils__position--rel'>
                        <!-- Dynamic form blocks driven from the Form Definition -->
                        <div #nestedBlock></div>
                    </div>
                    
                </div>
            </div>
        </div>
    ` ,
    styles     : [ require( './menu-frame-block.component.scss' ).toString() ] ,
    directives : [ StickyProgressHeaderBlockComponent ]
} )
export class MenuFrameBlockComponent extends FormBlock implements AfterViewChecked {
    static CLASS_NAME              = 'MenuFrameBlockComponent';
    private calculatedProgress     = 0;
    private formControlLength : number;
    private stickyAnimatedIntoView = false;

    ngAfterViewChecked () : any {
        if ( ! this.stickyAnimatedIntoView ) {
            this.introHasPassed();
        }
        return undefined;
    }

    preBindControls ( _formBlockDef : any ) : void {
    }

    private updateLicensee ( l ) {
        this.formModelService.model.context.licensee = l;
    }

    private introHasPassed () {
        if ( this.formModelService.getFlags('introIsDone') ) {
            this.stickyAnimatedIntoView = true;
            var that                    = this;
            TimerWrapper.setTimeout( function() {
                that._el.nativeElement.children[ 0 ].className += ' frame--sticky';
            } , 1200 );
        }
    }

    private calculateProgress () {
        if ( this.formModel ) {
            var that = this;
            if ( that.formModel.controls ) {
                let valids : number = 0;
                console.log( 'valids' , valids );
                console.log( 'that.formModel' , that.formModel );
                let formControlLength = Object.keys( that.formModel.controls ).length;
                console.log( 'formControlLength' , formControlLength );
                Object.keys( that.formModel.controls ).map( function( value , index ) {
                    console.log( 'IsHidden' , that.formModel.controls[ value ].getError( 'isHidden' ) );
                    if ( that.formModel.controls[ value ].valid || that.formModel.controls[ value ].getError( 'isHidden' ) === true ) {
                        valids ++;
                        console.log( 'updated valids' , valids );
                        console.log( 'updated value' , value );
                    }
                } );
                that.calculatedProgress = Math.floor( (100 * valids / formControlLength) );
            }
        }
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private _el : ElementRef ,
                  private formModelService : FormModelService ) {
        super();
        progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress() );
    }
}
