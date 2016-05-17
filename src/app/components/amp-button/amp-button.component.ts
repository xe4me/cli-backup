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

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        renderer.setElementAttribute(elementRef.nativeElement, 'class', null);
    }

    ngAfterContentInit() {
        // Note** Do not copy this example, look at @ViewChild/ren or @ContentChild/ren or template equivalent.
        // This is a hack!
        let parentComponentName = this.elementRef.nativeElement.parentElement.localName;
        let contentStr = this.elementRef.nativeElement.innerText;
        this.dataAutomationId = 'btn-' + (contentStr ? contentStr.replace(/\s+/g, '') : '');
        if (parentComponentName) {
            this.dataAutomationId += '_' + parentComponentName;
        }
    }

}
