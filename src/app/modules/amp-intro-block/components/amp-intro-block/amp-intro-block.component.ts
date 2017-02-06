import { ChangeDetectorRef, Component } from '@angular/core';
import { VerticalSlide } from '../../../../animations/vertical-slide.animation';
export interface IntroBlockAnimateOptions {
    animate? : boolean;
}
@Component( {
    selector   : 'amp-intro-block',
    host       : {
        '[@slideUp]' : 'slideUp',
        '[hidden]'   : '!isActive'
    },
    template   : `
            <div class='ph+ tablet-and-down-ph'>
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align--left' >
                          <ng-content></ng-content>
                    </div>
                </div>
            </div>
    `,
    styles     : [ require( './amp-intro-block.component.scss' ) ],
    animations : [
        VerticalSlide( 800 )
    ]
} )
export class AmpIntroBlockComponent {
    private slideUp  = 'expanded';
    private isActive = true;

    constructor ( private _cd : ChangeDetectorRef ) {

    }

    /**
     * Call this method to move onto the next block
     *
     * In order to call this in your form you need to import the context of this component into your class, for a sample of how to do this, see the styleguide implementation of the amp-intro-block.
     *
     *
     */
    public proceed ( options? : IntroBlockAnimateOptions ) : Promise<string> {
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
