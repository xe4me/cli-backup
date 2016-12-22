import { Component, ChangeDetectorRef, ElementRef, Input, ViewChild } from '@angular/core';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { ThemeService } from '../../services/theme';
import { AmpIntroBlockComponent } from 'app/modules/amp-intro-block/components/amp-intro-block/amp-intro-block.component';
@Component( {
    selector : 'intro-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ]
} )

export default class IntroBlockBasicUsage {
    /**
     * import the context from the amp-intro-block
     */
    @ViewChild( 'intro' ) ampIntro : AmpIntroBlockComponent;
    /**
     * Use this property to set custom styles for the block.
     *
     * Set css classes are:
     *
     * branded: dark blue bg
     */

    _style : string = 'branding-bett3r';
    /**
     *
     * Title: Use this to set the title of the block, this sits with the logo and is hidden by default
     *
     */

    _title : string = 'Here is a dynamic title.....';

    /**
     * THIS CODE IS A SAMPLE ONLY
     */
    constructor( private  themeService : ThemeService, private _cd : ChangeDetectorRef,
                 private elementRef : ElementRef ) {
    }

    @Input()
    set style( style : string ) {
        this._style = (style && style.trim()) || '';
    }

    get style() {
        return this._style;
    }

    @Input()
    set title( title : string ) {
        this._title = (title && title.trim()) || '';
    }

    get title() {
        return this._title;
    }

    /**
     * This code is just to set focus on an element and is not for general use.
     */

    autoFocus() {
        setTimeout( () => {
            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
            if ( inputs && inputs.length > 0 ) {
                inputs[ 2 ].focus();
            }
        }, 100 );
    }

    ngAfterViewInit() {
        this.autoFocus();
    }

    /**
     * create a method to trigger the intro blocks' method, then on next inside the FormBlock itself
     */
    private proceed() {
        this.ampIntro.proceed().then( () => {
            alert( 'intro animated ' );
            // this.onNext(); implement form block to call this method
        } );
    }
}
