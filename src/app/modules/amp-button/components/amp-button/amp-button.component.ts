import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    Renderer,
    AfterViewInit
} from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Component( {
    selector        : 'amp-button',
    template        : `
    <button
        [attr.data-automation-id]='_dataAutomationId'
        type='button'
        [attr.chevron]='_chevron'
        (click)='click'
        [disabled]='disabled'
        [class]='_class'>
        <ng-content></ng-content>
    </button>`,
    styles          : [ require( './amp-button.component.scss' ).toString() ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpButton implements AfterViewInit {
    @Input( 'chevron' ) _chevron : string;
    @Input( 'context' ) context;
    @Input() click;
    @Input() disabled = false;
    @Input( 'class' ) _class : string;
    // Provides the ability to override the default/auto generation of the data-automation-id ***DO NOT USE THIS UNLESS ABSOLUTELY NECCESSARY***
    // Normally this is provided via the FormBlock class-interface pattern https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface
    @Input( 'data-automation-id' ) dataAutomationId : string;
    private _dataAutomationId : string = 'default-btn';
    private domAdatper : BrowserDomAdapter;

    constructor ( private elementRef : ElementRef,
                  private _cd : ChangeDetectorRef,
                  renderer : Renderer ) {
        renderer.setElementAttribute( elementRef.nativeElement, 'class', null );
        this.domAdatper = new BrowserDomAdapter();
    }

    ngAfterViewInit () {
        setTimeout( () => {
            let contentStr = this.domAdatper.getText( this.elementRef.nativeElement );
            if ( contentStr ) {
                contentStr = contentStr.trim();
            }
            if ( !this.dataAutomationId || !this.dataAutomationId.length ) {
                this._dataAutomationId = 'btn-' + (contentStr ? contentStr.replace( /\s+/g, '' ) : '');
                if ( this.context && this.context.__fdn ) {
                    this._dataAutomationId = 'btn-' + this.context.__fdn.join( '-' ) + '-' + contentStr;
                }
            } else {
                this._dataAutomationId = this.dataAutomationId;
            }
            this._cd.markForCheck();
        } );
    }
}
