import { Component , ChangeDetectorRef , ElementRef , Input , ViewChild } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import { FormBlock } from '../../../app/form-block';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    directives  : [ AmpGreenidBlockComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {



    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ,
                  private elementRef : ElementRef ) {
    }



    /**
     * This code is just to set focus on an element and is not for general use.
     */

    autoFocus () {
        setTimeout( () => {
            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
            if ( inputs && inputs.length > 0 ) {
                inputs[ 2 ].focus();
            }
        } , 100 );
    }

    ngAfterViewInit () {
        this.autoFocus();
    }

}
