import {
    Component ,
    EventEmitter ,
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit ,
    OnDestroy ,
    ChangeDetectionStrategy ,
    OnInit,
    AfterViewChecked
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ScrollService } from '../../../../services/scroll/scroll.service.ts';
import { FormSectionService } from '../../../../services/form-section/form-section.service';
@Component( {
    selector        : 'amp-standalone-menu' ,
    template        : require( './amp-standalone-menu.component.html' ).toString(),
    styles          : [ require( './amp-standalone-menu.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpStandAloneMenuComponent implements OnInit, AfterViewChecked {


    public control : FormControl       = new FormControl( null );
    public errors                      = {};
    private _selected : string         = null;
    private _disabled : boolean        = false;
    private _required : boolean        = false;
    private isInSummaryState : boolean = false;
    private controlGroup : FormGroup;


    constructor ( private _cd : ChangeDetectorRef ,
                  private elem : ElementRef ,
                  private formSectionService : FormSectionService,
                  private scrollService : ScrollService ) {
    }

    private  sections;

    public displaySection ( _section : string[] , _index : number ) {
        this.formSectionService.setCurrentActiveSection( _section , _index );
    }

    ngOnInit () : any {
       this.formSectionService.$onRegisterSection.subscribe( ( _section ) => {
          this.sections = _section.sections;
          this._cd.markForCheck();
       } );
    }

    ngAfterViewChecked():void {

        console.log( "ngAfterViewChecked ", this.sections );
    }
}
