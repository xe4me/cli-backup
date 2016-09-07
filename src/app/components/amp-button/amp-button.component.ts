import {
    Component ,
    ViewEncapsulation ,
    Input ,
    HostBinding ,
    ChangeDetectionStrategy ,
    ElementRef ,
    Renderer ,
    Host ,
    AfterContentInit ,
    Optional ,
    SkipSelf
} from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Component( {
    selector        : 'amp-button' ,
    template        : `
    <button
        type='button'
        [attr.chevron]='_chevron'
        (click)='click'
        [disabled]='disabled'
        [class]='_class'
        [attr.data-automation-id]='_dataAutomationId'>
        <ng-content></ng-content>
    </button>` ,
    styles          : [ require( './amp-button.component.scss' ).toString() ] ,
    encapsulation   : ViewEncapsulation.Emulated ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )
export class AmpButton implements AfterContentInit {
    @Input( 'chevron' ) _chevron : string;
    @Input() click;
    @Input() disabled;
    @Input( 'class' ) _class : string;
    // Provides the ability to override the default/auto generation of the data-automation-id ***DO NOT USE THIS UNLESS ABSOLUTELY NECCESSARY***
    // Normally this is provided via the FormBlock class-interface pattern https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface
    @Input( 'data-automation-id' ) dataAutomationId : string;
                                   _dataAutomationId : string;
                                   domAdatper : BrowserDomAdapter;
    private parent;

    constructor ( private elementRef : ElementRef ,
                  private renderer : Renderer ) {
        renderer.setElementAttribute( elementRef.nativeElement , 'class' , null );
    }

    ngAfterContentInit () {
        this.domAdatper = new BrowserDomAdapter();
        let contentStr  = this.domAdatper.getText( this.elementRef.nativeElement );
        /*console.log(contentStr);
         console.log(this.elementRef);

         if (this._chevron) {
         switch ( this._chevron ) {
         case'right':
         //this.elementRef.nativeElement.innerText = this.dataAutomationId;
         //console.log("outer");
         //console.log(this.elementRef.nativeElement.innerText);
         break;
         }
         }*/
        if ( ! this.dataAutomationId || ! this.dataAutomationId.length ) {
            this._dataAutomationId = 'btn-' + (contentStr ? contentStr.replace( /\s+/g , '' ) : '');
            if ( this.parent ) {
                this._dataAutomationId += '_' + this.parent.blockType;
            }
        } else {
            this._dataAutomationId = this.dataAutomationId;
        }
    }
}
