import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Optional,
    AfterViewInit
} from '@angular/core';
import { clone } from 'lodash';
import { FormBlock } from '../../../../form-block';
import {
    ScrollService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
import { PrepopAmpBasicInfoService } from '../../services/prepop-amp-basic-info.service';

const defaultBlockProps = require( './amp-basic-info-block.config.json' );

@Component( {
    selector        : 'amp-basic-info-block',
    template        : require( './amp-basic-info-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './amp-basic-info-block.component.scss' ) ]
} )
export class AmpBasicInfoBlockComponent extends FormBlock implements AfterViewInit {

    protected __custom = clone( defaultBlockProps );

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  private prepopAmpBasicInfoService : PrepopAmpBasicInfoService,
                  @Optional() private saveCloseService : SaveAndCloseService,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        this.prepopAmpBasicInfoService.registerBlockForPrepop( this );
        if ( this.__isRetrieved ) {
            this.showSaveAndCloseButton();
        }
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

    get isTitleInSummaryState () {
        return this.isControlInSummaryState( 0 );
    }

    get isFirstNameInSummaryState () {
        return this.isControlInSummaryState( 1 );
    }

    get isMiddleNameInSummaryState () {
        return this.isControlInSummaryState( 2 );
    }

    get isLastNameInSummaryState () {
        return this.isControlInSummaryState( 3 );
    }

    get isDateOfBirthInSummaryState () {
        return this.isControlInSummaryState( 4 );
    }

    private isControlInSummaryState ( controlIndex ) {
        return this.__controlGroup.get( this.__custom.controls[ controlIndex ].id )[ '__isPrepop' ]
            || this.isInSummaryState;
    }

}
