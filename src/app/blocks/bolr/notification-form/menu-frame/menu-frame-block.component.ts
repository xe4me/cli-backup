import { Component , AfterViewChecked , ElementRef, animate, state, style, transition, trigger } from '@angular/core';
import { FormBlock , provideParent } from '../../../formBlock';
import { StickyProgressHeaderBlockComponent } from '../sticky-progress-header-block/sticky-progress-header-block.component';
import { FormModelService, ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
import { AmpCollapseDirective } from '../../../../directives/animations/collapse/amp-collapse.directive';
@Component( {
    selector   : 'menu-frame' ,
    template   : `
        <div @openClose='!dialogIsVisible ? "collapsed" : "expanded"' class='frame'>
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
                        <!--<div class='menu&#45;&#45;left&#45;&#45;hr hr&#45;&#45;solid'></div>-->
                        <!--<div class='menu&#45;&#45;left&#45;&#45;download'><span class='icon icon&#45;&#45;acrobat'></span>Download a copy</div>-->
                        <!--<div class='menu&#45;&#45;left&#45;&#45;download'><span class='icon icon&#45;&#45;time'></span>  {{ formModelService.currentComponent}}</div>-->
                       <!--<amp-button (click)='updateLicensee("DEA_HILLROSS")'>DEA_HILLROSS</amp-button>-->
                        <!--<amp-button (click)='updateLicensee("DEA_AMPFP")'>DEA_AMPFP</amp-button>-->
                        <!--<amp-button (click)='updateLicensee("DEA_CHARTER")'>DEA_CHARTER</amp-button>-->
                    </div>
                    <div id='scroll-root' class='menu--right bolr-right-padding utils__position--rel'>
                        <!-- Dynamic form blocks driven from the Form Definition -->
                        <div [attr.id]='blocksAnchorId'></div>
                        <div id="MenuFrameBlockComponent_blocks"></div>
                    </div>

                </div>
            </div>
        </div>
    ` ,
    styles     : [ require( './menu-frame-block.component.scss' ).toString() ] ,
    directives : [ AmpCollapseDirective , StickyProgressHeaderBlockComponent , AmpButton ] ,
    providers  : [ provideParent( MenuFrameBlockComponent ) ],
    animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({height: '0px', opacity: '0'})),
        state('expanded', style({height: '*', opacity: '1', overflow: 'hidden'})),
        transition(
            'collapsed <=> expanded', [animate(500, style({height: '250px'})), animate(500)])
      ])]
} )
export class MenuFrameBlockComponent extends FormBlock implements AfterViewChecked, FormBlock {
    static CLASS_NAME              = 'MenuFrameBlockComponent';
    private calculatedProgress     = 0;
    private stickyAnimatedIntoView = false;
    private dialogIsVisible        = true;

    constructor ( private progressObserver : ProgressObserverService ,
                  private _el : ElementRef ,
                  private formModelService : FormModelService ) {
        super();
        this.formControlGroupName = 'dialog';
        progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress() );
    }

    ngOnInit () : any {
        let visibleFlag = this.getMyVisibleFlagString();
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( visibleFlag ) ) {
                this.dialogIsVisible = changes[ visibleFlag ];
                this.formModelService.$flags.unsubscribe();
            }
        } );
        return undefined;
    }

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
