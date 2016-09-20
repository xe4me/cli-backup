import { Component , ChangeDetectorRef , ElementRef, Input, ViewChild } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { AmpInputComponent } from '../../../app/components/amp-input/amp-input.component';
import { AmpIntroBlockComponent } from '../../../app/blocks/amp-intro-block/amp-intro-block.component';
import { FormBlock } from '../../../app/form-block';
import { ThemeService } from '../../services/theme';
@Component( {
    selector   : 'intro-block-basic-usage' ,
    directives : [ AmpButton, AmpIntroBlockComponent, AmpInputComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-intro-block/basic_usage.html',
    styles     : [ require( './basic_usage.scss' ).toString() ]
} )

export default class IntroBlockBasicUsage {

    /**
     * import the context from the amp-intro-block
     * */
    @ViewChild(AmpIntroBlockComponent) ampIntro;

    /**
     * THIS CODE IS A SAMPLE ONLY
     * */
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef,  private elementRef : ElementRef ) {
    }

    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {

    }

    /**
     * create a method to trigger the intro blocks' method, then on next inside the FormBlock itself
     * */
    private proceed(){
        this.ampIntro.proceed(); // call the method from the amp-in
        setTimeout( ()=> {
            //this.onNext(); implement form block to call this method
        } , 800 )
    }

    /**
     * Use this property to set custom styles for the block.
     *
     * Set css classes are:
     *
     * branded: dark blue bg
     */

    _style: string = 'branding-bett3r';

    /**
     *
     * Title: Use this to set the title of the block, this sits with the logo and is hidden by default
     *
     */

    _title : string = 'Here is a dynamic title.....';

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {

    };

    @Input()
    set style(style : string) {
        this._style = (style && style.trim()) || '';
    }

    get style() {
        return this._style;
    }

    @Input()
    set title(title : string) {
        this._title = (title && title.trim()) || '';
    }

    get title() {
        return this._title;
    }

    /**
     * This code is just to set focus on an element and is not for general use.
     * */

    autoFocus () {
        setTimeout( () => {

            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );

                if ( inputs && inputs.length > 0 ) {
                    inputs[2].focus();
                }

        } , 100 );
    }

    ngAfterViewInit () {
        this.autoFocus();
    }
}

