import {
    Component ,
    AfterViewChecked ,
    ElementRef ,
    animate ,
    ViewChild ,
    state ,
    style ,
    transition ,
    trigger ,
    ChangeDetectorRef
} from '@angular/core';
import { ControlGroup } from '@angular/common';
import { StickyProgressHeaderBlockComponent } from '../sticky-progress-header-block/sticky-progress-header-block.component';
import {
    FormModelService ,
    FormSectionService ,
    UIControlService ,
    ProgressObserverService ,
    AmpHttpService
} from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { Router , RouteParams } from '@angular/router-deprecated';
import { AmpBlockLoaderDirective } from "../../../../app/amp-block-loader.directive";
import { AmpButton } from "../../../../app/components/amp-button/amp-button.component";
@Component( {
    selector   : 'menu-frame' ,
    template   : require( './menu-frame.application.component.html' ) ,
    styles     : [ require( './menu-frame.application.component.scss' ).toString() ] ,
    directives : [ StickyProgressHeaderBlockComponent , AmpButton , AmpBlockLoaderDirective ] ,
    animations : [
        trigger(
            'openClose' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , overflow : 'hidden' , display : 'block' } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 200 ) ] )
            ] )
    ]
} )
export class MenuFrameApplicationBlockComponent {
    static CLASS_NAME              = 'MenuFrameApplicationBlockComponent';
    private calculatedProgress     = 0;
    private stickyAnimatedIntoView = false;
    private dialogIsVisible        = true;
    private saveResult : string    = null;
    private ajaxError : string     = null;
    //private childTitle : string = 'This text is passed to child';
    constructor ( private _el : ElementRef ,
                  private formModelService : FormModelService ,
                  private progressObserver : ProgressObserverService ,
                  private router : Router ,
                  private routeParams : RouteParams ,
                  public formSectionService : FormSectionService ,
                  private _cd : ChangeDetectorRef ) {
        this.progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress() );
    }

    ngOnInit () : any {
        this.formSectionService.$onRegisterSection.subscribe( ( _section ) => {
            setTimeout( () => {
                this._cd.detectChanges();
            } );
        } );
    }

    ngAfterViewChecked () : any {
        if ( ! this.stickyAnimatedIntoView ) {
            this.introHasPassed();
        }
        return undefined;
    }

    onApplicationLoaded () {
        if ( this.routeParams.params && this.routeParams.params[ 'section' ] ) {
            let section = parseInt( this.routeParams.params[ 'section' ] ) - 1;
            this.displaySection( this.sections[ section ] , section );
        }
    }

    preBindControls ( _formBlockDef : any ) : void {
    }

    public displaySection ( _section : string[] , _index : number ) {
        this.formSectionService.setCurrentActiveSection( _section , _index );
    }

    get sections () {
        return this.formSectionService.sections;
    }

    private introHasPassed () {
        if ( this.formModelService.getFlags( 'introIsDone' ) ) {
            this.stickyAnimatedIntoView = true;
            TimerWrapper.setTimeout( () => {
                this._el.nativeElement.children[ 0 ].className += ' frame--sticky';
            } , 200 );
        }
    }

    private calculateProgress () {
        //const model = this.controlService.getControlGroup();
        // if ( model ) {
        //     if ( model.controls ) {
        //         let valids : number   = 0;
        //         let formControlLength = Object.keys( model.controls ).length;
        //         Object.keys( model.controls ).map( function( value , index ) {
        //             if ( model.controls[ value ].valid ) {
        //                 valids ++;
        //             }
        //         } );
        //         this.calculatedProgress = Math.floor( (100 * valids / formControlLength) );
        //     }
        // }
    }

    private isSectionValid ( fullyDistinguishedName : string[] ) : boolean {
        //var sectionControlGroup = this.controlService.getControlGroup( fullyDistinguishedName );
        //return sectionControlGroup && sectionControlGroup.valid;
        return true;
    }

    private isSectionActive ( _fdn : string[] ) : boolean {
        //return this.formSectionService.isCurrentSection( _fdn );
        return true;
    }

    private get isApplicationValid () {
        let applicationControlGroupCount = 0;
        let loadedSectionsCount          = this.sections.length;
        // for ( let item in this.controlService.getControlGroup( this._fdn ).controls ) {
        //     applicationControlGroupCount ++;
        // }
        // return applicationControlGroupCount === (loadedSectionsCount) && this.controlService.getControlGroup( this._fdn ).valid;
        return false;
    }

    private isDisabled ( _index : number ) {
        if ( _index === this.sections.length && ! this.isApplicationValid ) {
            return true;
        }
        return false;
    }

    private isSaveDisabled () : boolean {
        return this.formModelService.getFlags( 'isSubmitted' );
    }
}
