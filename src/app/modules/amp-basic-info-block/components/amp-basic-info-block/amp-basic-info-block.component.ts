import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Optional
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import {
    ScrollService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
const defaultBlockProps = require( './amp-basic-info-block.config.json' );

@Component( {
    selector        : 'amp-basic-info-block',
    template        : require( './amp-basic-info-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './amp-basic-info-block.component.scss' ) ]
} )
export class AmpBasicInfoBlockComponent extends FormBlock {

    protected __custom = defaultBlockProps;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  @Optional() private saveCloseService : SaveAndCloseService,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        if ( this.__isRetrieved ) {
            this.showSaveAndCloseButton();
        }
        super.ngAfterViewInit();
    }

    onNext () {
        this.showSaveAndCloseButton();
        super.onNext();
    }

    showSaveAndCloseButton () {
        if ( this.saveCloseService ) {
            this.saveCloseService.enable();
        }
    }
}
