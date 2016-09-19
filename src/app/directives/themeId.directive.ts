import { Directive , ElementRef , Input , Renderer } from '@angular/core';
import { FormModelService } from '../services/form-model/form-model.service';
// export enum LICENSEE {AMPFP, HILLROSS, CHARTER};
@Directive( {
    selector : '[ampLicenseeThemeID]'
} )
// Meant for generic theming identity but only have License theme use case at the moment.
export class ThemeIDDirective {
    themeId : string;

    constructor ( el : ElementRef , renderer : Renderer , formModelService : FormModelService ) {
        this.themeId = formModelService.getModel().context.licensee;
        // renderer.setElementStyle(el.nativeElement, 'background-color', 'yellow');
        renderer.setElementClass( el.nativeElement , this.themeId , true );
        // Do not directly set the style on the nativeElement, use the Renderer for serverside rendering to work (https://github.com/angular/universal).
        // el.nativeElement.style.backgroundColor = 'yellow';
    }
}
