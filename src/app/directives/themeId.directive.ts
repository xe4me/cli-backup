import {Directive, ElementRef, Input, Renderer} from 'angular2/core';

export enum LICENSEE {AMPFP, HILLROSS, CHARTER};


@Directive({
    selector: '[ampLicenseeThemeID]'
})
// Meant for generic theming identity but only have License theme use case at the moment.
export class ThemeIDDirective {
    themeId: LICENSEE = LICENSEE.CHARTER;

    constructor(el: ElementRef, renderer: Renderer) {
      // this.themeId = LICENSEE.HILLROSS;

      // renderer.setElementStyle(el.nativeElement, 'background-color', 'yellow');
      renderer.setElementClass(el.nativeElement, LICENSEE[this.themeId], true);
      // Do not directly set the style on the nativeElement, use the Renderer for serverside rendering to work (https://github.com/angular/universal).
      //el.nativeElement.style.backgroundColor = 'yellow';
    }
}
