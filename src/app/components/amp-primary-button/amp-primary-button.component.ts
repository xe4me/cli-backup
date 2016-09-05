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
import { FormBlock } from '../../blocks/formBlock';
import { ThemeService } from "../../../styleguide/services/theme";
// import * as browser from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

/**
 *
 * amp-primary-button - themed button component
 * Use: Ok, change buttons only.
 *
 * */


@Component( {
    selector        : 'amp-primary-button' ,
    template        : `
    <button
        type='button'
        (click)='click'
        [disabled]='disabled'
        [class]='_class'
        [attr.data-automation-id]='_dataAutomationId'>
        <ng-content></ng-content>
    </button>` ,
    styles          : [ require( './amp-primary-button.component.scss' ).toString() ] ,
    encapsulation   : ViewEncapsulation.Emulated ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )
export class AmpPrimaryButton implements AfterContentInit {
    @Input() click;
    @Input() disabled;
    @Input( 'class' ) _class : string;
    // Provides the ability to override the default/auto generation of the data-automation-id ***DO NOT USE THIS UNLESS ABSOLUTELY NECCESSARY***
    // Normally this is provided via the FormBlock class-interface pattern https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface
    @Input( 'data-automation-id') dataAutomationId : string;
    _dataAutomationId : string;
    domAdatper : BrowserDomAdapter;

    constructor ( private elementRef : ElementRef ,
                  private renderer : Renderer ,
                  @SkipSelf() @Optional() public parent : FormBlock ) {
        renderer.setElementAttribute( elementRef.nativeElement , 'class' , null );
    }

    ngAfterContentInit () {
        this.domAdatper = new BrowserDomAdapter();
        let contentStr  = this.domAdatper.getText( this.elementRef.nativeElement );

        if (!this.dataAutomationId || !this.dataAutomationId.length) {
            this._dataAutomationId = 'btn-' + (contentStr ? contentStr.replace( /\s+/g , '' ) : '');
            if ( this.parent ) {
                this._dataAutomationId += '_' + this.parent.blockType;
            }
        } else {
            this._dataAutomationId = this.dataAutomationId;
        }
    }
}
