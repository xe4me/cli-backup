import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock,
    SaveService,
    ScrollService
} from 'amp-ddc-components';
@Component( {
    selector        : 'welcome-block',
    templateUrl     : './welcome-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './welcome-block.component.scss' ) ]
} )
export class WelcomeBlockComponent extends FormBlock {
    constructor ( scrollService : ScrollService,
                  saveService : SaveService,
                  _cd : ChangeDetectorRef ) {
        super( saveService, _cd, scrollService );
    }
}
