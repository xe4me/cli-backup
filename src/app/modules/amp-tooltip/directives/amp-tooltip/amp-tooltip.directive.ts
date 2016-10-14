import { Directive , Input , ViewContainerRef , ElementRef , ChangeDetectorRef } from '@angular/core';
import {
    Overlay ,
    OverlayState ,
    OverlayModule ,
    OverlayRef ,
    ComponentPortal ,
    OverlayConnectionPosition ,
    OriginConnectionPosition ,
    OVERLAY_PROVIDERS ,
} from '@angular2-material/core';
import { AmpTooltipComponent } from '../../components/amp-tooltip/amp-tooltip.component';
export type TooltipPosition = 'before' | 'after' | 'above' | 'below';
@Directive( {
    selector : '[amp-tooltip]' ,
    host     : {
        '(mouseenter)' : '_handleMouseEnter($event)' ,
        '(mouseleave)' : '_handleMouseLeave($event)' ,
    }
} )
export class AmpTooltipDirective {
    visible : boolean                   = false;
    /** Allows the user to define the position of the tooltip relative to the parent element */
    private _position : TooltipPosition = 'below';
    @Input( 'amp-tooltip-position' ) get position () : TooltipPosition {
        return this._position;
    }

    set position ( value : TooltipPosition ) {
        if ( value !== this._position ) {
            this._position = value;
            this._createOverlay();
            this._updatePosition();
        }
    }

    /** The message to be displayed in the tooltip */
    private _message : string;
    @Input( 'amp-tooltip' ) get message () {
        return this._message;
    }

    set message ( value : string ) {
        this._message = value;
        this._updatePosition();
    }

    private _overlayRef : OverlayRef;

    constructor ( private _overlay : Overlay ,
                  private _elementRef : ElementRef ,
                  private _viewContainerRef : ViewContainerRef ,
                  private _changeDetectionRef : ChangeDetectorRef ) {
    }

    /**
     * Create overlay on init
     * TODO: internal
     */
    ngOnInit () {
        this._createOverlay();
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
                .then( ( promise )=> {
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
                return { originX : 'center' , originY : 'top' };
            case 'below':
                return { originX : 'center' , originY : 'bottom' };
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
                return { overlayX : 'center' , overlayY : 'bottom' };
            case 'below':
                return { overlayX : 'center' , overlayY : 'top' };
        }
    }

    /**
     * Shows the tooltip on mouse enter
     * @param event
     */
    _handleMouseEnter ( event : MouseEvent ) {
        this.show();
    }

    /**
     * Hides the tooltip on mouse leave
     * @param event
     */
    _handleMouseLeave ( event : MouseEvent ) {
        //this.hide();
    }

    /**
     * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
     */
    show () : void {
        if ( ! this.visible && this._overlayRef && ! this._overlayRef.hasAttached() ) {
            this.visible = true;
            let portal   = new ComponentPortal( AmpTooltipComponent , this._viewContainerRef );
            this._overlayRef
                .attach( portal )
                .then( ( tooltipRef )=> {
                    tooltipRef.instance.message = this.message;
                    console.log( 'tooltipRef.instance' , tooltipRef.instance );
                    this._updatePosition();
                } );
        }
    }

    /**
     * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
     */
    hide () : void {
        if ( this.visible && this._overlayRef && this._overlayRef.hasAttached() ) {
            this.visible = false;
            this._overlayRef.detach();
        }
    }

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
     * Updates the tooltip's position
     */
    private _updatePosition () {
        if ( this._overlayRef ) {
            this._changeDetectionRef.detectChanges();
            this._overlayRef.updatePosition();
        }
    }
}