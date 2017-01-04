import {
    Directive,
    ElementRef,
    Renderer
} from '@angular/core';
import { ContextService } from '../../../../services';

@Directive( {
    selector : '[ampLicenseeThemeID]'
} )
// Meant for generic theming identity but only have License theme use case at the moment.
export class ThemeIDDirective {
    themeId : string;

    constructor ( el : ElementRef, renderer : Renderer, contextService : ContextService ) {
        this.themeId = contextService.context.licensee;
        // renderer.setElementStyle(el.nativeElement, 'background-color', 'yellow');
        renderer.setElementClass( el.nativeElement, this.themeId, true );
        // Do not directly set the style on the nativeElement, use the Renderer for serverside rendering to work (https://github.com/angular/universal).
        // el.nativeElement.style.backgroundColor = 'yellow';
    }
}
