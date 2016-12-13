import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy,
    NgZone,
    OnInit,
    AfterViewInit,
    ViewContainerRef,
    Renderer,
    OnDestroy } from '@angular/core';
    import {FormControl} from '@angular/forms';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    FormBlock,
    ScrollService,
    FormModelService,
    ProgressObserverService
} from 'amp-ddc-components';
import {
    Constants
} from '../../shared';
/**
 * Thin login interface to MyAMP via TAM.
 *
 * 'Thin' refers to credential management aspect, like forgot password, reset account, etc...
 * these features remains on the MyAMP main web application.
 *
 * Prerequisite: Experience must be in the same domain as MyAMP for this component to work
 * (i.e. In Production the DDC experience must have a domain of https://secure.amp.com.au/ddc/XYZ)
 *
 * Example login:-
 *  PRF:  208715776061
 *
 * Assumptions:-
 * Form Definition
 *   {
 *       'name': 'MyAMPLoginBlock',
 *       'blockType': 'MyAMPLoginBlockComponent',
 *       'blockLayout': 'INLINE',
 *       'commonBlock': true,
 *       'path': 'blocks/my-amplogin-block/my-amplogin-block.component',
 *       'custom': {
 *           'blockTitle': 'Please login',
 *           'loginFailedMsg': 'Incorrect username/password combination, please try again.',
 *           'controls': [
 *               {
 *                   'id': 'userId',
 *                   'label': 'User Id'
 *               },
 *               {
 *                   'id': 'password',
 *                   'label': 'Password'
 *               }
 *           ]
 *       }
 *   }
 *
 *
 *
 */
@Component({
    selector        : 'my-amplogin-block',
    templateUrl     : './my-amplogin-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [require ( './my-amplogin-block.component.scss' )]
})
export class MyAMPLoginBlockComponent extends FormBlock implements OnDestroy , OnInit, AfterViewInit {
    public static LOGIN_STATUS_CONTROL_NAME = 'loginResult';
    private errorCode : String = null;
    private hideThisBlock = false;
    private loginResultControl : FormControl;
    constructor(
        formModelService : FormModelService,
        elementRef : ElementRef,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        progressObserver : ProgressObserverService,
        private zone : NgZone,
        private vcf : ViewContainerRef,
        private renderer : Renderer,
        private dom : BrowserDomAdapter) {
        super( formModelService, elementRef, _cd, progressObserver, scrollService );
        this.disableAutoSave();
    }

    public ngOnInit () {
        if ( this.__controlGroup.contains(MyAMPLoginBlockComponent.LOGIN_STATUS_CONTROL_NAME )) {
            this.loginResultControl =
                <FormControl> this.__controlGroup.get(MyAMPLoginBlockComponent.LOGIN_STATUS_CONTROL_NAME);
        } else {
            this.loginResultControl = new FormControl();
            this.__controlGroup
                .addControl(MyAMPLoginBlockComponent.LOGIN_STATUS_CONTROL_NAME , this.loginResultControl);
        }
    }

    public ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.__isRetrieved) {
            this.cleanUp();
        }
    }

    public ngOnDestroy () {
        super.ngOnDestroy();

        this.removeLoginFrameListener();
    }

    public removeLoginAndProceed() {
        this.cleanUp();
        //this.__removeAt(this.__getIndex(this.vcf));
        super.onNext();
    }

    public onNext() {
        this.login();
    }

    // TODO: Check with design if the OK / Change buttons are the right ones to use
    public login () {
        if ( this.canGoNext ) {
            // Clear error message
            this.errorCode = null;

            // Check if we already have a login form already
            if (!this.dom.query('#myamploginframe')) {
                // Generate hidden MyAMP TAM Login form/iframe
                let hiddenFormDiv = document.createElement('div');
                hiddenFormDiv.style.display = 'none';
                hiddenFormDiv.innerHTML =
                    `<form action="/eam/login" method="post">
                        <input id="userid" name="userid"/>
                        <input id="password" name="password" type="password"/>
                        <button id="myAmpLoginBtn" type="submit" formtarget="myamploginframe"></button>
                    </form><iframe name="myamploginframe" id="myamploginframe"></iframe>`;
                document.body.appendChild(hiddenFormDiv);

                // Bind the onload event of the iframe back into angular to get the response of the login
                this.removeLoginFrameListener =
                    this.renderer.listen(this.dom.query('#myamploginframe'), 'load', this.submitCallback);
            }

            // Sync login details from the block to the generated hidden form.
            this.renderer.setElementProperty(
                this.dom.query('#userid'), 'value', this.__controlGroup.get(this.__custom.controls[0].id).value);
            this.renderer.setElementProperty(
                this.dom.query('#password'), 'value', this.__controlGroup.get(this.__custom.controls[1].id).value);

            // Finally, submit the form to TAM
            this.renderer.invokeElementMethod(this.dom.query('#myAmpLoginBtn'), 'click');
        }
    }

    private removeLoginFrameListener : Function = () => {
        return;
    };

    private cleanUp() {
        // Remove page level username/password for security concerns
        this.__controlGroup.get(this.__custom.controls[0].id).reset();
        this.__controlGroup.get(this.__custom.controls[1].id).reset();

        // Remove username/password from formGroup for security concerns
        this.__controlGroup.removeControl(this.__custom.controls[0].id);
        this.__controlGroup.removeControl(this.__custom.controls[1].id);

        // Clear the errorCode
        this.errorCode = null;

        this.removeLoginFrameListener();
        this.__controlGroup.markAsTouched();

        this.hideThisBlock = true;
    }

    private submitCallback : Function = (event) => {
        try {
            let landingURL = this.dom.query('#myamploginframe').contentWindow.location.href;

            if (landingURL) {
                let errorCodeStartIndex = landingURL.indexOf('errorCode=');
                if (errorCodeStartIndex > -1) {
                    let tamErrorCode = landingURL.substring(errorCodeStartIndex + 10);
                    this.onLoginFail(tamErrorCode);
                } else if (landingURL.indexOf('wps/myportal/sec/xseed/dashboard/mywealth/') > -1) {
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

    private onLoginSuccess () {
        this.loginResultControl.setValue(Constants.loginSuccess);
        this.removeLoginAndProceed();
    }

    private onLoginFail (errorCode? : String) {
        this.loginResultControl.setValue(Constants.loginFailed);
        this.errorCode = errorCode;
        if (!errorCode) {
            this.errorCode = 'default';
        }
    }
}
