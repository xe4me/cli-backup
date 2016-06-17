import { Directive , OnChanges , ElementRef , Input } from '@angular/core';
// import { AnimationBuilder } from '@angular/core';
// import { CssAnimationBuilder } from '@angular/core';
@Directive( {
    selector : '[slide]'
} )
export class AmpSlideDirective implements OnChanges {
    @Input() duration : number = 600;
    @Input() slide : boolean;
    // private _animation : CssAnimationBuilder;

    constructor ( private _element : ElementRef ) {
        // this._animation = animationBuilder.css();
    }

    ngOnChanges ( changes ) {
        if ( changes.slide ) {
            if ( this.slide ) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    hide () : void {
        // this._animation
        //     .setDuration( this.duration )
        //
        //     .setFromStyles( {
        //         transform : 'translateY(0)' ,
        //         opacity   : '1'
        //     } )
        //     .setToStyles( {
        //         transform : 'translateY(200px)' ,
        //         opacity   : '0'
        //     } )
        //     .start( this._element.nativeElement );
    }

    show () : void {
        // this._animation
        //
        //     .setDuration( this.duration )
        //     .setFromStyles( {
        //         'will-change' : 'transform' ,
        //
        //         transform     : 'translateY(200px)' ,
        //         opacity       : '0'
        //     } )
        //     .setToStyles( {
        //         'will-change' : '' ,
        //
        //         transform     : 'translateY(0)' ,
        //         opacity       : '1'
        //     } )
        //     .start( this._element.nativeElement );
    }
}
