import { Directive , OnChanges , ElementRef , Input } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';
@Directive( {
    selector : '[slide]'
} )
export class AmpSlideDirective implements OnChanges {
    @Input() duration : number = 600;
    @Input() slide : boolean;
    private _animation : CssAnimationBuilder;

    constructor ( animationBuilder : AnimationBuilder , private _element : ElementRef ) {
        this._animation = animationBuilder.css();
    }

    ngOnChanges ( changes ) {
        if ( changes.slide ) {
            if ( this.slide ) {
                this.hide()
            } else {
                this.show();
            }
        }
    }

    hide () : void {
        this._animation
            .setDuration( this.duration )
            .addClass( 'slide' )
            .setFromStyles( {
                top     : '0px' ,
                opacity : '1'
            } )
            .setToStyles( {
                top     : '100px' ,
                opacity : '0'
            } )
            .start( this._element.nativeElement )
    }

    show () : void {
        this._animation
            .addClass( 'slide' )
            .setDuration( this.duration )
            .setFromStyles( {
                top     : '100px' ,
                opacity : '0'
            } )
            .setToStyles( {
                top     : '0px' ,
                opacity : '1'
            } )
            .start( this._element.nativeElement )
    }
}
