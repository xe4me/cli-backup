import { ChangeDetectorRef, Component } from "@angular/core";
import { VerticalSlide } from "../../../../animations/vertical-slide.animation";
export interface SliderAnimateOptions {
    animate? : boolean;
}
@Component( {
    selector   : 'amp-slider',
    host       : {
        '[@slideUp]' : 'slideUp'
    },
    template   : `
            <div  [hidden]='!isActive'>
                <ng-content></ng-content>
            </div>
    `,
    styles     : [ require( './amp-slider.component.scss' ) ],
    animations : [ VerticalSlide( 800 ) ]
} )
export class AmpSliderComponent {
    private slideUp  = 'expanded';
    private isActive = true;

    constructor( private _cd : ChangeDetectorRef ) {

    }

    /**
     * Call this method to move onto the next block
     * In order to call this in your form you need to import the context of this component into your class, for a sample of how to do this, see the styleguide implementation of the amp-slider.
     */
    public slide( options? : SliderAnimateOptions ) : Promise<string> {
        return new Promise( ( resolve, reject ) => {
            if ( options && options.animate === false ) {
                this.isActive = false;
                return resolve();
            }
            this.slideUp = 'collapsed';
            this._cd.markForCheck();
            setTimeout( () => {
                resolve();
            }, 801 );
        } );
    }

}
