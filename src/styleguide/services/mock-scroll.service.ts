import { Injectable , EventEmitter }     from '@angular/core';
import { MockFormModelService } from './mock-form-mode.service';
@Injectable()
export class MockScrollService {
    public $scrolled : EventEmitter<any>;

    public onScroll () {
        this.$scrolled.emit( 'scrolling' );
    }

    constructor ( private formModelService : MockFormModelService ) {
        this.$scrolled = new EventEmitter();
    }

    public scrollMeOut () {
        return 'You\'re now out of view';
    }

    get scrollTop () : number {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    public amIVisible ( CLASS_NAME : string ) {
        var isInView = true;
        if ( isInView ) {
            this.formModelService.setCurrentBlock( CLASS_NAME );
        }
        return true;
    }

    private smoothScroll ( element , options ) {
        options               = options || {};
        // Options
        var duration          = options.duration || 800 , offset = options.offset || 0 , easing = options.easing || 'easeInOutQuart' , callbackBefore = options.callbackBefore || function() {
            } , callbackAfter = options.callbackAfter || function() {
            } , container     = document.getElementById( options.containerId ) || null , containerPresent = (container !== undefined && container !== null);
        /**
         * Retrieve current location
         */
        var getScrollLocation = function() {
            if ( containerPresent ) {
                return container.scrollTop;
            } else {
                if ( window.pageYOffset ) {
                    return window.pageYOffset;
                } else {
                    return document.documentElement.scrollTop;
                }
            }
        };
        /**
         * Calculate easing pattern.
         *
         * 20150713 edit - zephinzer
         * - changed if-else to switch
         * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
         */
        var getEasingPattern  = function( type , time ) {
            switch ( type ) {
                case 'easeInQuad':
                    return time * time; // accelerating from zero velocity
                case 'easeOutQuad':
                    return time * (2 - time); // decelerating to zero velocity
                case 'easeInOutQuad':
                    return time < 0.5 ? 2 * time * time : - 1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
                case 'easeInCubic':
                    return time * time * time; // accelerating from zero velocity
                case 'easeOutCubic':
                    return (-- time) * time * time + 1; // decelerating to zero velocity
                case 'easeInOutCubic':
                    return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
                case 'easeInQuart':
                    return time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuart':
                    return 1 - (-- time) * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuart':
                    return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (-- time) * time * time * time; // acceleration until halfway, then deceleration
                case 'easeInQuint':
                    return time * time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuint':
                    return 1 + (-- time) * time * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuint':
                    return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (-- time) * time * time * time * time; // acceleration until halfway, then deceleration
                default:
                    return time;
            }
        };
        /**
         * Calculate how far to scroll
         */
        var getEndLocation    = function( element ) {
            var location = 0;
            if ( element.offsetParent ) {
                do {
                    location += element.offsetTop;
                    element = element.offsetParent;
                } while ( element );
            }
            location = Math.max( location - offset , 0 );
            return location;
        };
        // Initialize the whole thing
        setTimeout( function() {
            var currentLocation = null , startLocation = getScrollLocation() , endLocation = getEndLocation( element ) , timeLapsed = 0 , distance = endLocation - startLocation , percentage , position , scrollHeight , internalHeight;
            /**
             * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
             */
            var runAnimation;
            var stopAnimation   = function() {
                currentLocation = getScrollLocation();
                if ( containerPresent ) {
                    scrollHeight   = container.scrollHeight;
                    internalHeight = container.clientHeight + currentLocation;
                } else {
                    scrollHeight   = document.body.scrollHeight;
                    internalHeight = window.innerHeight + currentLocation;
                }
                if ( ( // condition 1
                        position === endLocation
                    ) || ( // condition 2
                        currentLocation === endLocation
                    ) || ( // condition 3
                        internalHeight >= scrollHeight
                    ) ) { // stop
                    clearInterval( runAnimation );
                    callbackAfter( element );
                }
            };
            /**
             * Scroll the page by an increment, and check if it's time to stop
             */
            var animateScroll   = function() {
                timeLapsed += 16;
                percentage = ( timeLapsed / duration );
                percentage = ( percentage > 1 ) ? 1 : percentage;
                position   = startLocation + ( distance * getEasingPattern( easing , percentage ) );
                if ( containerPresent ) {
                    container.scrollTop = position;
                } else {
                    window.scrollTo( 0 , position );
                }
                stopAnimation();
            };
            callbackBefore( element );
            runAnimation = setInterval( animateScroll , 16 );
        } , 0 );
    };

    private  isElementInViewport ( el ) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
}


