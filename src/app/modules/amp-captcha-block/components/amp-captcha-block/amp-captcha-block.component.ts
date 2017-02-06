import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit, ViewContainerRef
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { LoginStatusService } from '../../../../services/login/login-status.service';

@Component( {
    selector: 'amp-captcha-block',
    template: require( './amp-captcha-block.component.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [ require( './amp-captcha-block.component.scss' ) ]
} )
export class AmpCaptchaBlockComponent extends FormBlock implements AfterViewInit {

    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey;
    private showCaptchaBlock : boolean = true;
    private verified : boolean = false;
    private keepControl : boolean = true;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private loginStatusService : LoginStatusService,
                  private vcf : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        if (this.__isRetrieved && this.__controlGroup.valid) {
            this.hideBlock();
        }
        this.loginStatusService.userHasLoggedIn().subscribe( () => {
            this._cd.markForCheck();
            this.__removeAt( this.__getIndex( this.vcf ) );
        } );
    }

    private handleCaptchaResponse ( response ) {
        this.verified = response.success;
    }

    private handleCaptchaExpired ( event ) {
        // BET-3872: Remove captcha block after successfully verified
        if (this.verified) {
            this.hideBlock();
        }
        this._cd.markForCheck();
    }

    private hideBlock () {
        this.showCaptchaBlock = false;
    }
}
