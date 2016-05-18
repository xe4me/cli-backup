import {
  Component,
  ViewEncapsulation,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer,
  Host,
  AfterContentInit,
} from 'angular2/core';
import * as browser from 'angular2/platform/browser';

@Component({
  selector: 'amp-button',
  template: `
    <button
        (click)='click'
        [disabled]='disabled'
        [class]='_class'
        [attr.data-automation-id]='dataAutomationId'>
        <ng-content></ng-content>
    </button>`,
  styles     : [ require( './amp-button.component.scss' ).toString() ] ,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmpButton implements AfterContentInit {
    @Input() click;
    @Input() disabled;
    @Input('class') _class: string;
    dataAutomationId: string;
    domAdatper: browser.BrowserDomAdapter;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        renderer.setElementAttribute(elementRef.nativeElement, 'class', null);
        this.domAdatper = new browser.BrowserDomAdapter();
    }

    ngAfterContentInit() {
        let parentComponentName = this.domAdatper.parentElement(this.elementRef.nativeElement).localName;
        let contentStr = this.domAdatper.getText(this.elementRef.nativeElement);
        this.dataAutomationId = 'btn-' + (contentStr ? contentStr.replace(/\s+/g, '') : '');
        if (parentComponentName) {
            this.dataAutomationId += '_' + parentComponentName;
        }
    }

}
