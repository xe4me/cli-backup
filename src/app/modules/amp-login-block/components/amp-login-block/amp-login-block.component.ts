import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    ViewContainerRef,
    Renderer,
    OnDestroy
} from '@angular/core';

import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

import { FormBlock } from '../../../../form-block';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { SaveService } from '../../../../services/save/save.service';
import { LoginStatusService } from '../../../../services/login/login-status.service';

@Component( {
    selector: 'amp-login-block',
    template: require('./amp-login-block.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [ require( './amp-login-block.component.scss' ) ]
} )
export class AmpLoginBlockComponent extends FormBlock implements OnDestroy, AfterViewInit {

    private errorCode : string = null;
    private hideThisBlock = false;
    private formTemplate : string = `
        <form action="/eam/login" method="post">
            <input id="userid" name="userid"/>
            <input id="password" name="password" type="password"/>
            <button id="myAmpLoginBtn" type="submit" formtarget="myamploginframe"></button>
        </form>
        <iframe name="myamploginframe" id="myamploginframe"></iframe>`;

    constructor( elementRef : ElementRef,
                 _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 saveService : SaveService,
                 private loginStatusService : LoginStatusService,
                 private vcf : ViewContainerRef,
                 private renderer : Renderer,
                 private dom : BrowserDomAdapter ) {
        super( saveService, _cd, scrollService );
        this.disableAutoSave();
    }

    public ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.__isRetrieved) {
            this.cleanUp();
        }
    }

    public ngOnDestroy() {
        super.ngOnDestroy();

        this.removeLoginFrameListener();
    }

    public removeLoginAndProceed() {
        this.cleanUp();
        this.__removeAt( this.__getIndex( this.vcf ) );
        super.onNext();
    }

    public onNext() {
        this.login();
    }

    public login() {
        if (this.canGoNext) {
            // Clear error message
            this.errorCode = null;

            // Check if we already have a login form already
            if (!this.dom.query( '#myamploginframe' )) {
                // Generate hidden MyAMP TAM Login form/iframe
                let hiddenFormDiv = document.createElement( 'div' );
                hiddenFormDiv.style.display = 'none';
                hiddenFormDiv.innerHTML = this.formTemplate;
                document.body.appendChild( hiddenFormDiv );

                // Bind the onload event of the iframe back into angular to get the response of the login
                this.removeLoginFrameListener =
                    this.renderer.listen( this.dom.query( '#myamploginframe' ), 'load', this.submitCallback );
            }

            // Sync login details from the block to the generated hidden form.
            this.renderer.setElementProperty(
                this.dom.query( '#userid' ), 'value', this.__controlGroup.get( this.__custom.controls[ 0 ].id ).value );
            this.renderer.setElementProperty(
                this.dom.query( '#password' ), 'value', this.__controlGroup.get( this.__custom.controls[ 1 ].id ).value );

            // Finally, submit the form to TAM
            this.renderer.invokeElementMethod( this.dom.query( '#myAmpLoginBtn' ), 'click' );
        }
    }

    private removeLoginFrameListener : Function = () => {
        return;
    }

    private cleanUp() {
        // Remove page level username/password for security concerns
        this.__controlGroup.get( this.__custom.controls[ 0 ].id ).reset();
        this.__controlGroup.get( this.__custom.controls[ 1 ].id ).reset();

        // Remove username/password from formGroup for security concerns
        this.__controlGroup.removeControl( this.__custom.controls[ 0 ].id );
        this.__controlGroup.removeControl( this.__custom.controls[ 1 ].id );

        // Clear the errorCode
        this.errorCode = null;

        this.removeLoginFrameListener();
        this.__controlGroup.markAsTouched();

        this.hideThisBlock = true;
    }

    private submitCallback : Function = ( event ) => {
        try {
            let landingURL = this.dom.query( '#myamploginframe' ).contentWindow.location.href;
            if (landingURL) {
                let errorCodeStartIndex = landingURL.indexOf( 'errorCode=' );
                if (errorCodeStartIndex > -1) {
                    let tamErrorCode = landingURL.substring( errorCodeStartIndex + 10 );
                    this.onLoginFail( tamErrorCode );
                } else if (landingURL.indexOf( 'wps/myportal/sec/xseed/dashboard/mywealth/' ) > -1) {
                    this.onLoginSuccess();
                } else {
                    this.onLoginFail();
                }
            } else {
                this.onLoginFail();
            }

        } catch (err) {
            this.onLoginFail();
            // Not very likely, as prerequisite states we must be in the same this.domain.
        }

        this._cd.markForCheck();
    }

    private onLoginSuccess() {
        // TODO: Instead of assuming the session is valid. Call the this.loginStatusService.checkLoginStatus()
        this.emitLoginSuccess();
        this.removeLoginAndProceed();
    }

    private emitLoginSuccess () {
        this.loginStatusService.loginSuccess();
    }

    private onLoginFail( errorCode? : string ) {
        this.errorCode = errorCode;
        if (!errorCode) {
            this.errorCode = 'default';
        }
    }
}
