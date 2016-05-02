import { Directive , OnChanges , ElementRef , Input } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';
@Directive( {
    selector : '[collapse]' ,
    host     : {
        '[attr.aria-expanded]' : '!collapse' ,
        '[attr.aria-hidden]'   : 'collapse'
    }
} )
export class AmpCollapseDirective implements OnChanges {
    @Input() showDelay : number;
    @Input() hideDelay : number;
    @Input() duration : number = 500;
    @Input() collapse : boolean;
    private _animation : CssAnimationBuilder;

    private get _baseSequence () : CssAnimationBuilder {
        return this._animation
                   .setDuration( this.duration )
                   .removeClass( 'collapse' )
                   .removeClass( 'in' )
                   .removeClass( 'fit' )
                   .addAnimationClass( 'collapsing' );
    }

    constructor ( animationBuilder : AnimationBuilder , private _element : ElementRef ) {
        this._animation                                            = animationBuilder.css();
        this._element.nativeElement.style.transitionTimingFunction = 'ease-in';
    }

    ngOnChanges ( changes ) {
        if ( changes.collapse ) {
            if ( this.collapse ) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    hide () : void {
        this._animation
            .setDuration( 0 )
            .setFromStyles( {
                height : 'initial' ,
            } )
            .setToStyles( {
                height : this._element.nativeElement.scrollHeight + 'px' ,
            } )
            .start( this._element.nativeElement )
            .onComplete( () => {
                this._baseSequence
                    .setDelay( this.hideDelay || 0 )
                    .setFromStyles( {
                        opacity  : '1' ,
                        height   : this._element.nativeElement.scrollHeight + 'px' ,
                        overflow : 'hidden'
                    } )
                    .setToStyles( {
                        opacity : '0' ,
                        height  : '0'
                    } );
                let a = this._animation.start( this._element.nativeElement );
                a.onComplete( () => {
                    a.removeClasses( [ 'in' ] ); // rapid change will leave in
                    a.addClasses( [ 'collapse' ] );
                } );
            } );
    }

    show () : void {
        this._animation
            .setDuration( 0 )
            .addClass( 'in' )

            .start( this._element.nativeElement )
            .onComplete( () => {
                let a = this._baseSequence
                            .setFromStyles( {
                                opacity : '0' ,
                                height  : '0'
                            } )
                            .setDelay( this.showDelay || 0 )
                            .setToStyles( {
                                opacity : '1' ,
                                height  : this._element.nativeElement.scrollHeight + 'px'
                            } )
                            .start( this._element.nativeElement );
                a.onComplete( () => a.addClasses( [ 'collapse' , 'in' , 'fit' ] ) );
            } );
    }

    private get _elementHeight () : number {
        let el     = this._element.nativeElement;
        var height = el.offsetHeight;
        var style  = getComputedStyle( el );
        height += parseInt( style.marginTop ) + parseInt( style.marginBottom );
        return height;
    }
}
