import {
    Injectable,
    ElementRef,
    Renderer,
    EventEmitter,
    NgZone
} from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
const emptyFunction = () : void => {
};
export interface ScrollOptions {
    mock? : boolean;
    onlyForward? : boolean;
    ignore? : string;
    currentId? : string;
}
@Injectable()
export class ScrollService {
    public $scrolled : EventEmitter<any>;
    public $scrolling : EventEmitter<any>;
    private margin           = 10;
    private lastScrollPosition;
    private _window          = window;
    private _offset : number = 0;
    private runAnimation = [];

    constructor ( private _dom : BrowserDomAdapter,
                  private zone : NgZone,
                  private _renderer : Renderer ) {
        this.$scrolled  = new EventEmitter();
        this.$scrolling = new EventEmitter();
    }

    public getMyScrolTop ( el : ElementRef ) {
        return el.nativeElement.scrollTop;
    }

    public getMyOffsetTop ( el : ElementRef ) {
        return el.nativeElement.offsetTop;
    }

    public getMyWindowOffset ( el : ElementRef ) {
        return this.getMyOffsetTop( el ) - this._window.scrollY;
    }

    // TODO: Find another better way to get all the components available in dome to prevent this direct access
    public scrollToNextUndoneBlock ( formModel, offset = this._offset, options : ScrollOptions = {
        mock        : false,
        onlyForward : false,
        currentId   : null,
        ignore      : null
    } ) {
        let isScrolled        = false;
        let currentIdIsPassed = false;
        let currentIdIsMet    = false;
        let body              = this._dom.query( 'body' );
        let components        = this._dom.querySelectorAll( body, '[id$="-block"]' );
        for ( const component of  components ) {

            // If the block is hidden then don't scroll to it
            const style = window.getComputedStyle(component);
            if ( style.display === 'none') {
                // Element is not visisble
                continue;
            }

            let selectorName       = component.id;
            let _fdnOfSelectorName = selectorName.split( '-' );
            _fdnOfSelectorName.pop();
            if ( options.onlyForward ) {
                if ( !currentIdIsMet ) {
                    currentIdIsMet = options.currentId === selectorName;
                }
                if ( !currentIdIsMet ) {
                    continue;
                } else {
                    if ( !currentIdIsPassed ) {
                        currentIdIsPassed = true;
                        continue;
                    }
                }
            }

            let formGroup = formModel;
            for ( const fdnSelectorName of  _fdnOfSelectorName ) {
                if ( formGroup.controls[ fdnSelectorName ] ) {
                    formGroup = formGroup.controls[ fdnSelectorName ];
                }
            }
            // why do we need  this : > ??? Object.keys( formGroup.value ).length > 0
            if ( !isScrolled &&
                ( formGroup.invalid ||
                    (formGroup.valid &&
                    formGroup.untouched )
                )
            ) {
                this.scrollToComponentSelector( selectorName, 'easeInQuad', offset, options.mock );
                isScrolled = true;
                return null;
            }
        }
        if ( !isScrolled ) {
            this.scrollToLastBlock( components );
        }
        return null;
    }

    public scrollToComponentSelector ( componentSelector : string,
                                       easing : string = 'easeInQuad',
                                       margin : number = this._offset,
                                       mock : boolean = false,
                                       duration : number = 800 ) {

        let sectionName;
        let element = this._dom.query( componentSelector );
        if ( !element ) {
            // **20-June-2016 upgraded Angular RC.2, DCL loadIntoLocation no longer exists, LoadAsRoot does not keep the host element, so look for it in the class.
            element     = this._dom.query( '#' + componentSelector );
            sectionName = this._dom.getAttribute( element, 'data-section' );
        }
        if ( mock ) {
            this.$scrolling.emit( {
                section           : sectionName,
                componentSelector : this.getGroupNameOfSelectorName( componentSelector )
            } );
            setTimeout( () => {
                this.$scrolled.emit( {
                    section : sectionName,
                    componentSelector
                } );
            } );
            return;
        }
        let options = {
            duration,
            easing,
            offset         : margin,
            callbackBefore : () => {
                this.$scrolling.emit( {
                    section           : sectionName,
                    componentSelector : this.getGroupNameOfSelectorName( componentSelector )
                } );
            },
            callbackAfter  : () => {
                // this.$scrolled.emit( this.getGroupNameOfSelectorName( componentSelector ) );
                this.$scrolled.emit( {
                    section : sectionName,
                    componentSelector
                } );
            }
        };
        setTimeout( () => {
            this.smoothScroll( element, options );
        }, 0 );
    }

    public jumpToComponentSelector ( componentSelector ) {
        this.scrollToComponentSelector( componentSelector, 'easeInQuad', this._offset, false, 0 );
    }

    public updateOffset ( _offset : number ) {
        this._offset = _offset;
    }

    public scrollToComponentByClassName ( componentName : string ) {
        let selectorName = this.getSelectorNameOfClassName( componentName );
        this.scrollToComponentSelector( selectorName );
    }

    public scrollToComponentByGroupName ( componentGroupName : string ) {
        let selectorName = this.getSelectorNameOfGroupName( componentGroupName );
        this.scrollToComponentSelector( selectorName );
    }

    public stopAnimation () {
        return new Promise( ( resolve ) => {
            setTimeout( () => {
                this.runAnimation.forEach( clearInterval );
                resolve();
            } );
        });
    }

    public scrollMeOut ( el : ElementRef, easing : string = 'easeInQuad', margin : number = 0 ) {
        let parentElem = el.nativeElement.offsetParent;
        let style      = window.getComputedStyle( parentElem );
        let element    = el.nativeElement;
        let top        = element.offsetTop;
        if ( style.getPropertyValue( 'position' ) && style.getPropertyValue( 'position' ) === 'relative' && parentElem.id !== 'scroll-root' ) {
            top += parentElem.offsetTop;
        }
        let height  = element.offsetHeight;
        let bottom  = top + height + margin;
        let options = {
            duration       : 800,
            easing,
            offset         : -bottom,
            callbackBefore : emptyFunction,
            callbackAfter  : emptyFunction
        };
        setTimeout( () => {
            this.smoothScroll( el, options );
        }, 0 );
    }

    public amIVisible ( el : ElementRef ) {
        if ( this.scrollTop === this.lastScrollPosition ) {
            return;
        }
        let element       = el.nativeElement;
        let elementBottom = element.offsetTop + element.offsetHeight;
        let elementTop    = element.offsetTop;
        let windowTop     = this.scrollTop;
        let windowBottom  = windowTop + this.windowHeight;
        if ( elementBottom === 0 || element.style.opacity === 0 ) {
            return;
        }
        let isInView = ((elementBottom <= windowBottom - this.margin ) && ( elementTop >= windowTop));
        // if ( isInView === false ) {
        //     //Check for both side bleeding
        //     isInView = ((elementBottom >= windowBottom  ) && ( elementTop <= windowTop));
        //     if(isInView===false){
        //         //check for top bleeding
        //         if(elementBottom >= windowBottom){
        //
        //         }
        //         isInView = ((elementBottom >= windowBottom  ) && ( elementTop <= windowTop));
        //     }
        //     if ( isInView === true ) {
        //     }
        // }
        if ( isInView ) {
            this.lastScrollPosition = this.scrollTop;
        }
        return isInView;
    }

    public scrollToZero () {
        this.zone.runOutsideAngular( () => {
            setTimeout( () => {
                window.scrollTo( 0, 0 );
            }, 0 );
        } );
    }

    private scrollToLastBlock ( components ) {
        this.scrollToComponentSelector( components[ components.length - 1 ].id );
    }

    private splitStringByCapital ( str : string ) {
        return str.split( /(?=[A-Z])/ );
    }

    private getSelectorNameOfClassName ( className ) {
        let split = this.splitStringByCapital( className );
        split.pop();
        return split.join( '-' ).toLowerCase();
    }

    private getGroupNameOfSelectorName ( className ) {
        return this.camelCaseAndStripDash( className );
    }

    private getSelectorNameOfGroupName ( className ) {
        let split = this.splitStringByCapital( className );
        return split.join( '-' ).toLowerCase();
    }

    /*
     *   NOTE:
     *   Make sure to fix bellow code , I don't know what's the best way of getting
     *   document.documentElement.scrollTop;yet
     * */
    get scrollTop () : number {
        return this._window.pageYOffset || document.documentElement.scrollTop;
    }

    get windowHeight () : number {
        return this._window.innerHeight;
    }

    get documentHeight () : number {
        return this._dom.query( 'body' ).innerHeight;
    }

    private smoothScroll ( element, options ) {
        options               = options || {};
        let classInstance     = this;
        // Options
        let duration          = isNaN(options.duration) ? 800 : options.duration;
        let offset            = options.offset || 0;
        let easing : string   = options.easing;
        let callbackBefore    = options.callbackBefore || emptyFunction;
        let callbackAfter     = options.callbackAfter || emptyFunction;
        let container         = options.containerId ? classInstance._dom.query( '#' + options.containerId ) : null;
        let containerPresent  = (container !== undefined && container !== null);
        /**
         * Retrieve current location
         */
        let getScrollLocation = () => {
            if ( containerPresent ) {
                return container.scrollTop;
            } else {
                return classInstance.scrollTop;
            }
        };
        /**
         * Calculate easing pattern.
         *
         * 20150713 edit - zephinzer
         * - changed if-else to switch
         * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
         */
        let getEasingPattern  = ( type, time ) => {
            switch ( type ) {
                case 'easeInQuad':
                    return time * time; // accelerating from zero velocity
                case 'easeOutQuad':
                    return time * (2 - time); // decelerating to zero velocity
                case 'easeInOutQuad':
                    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
                case 'easeInCubic':
                    return time * time * time; // accelerating from zero velocity
                case 'easeOutCubic':
                    return (--time) * time * time + 1; // decelerating to zero velocity
                case 'easeInOutCubic':
                    return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
                case 'easeInQuart':
                    return time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuart':
                    return 1 - (--time) * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuart':
                    return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
                case 'easeInQuint':
                    return time * time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuint':
                    return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuint':
                    return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
                default:
                    return time;
            }
        };
        /**
         * Calculate how far to scroll
         */
        let getEndLocation    = ( elemt ) => {
            let location = 0;
            if ( elemt.offsetParent ) {
                do {
                    location += elemt.offsetTop;
                    elemt = elemt.offsetParent;
                } while ( elemt );
            }
            location = Math.max( location - offset, 0 );
            return location;
        };
        // Initialize the whole thing
        setTimeout(
            () => {
                let currentLocation = null;
                let startLocation   = getScrollLocation();
                let endLocation     = getEndLocation( element );
                let timeLapsed      = 0;
                let distance        = endLocation - startLocation;
                let percentage;
                let position;
                let scrollHeight;
                let internalHeight;
                /**
                 * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
                 */
                let stopAnimation   = () => {
                    currentLocation = getScrollLocation();
                    if ( containerPresent ) {
                        scrollHeight   = container.scrollHeight;
                        internalHeight = container.clientHeight + currentLocation;
                    } else {
                        scrollHeight   = classInstance.documentHeight;
                        internalHeight = classInstance.windowHeight + currentLocation;
                    }
                    if (
                        ( // condition 1
                            position === endLocation
                        ) ||
                        ( // condition 2
                            currentLocation === endLocation
                        ) ||
                        ( // condition 3
                            internalHeight >= scrollHeight
                        )
                    ) { // stop
                        this.stopAnimation();
                        callbackAfter( element );
                        setTimeout( () => {
                            window.scrollTo( 0, getEndLocation( element ) );
                        } );
                    }
                };
                /**
                 * Scroll the page by an increment, and check if it's time to stop
                 */
                let animateScroll   = () => {
                    timeLapsed += 16;
                    percentage = ( timeLapsed / duration );
                    percentage = ( percentage > 1 ) ? 1 : percentage;
                    position   = startLocation + ( distance * getEasingPattern( easing, percentage ) );
                    if ( containerPresent ) {
                        container.scrollTop = position;
                    } else {
                        classInstance._window.scrollTo( 0, position );
                    }
                    stopAnimation();
                };
                callbackBefore( element );
                this.runAnimation.push( setInterval ( animateScroll , 16 ) );
            }, 0 );
    };

    private capitalizeFirstLetter ( str : string ) : string {
        return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
    }

    private camelCaseAndStripDash ( str : string ) : string {
        let split = str.split( '-' );
        split.pop();
        let camelCased = split.map( ( value, index ) => {
            return index === 0 ? value : this.capitalizeFirstLetter( value );
        } ).join( '' );
        return camelCased;
    }
}
