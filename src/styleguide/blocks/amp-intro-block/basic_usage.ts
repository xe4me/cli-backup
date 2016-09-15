import { Component , ChangeDetectorRef , ElementRef } from '@angular/core';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
import { ProgressObserverService } from '../../../app/services/progress-observer/progress-observer.service';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { IntroBlockComponent } from '../../../app/blocks/amp-intro-block/intro-block.component';
import { FormBlock } from '../../../app/form-block';
@Component( {
    selector   : 'intro-block-basic-usage' ,
    directives : [ AmpButton, IntroBlockComponent ] ,
    templateUrl : 'src/styleguide/blocks/amp-intro-block/basic_usage.html',
    styles     : [ require( './basic_usage.scss' ).toString() ]
} )

export default class IntroBlockBasicUsage {
    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {
    }
}

