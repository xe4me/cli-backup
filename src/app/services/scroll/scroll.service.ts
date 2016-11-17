import { Injectable , ElementRef , Renderer , EventEmitter }     from '@angular/core';
import { FormModelService } from '../form-model/form-model.service';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Injectable()
export class ScrollService {
    public $scrolled : EventEmitter<any>;
    public $scrolling : EventEmitter<any>;
    private margin           = 10;
    private lastScrollPosition;
    private _window          = window;
    private _offset : number = 0;

    constructor ( private _dom : BrowserDomAdapter ,
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
    public scrollToNextUndoneBlock ( formModel , offset = this._offset ) {
        let isScrolled = false;
        let body       = this._dom.query( 'body' );
        let components = this._dom.querySelectorAll( body , '[id$="-block"]' );
        for ( let i = 0 ; i < components.length ; i ++ ) {
            let selectorName       = components[ i ].id;
            let _fdnOfSelectorName = selectorName.split( '-' );
            _fdnOfSelectorName.pop();
            let formGroup = formModel;
            for ( let i = 0 ; i < _fdnOfSelectorName.length ; i ++ ) {
                if ( formGroup.controls[ _fdnOfSelectorName[ i ] ] ) {
                    formGroup = formGroup.controls[ _fdnOfSelectorName[ i ] ];
                }
            }
            if ( ! isScrolled &&
                ( formGroup.invalid ||
                    (formGroup.valid &&
                    formGroup.untouched &&
                    Object.keys( formGroup.value ).length > 0)
                )
            ) {
                this.scrollToComponentSelector( selectorName , 'easeInQuad' , offset );
                isScrolled = true;
                return null;
            }
        }
        if ( ! isScrolled ) {
            this.scrollToLastBlock( components );
        }
        return null;
    }

    public scrollToComponentSelector ( componentSelector : string ,
                                       easing : string = 'easeInQuad' ,
                                       margin : number = this._offset ) {
        let sectionName;
        let element = this._dom.query( componentSelector );
        if ( ! element ) {
            // **20-June-2016 upgraded Angular RC.2, DCL loadIntoLocation no longer exists, LoadAsRoot does not keep the host element, so look for it in the class.
            element     = this._dom.query( '#' + componentSelector );
            sectionName = this._dom.getAttribute( element , 'data-section' );
        }
        let options = {
            duration       : 800 ,
            easing         : easing ,
            offset         : margin ,
            callbackBefore : ( elemt ) => {
                this.$scrolling.emit( { section : sectionName , componentSelector : this.getGroupNameOfSelectorName( componentSelector ) } );
            } ,
            callbackAfter  : ( elemt ) => {
                // this.$scrolled.emit( this.getGroupNameOfSelectorName( componentSelector ) );
                this.$scrolled.emit( { section : sectionName , componentSelector : componentSelector } );
            }
        };
        setTimeout( () => {
            this.smoothScroll( element , options );
        } , 0 );
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

    public scrollMeOut ( el : ElementRef , easing : string = 'easeInQuad' , margin : number = 0 ) {
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
            duration       : 800 ,
            easing         : easing ,
            offset         : - bottom ,
            callbackBefore : function( elemt ) {
            } ,
            callbackAfter  : function( elemt ) {
            }
        };
        setTimeout( () => {
            this.smoothScroll( el , options );
        } , 0 );
    }

    public amIVisible ( el : ElementRef , CLASS_NAME : string ) {
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
            // @TODO: currently bellow line is commented out , because if you uncomment it , any components that is
            // using ScrollService will break in the styleguide. So we need to fix that and then uncomment bellow line
            // this.formModelService.setCurrentBlock( CLASS_NAME );
        }
        return isInView;
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

    private smoothScroll ( element , options ) {
        options               = options || {};
        let classInstance     = this;
        // Options
        let duration          = options.duration || 800;
        let offset            = options.offset || 0;
        let easing : string   = options.easing;
        let callbackBefore    = options.callbackBefore || function() {
            };
        let callbackAfter     = options.callbackAfter || function() {
            };
        let container         = options.containerId ? classInstance._dom.query( '#' + options.containerId ) : null;
        let containerPresent  = (container !== undefined && container !== null);
        /**
         * Retrieve current location
         */
        let getScrollLocation = function() {
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
        let getEasingPattern  = function( type , time ) {
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
        let getEndLocation    = function( elemt ) {
            let location = 0;
            if ( elemt.offsetParent ) {
                do {
                    location += elemt.offsetTop;
                    elemt = elemt.offsetParent;
                } while ( elemt );
            }
            location = Math.max( location - offset , 0 );
            return location;
        };
        // Initialize the whole thing
        setTimeout(
            function() {
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
                let runAnimation;
                let stopAnimation   = function() {
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
                        clearInterval( runAnimation );
                        callbackAfter( element );
                        setTimeout( () => {
                            window.scrollTo( 0 , getEndLocation( element ) );
                        } );
                    }
                };
                /**
                 * Scroll the page by an increment, and check if it's time to stop
                 */
                let animateScroll   = function() {
                    timeLapsed += 16;
                    percentage = ( timeLapsed / duration );
                    percentage = ( percentage > 1 ) ? 1 : percentage;
                    position   = startLocation + ( distance * getEasingPattern( easing , percentage ) );
                    if ( containerPresent ) {
                        container.scrollTop = position;
                    } else {
                        classInstance._window.scrollTo( 0 , position );
                    }
                    stopAnimation();
                };
                callbackBefore( element );
                runAnimation = setInterval( animateScroll , 16 );
            } , 0 );
    };

    private capitalizeFirstLetter ( str : string ) : string {
        return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
    }

    private camelCaseAndStripDash ( str : string ) : string {
        let split = str.split( '-' );
        split.pop();
        let camelCased = split.map( ( value , index ) => {
            return index === 0 ? value : this.capitalizeFirstLetter( value );
        } ).join( '' );
        return camelCased;
    }
}
