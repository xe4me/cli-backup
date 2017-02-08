import {
    AfterViewInit,
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewContainerRef, AfterViewChecked
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { LoginStatusService } from '../../../../services/login/login-status.service';
import { RetrieveService } from '../../../../services/retrieve/retrieve.service';

@Component( {
    selector: 'amp-captcha-block',
    template: require( './amp-captcha-block.component.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [ require( './amp-captcha-block.component.scss' ) ]
} )
export class AmpCaptchaBlockComponent extends FormBlock implements AfterViewInit, AfterViewChecked {

    private static alreadyValidated : boolean = false;
    private mainCaptcha : boolean = false;

    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey;
    private showCaptchaBlock : boolean = true;
    private verified : boolean = false;
    private keepControl : boolean = true;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private loginStatusService : LoginStatusService,
                  private retrieveService : RetrieveService,
                  private vcf : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        this.autoDestroyIfNecessary();
        this.loginStatusService.userHasLoggedIn().subscribe( () => {
            this.autoDestroy();
        } );
    }

    public ngAfterViewChecked () {
        this.autoDestroyIfNecessary();
    }

    private handleCaptchaResponse ( response ) {
        this.verified = response.success;
        this.mainCaptcha = true;
        AmpCaptchaBlockComponent.alreadyValidated = this.verified;
    }

    private handleCaptchaExpired ( event ) {
        this.autoDestroy();
    }

    private hideBlock () {
        this.showCaptchaBlock = false;
    }

    private autoDestroyIfNecessary () {
        if (!this.mainCaptcha && AmpCaptchaBlockComponent.alreadyValidated) {
            this.autoDestroy();
        }
        if (this.retrieveService.hasBeenRetrieveSuccessfully) {
            this.autoDestroy();
        }
    }

    private autoDestroy () {
        this.hideBlock();
        this._cd.markForCheck();
        this.__removeSelf( this.vcf );
    }
}
