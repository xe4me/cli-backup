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
import { StickyProgressHeaderBlockComponent } from '../../sticky-progress-header-block/sticky-progress-header-block.component';
import { FormModelService } from '../../../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../../../app/services/progress-observer/progress-observer.service';
import { AmpBlockLoaderDirective } from '../../../../amp-block-loader.directive';
import { AmpButton } from '../../../../../app/components/amp-button/amp-button.component';
import { FormSectionService } from '../../../../../app/services/form-section/form-section.service';
import { FormGroup } from '@angular/forms';
@Component( {
    selector   : 'menu-frame' ,
    template   : require( './menu-frame.application.component.html' ) ,
    styles     : [ require( './menu-frame.application.component.scss' ).toString() ] ,
    directives : [ StickyProgressHeaderBlockComponent , AmpButton , AmpBlockLoaderDirective ]
} )
export class MenuFrameApplicationBlockComponent {
    static CLASS_NAME              = 'MenuFrameApplicationBlockComponent';
    private calculatedProgress     = 0;
    private stickyAnimatedIntoView = false;
    private dialogIsVisible        = true;
    private __form : FormGroup;
    private saveResult : string    = null;
    private ajaxError : string     = null;
    // private childTitle : string = 'This text is passed to child';
    constructor ( private _el : ElementRef ,
                  private formModelService : FormModelService ,
                  private progressObserver : ProgressObserverService ,
                  public formSectionService : FormSectionService ,
                  private _cd : ChangeDetectorRef ) {
        this.progressObserver.$progressed.subscribe( ( message ) => this.calculateProgress( message ) );
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
            setTimeout( () => {
                this._el.nativeElement.children[ 0 ].className += ' frame--sticky';
            } , 200 );
        }
    }

    private calculateProgress ( message ) {
        let form = (<any> this.__form.controls).Application.controls.FirstInsuranceDetailsSection;
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

    private isSectionValid ( fullyDistinguishedName : string[] ) : boolean {
        // let sectionControlGroup = this.controlService.getControlGroup( fullyDistinguishedName );
        // return sectionControlGroup && sectionControlGroup.valid;
        return true;
    }

    private isSectionActive ( _fdn : string[] ) : boolean {
        // return this.formSectionService.isCurrentSection( _fdn );
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
