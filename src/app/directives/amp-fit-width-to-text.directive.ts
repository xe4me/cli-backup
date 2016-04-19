import { Directive , ElementRef , Input , Renderer } from 'angular2/core';
;@Directive( {
                 selector : '[fitWidthToText]' ,
                host:{
                    '(blur)' : 'onBlur()'
                }
             } ) // Meant for generic theming identity but only have License theme use case at the moment.
export class AmpFitWidthToText {
    constructor( private el : ElementRef , private renderer : Renderer ) {

        // renderer.listen( el.nativeElement , 'blur' , ()=> {
        // } );
        //
    }

    private onBlur() {
        let width = ((this.el.nativeElement.value.length + 1) * 8) + 20+'px';
        console.log( 'width' , width );
        this.renderer.setElementStyle( this.el.nativeElement , 'width' , width );
    }
}
