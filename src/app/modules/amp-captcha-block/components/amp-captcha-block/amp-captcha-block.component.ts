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

@Component( {
    selector: 'amp-captcha-block',
    template: require( './amp-captcha-block.component.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [ require( './amp-captcha-block.component.scss' ) ]
} )
export class AmpCaptchaBlockComponent extends FormBlock implements AfterViewInit, AfterViewChecked {

    private mainCaptcha : boolean = false;
    private static alreadyValidated : boolean = false;

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
        this.autoDestroyIfNecessary();
        this.loginStatusService.userHasLoggedIn().subscribe( () => {
            console.log('-----> 3');
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
        // BET-3872: Remove captcha block after successfully verified
        this.autoDestroy();
    }

    private hideBlock () {
        this.showCaptchaBlock = false;
    }

    private autoDestroyIfNecessary () {
        console.log('-------------------> ' + this.__isRetrieved);
        if (!this.mainCaptcha && AmpCaptchaBlockComponent.alreadyValidated) {
            console.log('-----> 1');
            this.autoDestroy();
        }
        if (this.__isRetrieved) {
            console.log('-----> 2');
            this.autoDestroy();
        }
    }

    private autoDestroy () {
        console.log('**********************************************');
        console.log('** AUTO DESTROY!');
        console.log('**********************************************');
        this.hideBlock();
        this._cd.markForCheck();
        this.__removeSelf( this.vcf );
    }
}
