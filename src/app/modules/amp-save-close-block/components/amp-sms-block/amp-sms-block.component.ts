import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewContainerRef,
    OnInit,
    ViewChild
} from '@angular/core';

import {
    AmpInputComponent
 } from '../../../amp-inputs';

import { FormBlock } from '../../../../form-block';
import {
    ScrollService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
import { AmpSmsService } from '../../services/amp-sms.service';

@Component( {
    selector    : 'amp-sms-block' ,
    template: require('./amp-sms-block.component.html'),
    styles: [ require( './amp-sms-block.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpSmsBlockComponent extends FormBlock implements OnInit {

    @ViewChild('mobileNumber') mobileNumberCmp : AmpInputComponent;
    private smsSentErrorMessage : string = null;
    private checkoutLabel : string = 'I have read the <a href="https://www.amp.com.au/depositprivacy" target="_blank">privacy information</a> and confirm the statements in the \/Declarations when applying for an AMP Bett3r Account\' section';

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 scrollService : ScrollService,
                 private sms : AmpSmsService,
                 private saveCloseService : SaveAndCloseService,
                 private vcf : ViewContainerRef) {
        super( saveService, _cd, scrollService );

        this.saveCloseService.mobileNumber
            .subscribe( (number : string) => {
                this.mobileNumberCmp.control.setValue(number);
                this._cd.markForCheck();
            });
    }

    public ngOnInit() {
        if (this.__custom.controls[1].label) {
            this.checkoutLabel = this.__custom.controls[1].label;
        }
    }
    public ngAfterViewInit () {
        this.mobileNumberCmp.control.setValue(this.saveCloseService.initialMobileNumber);
        super.ngAfterViewInit();
    }

    private continueTo() {
        if (this.__controlGroup.valid) {
            const mobileNumber = this.mobileNumberCmp.control.value;
            this.sms.sendSMS(mobileNumber)
                .subscribe( (result) => {
                        this.goToNextBlock();
                    },
                    (error) => {
                        this.smsSentErrorMessage = `Request SMS could not be sent to ${mobileNumber}`;
                    });
        }
    };

    private back() : void {
        history.back();
    }

    private goToNextBlock() : void {
        this.__loadNext( this.__custom.optionalBlocks[0], this.vcf )
            .then ( ( ) => {
                let myIndex = this.__getIndex(this.vcf);
                this.__removeAt(myIndex);
            });
    }
}
