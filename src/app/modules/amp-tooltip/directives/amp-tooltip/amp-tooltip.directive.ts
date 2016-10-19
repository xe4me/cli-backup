import { Directive , Input , ViewContainerRef , ElementRef , ChangeDetectorRef } from '@angular/core';
import {
    Overlay ,
    OverlayState ,
    OverlayRef ,
    ComponentPortal ,
    OriginConnectionPosition ,
    OverlayConnectionPosition
} from '@angular2-material/core';
import { AmpTooltipTemplateComponent } from '../../components/amp-tooltip/amp-tooltip.component';
import { ConnectedPositionStrategy } from '@angular2-material/core/overlay/position/connected-position-strategy';
import { applyCssTransform } from '@angular2-material/core/style/apply-transform';
import { applyCss } from '../../../amp-utils/functions.utils';
(<any> ConnectedPositionStrategy).prototype._setElementPosition = function( element , overlayPoint ) {
    let offsetForMargin    = 40;
    let offsetForUx        = offsetForMargin + 12;
    let elementRec         = element.getBoundingClientRect();
    let elementWidth       = elementRec.width;
    let scrollPos          = this._viewportRuler.getViewportScrollPosition();
    let viewportRect       = this._viewportRuler.getViewportRect();
    let overlayOriginRight = viewportRect.width - overlayPoint.x;
    let overlayOriginLeft  = overlayPoint.x;
    let y                  = overlayPoint.y + scrollPos.top - 5;
    // if there is no room right
    if ( elementWidth >= overlayOriginRight ) {
        if ( elementWidth >= overlayOriginLeft ) {// if there is NOT enough room in left
            putInCenterX( y );
        } else {
            // if there is enough room in left
            putInLeft( overlayOriginLeft - elementWidth + offsetForUx , y );
        }
    } else {
        let transofrm = overlayOriginLeft + scrollPos.left;
        // check if there is room in left for uxOfsset other wise no uxoffset but we still need to get rid of margin
        if ( overlayOriginLeft > offsetForUx ) {
            transofrm = transofrm - offsetForUx;
        } else {
            transofrm = transofrm - offsetForMargin;
        }
        putInOriginalPos( transofrm , y );
    }
    function putInCenterX ( transformY ) {
        applyCssTransform( element , 'translateX(-50%) translateY(' + transformY + 'px)' );
        applyCss( 'left' , element , '50%' );
    }

    function putInOriginalPos ( transformX , transformY ) {
        applyCssTransform( element , 'translateX(' + transformX + 'px) translateY(' + transformY + 'px)' );
        applyCss( 'left' , element , 'initial' );
    }

    function putInLeft ( transformX , transformY ) {
        applyCssTransform( element , 'translateX(' + (transformX) + 'px) translateY(' + transformY + 'px)' );
        applyCss( 'left' , element , 'initial' );
    }
};
export type TooltipPosition = 'before' | 'after' | 'above' | 'below';
@Directive( {
    selector : '[amp-tooltip-dir]' ,
    host     : {
        // '(mouseenter)' : '_handleMouseEnter($event)' ,
        // '(mouseleave)' : '_handleMouseLeave($event)' ,
        '(click)'                      : '_handleClick($event)' ,
        '(touch)'                      : '_handleClick($event)' ,
        '[class.amp-tooltip-up-arrow]' : 'visible' ,
    } ,
    exportAs : 'tooltip'
} )
export class AmpTooltipDirective {
    @Input( 'extraClasses' ) extraClasses = '';
    @Input( 'autoHideDelay' ) autoHideDelay;

    @Input( 'amp-tooltip-dir' ) get message () {
        return this._message;
    }

    public visible : boolean            = false;
    private _position : TooltipPosition = 'above';
    private _message : string;
    private _overlayRef : OverlayRef;
    private autoHideDelatTimeoutRef;

    constructor ( private _overlay : Overlay ,
                  private _elementRef : ElementRef ,
                  private _viewContainerRef : ViewContainerRef ,
                  private _changeDetectionRef : ChangeDetectorRef ) {
    }

    get position () : TooltipPosition {
        return this._position;
    }

    set position ( value : TooltipPosition ) {
        if ( value !== this._position ) {
            this._position = value;
            this._createOverlay();
            this._updatePosition();
        }
    }

    set message ( value : string ) {
        this._message = value;
        this._updatePosition();
    }

    ngOnInit () {
        this._createOverlay();
    }

    /**
     * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
     */
    show () : void {
        if ( ! this.visible && this._overlayRef && ! this._overlayRef.hasAttached() ) {
            this.visible = true;
            let portal   = new ComponentPortal( AmpTooltipTemplateComponent , this._viewContainerRef );
            this._overlayRef
                .attach( portal )
                .then( ( tooltipRef ) => {
                    tooltipRef.instance.message      = this.message;
                    tooltipRef.instance.hide         = this.hide;
                    tooltipRef.instance.extraClasses = this.extraClasses;
                    tooltipRef.changeDetectorRef.detectChanges();
                    this._updatePosition();
                    if ( this.autoHideDelay ) {
                        clearTimeout( this.autoHideDelatTimeoutRef );
                        this.autoHideDelatTimeoutRef = setTimeout( () => {
                            this.hide();
                        } , this.autoHideDelay );
                    }
                } );
        }
    }

    /**
     * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
     */
    hide = () : Promise<any> => {
        if ( this.visible && this._overlayRef && this._overlayRef.hasAttached() ) {
            this.visible = false;
            return this._overlayRef.detach();
        }
    };

    /**
     * Shows/hides the tooltip and returns a promise that will resolve when it is done
     */
    toggle () : void {
        if ( this.visible ) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Create the overlay config and position strategy
     */
    private _createOverlay () {
        if ( this._overlayRef ) {
            if ( this.visible ) {
                // if visible, hide before destroying
                this.hide();
                this._createOverlay();
            } else {
                // if not visible, dispose and recreate
                this._overlayRef.dispose();
                this._overlayRef = null;
                this._createOverlay();
            }
        } else {
            let origin              = this._getOrigin();
            let position            = this._getOverlayPosition();
            let strategy            = this._overlay.position().connectedTo( this._elementRef , origin , position );
            let config              = new OverlayState();
            config.positionStrategy = strategy;
            this._overlay
                .create( config )
                .then( ( promise ) => {
                    this._overlayRef = promise;
                } );
        }
    }

    /**
     * Returns the origin position based on the user's position preference
     */
    private _getOrigin () : OriginConnectionPosition {
        switch ( this.position ) {
            case 'before':
                return { originX : 'start' , originY : 'center' };
            case 'after':
                return { originX : 'end' , originY : 'center' };
            case 'above':
                return { originX : 'start' , originY : 'top' };
            case 'below':
                return { originX : 'center' , originY : 'bottom' };
            default:
                return { originX : 'start' , originY : 'top' };
        }
    }

    /**
     * Returns the overlay position based on the user's preference
     */
    private _getOverlayPosition () : OverlayConnectionPosition {
        switch ( this.position ) {
            case 'before':
                return { overlayX : 'end' , overlayY : 'center' };
            case 'after':
                return { overlayX : 'start' , overlayY : 'center' };
            case 'above':
                return { overlayX : 'start' , overlayY : 'bottom' };
            case 'below':
                return { overlayX : 'center' , overlayY : 'top' };
            default:
                return { overlayX : 'start' , overlayY : 'bottom' };
        }
    }

    private _updatePosition () {
        if ( this._overlayRef ) {
            this._changeDetectionRef.detectChanges();
            this._overlayRef.updatePosition();
        }
    }

    private _handleMouseEnter ( event : MouseEvent ) {
        this.show();
    }

    private _handleClick = () : void => {
        setTimeout( () => {
            if ( this.visible ) {
                this.hide();
            } else {
                this.show();
            }
        } );
    };

    private _handleMouseLeave ( event : MouseEvent ) {
        this.hide();
    }
}
