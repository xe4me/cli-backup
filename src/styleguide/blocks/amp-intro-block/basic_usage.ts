import { Component , ChangeDetectorRef , ElementRef, Input } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { AmpInputComponent } from '../../../app/components/amp-input/amp-input.component';
import { IntroBlockComponent } from '../../../app/blocks/amp-intro-block/amp-intro-block.component';
import { FormBlock } from '../../../app/form-block';
import { ThemeService } from '../../services/theme';
@Component( {
    selector   : 'intro-block-basic-usage' ,
    directives : [ AmpButton, IntroBlockComponent, AmpInputComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-intro-block/basic_usage.html',
    styles     : [ require( './basic_usage.scss' ).toString() ]
} )

export default class IntroBlockBasicUsage {
    /**
     * THIS CODE IS A SAMPLE ONLY
     * */
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef,  private elementRef : ElementRef ) {
    }

    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {

    }

    /**
     * Use this property to set custom styles for the block.
     *
     * Set css classes are:
     *
     * branded: dark blue bg
     */

    _style: string = '';

    @Input()
    set style(style : string) {
        this._style = (style && style.trim()) || '';
    }

    get style() { return this._style; }

    /**
     *
     * Title: Use this to set the title of the block, this sits with the logo and is hidden by default
     *
     */

    _title: string = 'Here is a dynamic title.....';

    @Input()
    set title(title : string) {
        this._title = (title && title.trim()) || '';
    }

    get title() {
        return this._title;
    }

    autoFocus () {
        /*
         * TODO : This should be a directive or something else.
         * */
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
