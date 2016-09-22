import { Component,
         ChangeDetectorRef,
         ElementRef,
         ChangeDetectionStrategy,
         ViewChild
} from '@angular/core';
import { AmpButton,
         ProgressObserverService,
         FormBlock,
         FormModelService,
         ScrollService,
         AmpIntroBlockComponent
} from 'amp-ddc-components';
@Component( {
    selector        : 'intro-block' ,
    templateUrl     : './intro-block.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IntroBlockComponent extends FormBlock {

    @ViewChild(AmpIntroBlockComponent) public ampIntro;

    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private proceed() {
        this.ampIntro.proceed();
        setTimeout( () => {
            //this.onNext();
        }, 800);
    }
}
