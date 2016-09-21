import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService } from 'amp-ddc-components';
@Component( {
    selector        : 'single-or-joint-block' ,
    templateUrl        : './single-or-joint-block.component.html',
    styles          : [ require( './single-or-joint-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    private onSingleJoint() {
        this.__controlGroup.get(this.__custom.controls[0].id).setValue(true);
    }
}
