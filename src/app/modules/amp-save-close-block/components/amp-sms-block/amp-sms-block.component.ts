import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewContainerRef,
    Input,
    Output,
    OnInit, ComponentRef
} from '@angular/core';

import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService, SaveAndCloseService } from '../../../../services';

import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { AmpSmsService } from '../../services/amp-sms.service';
@Component( {
    selector    : 'amp-sms-block' ,
    template: require('./amp-sms-block.component.html'),
    styles: [ require( './amp-sms-block.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpSmsBlockComponent extends FormBlock implements OnInit {
    private mobileNumber : string = null ;
    private smsMessage : string = null ;
    private smsSentErrorMessage : string = null;
    private checkoutLabel : string = 'I have read the <a href="https://www.amp.com.au/depositprivacy" target="_blank">privacy information</a> and confirm the statements in the \/Declarations when applying for an AMP Bett3r Account\' section';

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 scrollService : ScrollService,
                 private sms : AmpSmsService,
                 private saveCloseService : SaveAndCloseService,
                 private vcf : ViewContainerRef) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit() {
        if (this.__custom.controls[1].label) {
            this.checkoutLabel = this.__custom.controls[1].label;
        }
    }

    private continueTo() {
        if (this.__controlGroup.valid) {
            this.saveCloseService.mobileNumber = (this.__controlGroup.value[this.__custom.controls[0].id]);
            this.sms.sendSMS()
                .subscribe( (result) => {
                        this.goToNext();
                    },
                    (error) => {
                        this.smsSentErrorMessage = `Request SMS could not be sent to ${this.saveCloseService.mobileNumber}`;
                    });
        }
    };

    private back() : void {
        history.back();
    }

    private goToNext() : void {
        this.__loadNext( this.__custom.optionalBlocks[0], this.vcf )
            .then ( ( ) => {
            let myIndex = this.__getIndex(this.vcf);
            this.__removeAt(myIndex);
        });
    }
}
