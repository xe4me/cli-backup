import { Component,
         ChangeDetectorRef,
         ElementRef,
         ChangeDetectionStrategy,
         OnInit
} from '@angular/core';
import { AmpButton,
         ProgressObserverService,
         FormBlock,
         FormModelService,
         ScrollService }
from 'amp-ddc-components';
import {
    Validators,
    FormControl
} from '@angular/forms';

@Component( {
    selector        : 'single-or-joint-block' ,
    templateUrl        : './single-or-joint-block.component.html',
    styles          : [ require( './single-or-joint-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock implements OnInit {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
        this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
    }

    private onSingleJoint(singleJointIndicator : string) {
        this.__controlGroup.get(this.__custom.controls[0].id).setValue(singleJointIndicator);
    }
}
