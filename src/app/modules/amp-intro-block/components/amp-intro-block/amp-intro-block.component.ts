import { Component , trigger , state , style , animate , transition } from '@angular/core';
export interface IntroBlockAnimateOptions{
    animate?:boolean
}
@Component( {
    selector   : 'amp-intro-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    template   : `
            <div class='ph+ tablet-and-down-ph' [hidden]='!isActive'>
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align--left' >
                          <ng-content></ng-content>
                    </div>
                </div>
            </div>
    ` ,
    styles     : [ require( './amp-intro-block.component.scss' ) ] ,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( {
                    height           : '0px' ,
                    'min-height'     : '0px' ,
                    opacity          : '0' ,
                    'padding-left'   : '0px' ,
                    'padding-right'  : '0px' ,
                    'padding-bottom' : '0px' ,
                    'padding-top'    : '0px' ,
                    display          : 'none'
                } ) ) ,
                state( 'expanded' , style( {
                    height           : '*' ,
                    'min-height'     : '*' ,
                    opacity          : '1' ,
                    'padding-left'   : '*' ,
                    'padding-right'  : '*' ,
                    'padding-bottom' : '*' ,
                    'padding-top'    : '*' ,
                    display          : 'block'
                } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )
export class AmpIntroBlockComponent {
    private slideUp = 'expanded';
    private isActive = true;
    /**
     * Call this method to move onto the next block
     *
     * In order to call this in your form you need to import the context of this component into your class, for a sample of how to do this, see the styleguide implementation of the amp-intro-block.
     *
     *
     */
    public proceed ( options?:IntroBlockAnimateOptions ) : Promise<string> {
        return new Promise( ( resolve , reject ) => {
            this.slideUp = 'collapsed';
            if( options && options.animate === false ) {
                    this.isActive = false; 
                    return resolve();;   
            }
            setTimeout( () => {
                resolve();
            } , 801 );
        } );
    }

}
