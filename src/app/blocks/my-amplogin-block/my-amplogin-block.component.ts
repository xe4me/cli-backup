import { Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, NgZone, Renderer } from '@angular/core';
import { FormBlock, ScrollService, FormModelService, ProgressObserverService } from 'amp-ddc-components';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
    selector        : 'my-amplogin-block',
    templateUrl     : './my-amplogin-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [require ( './my-amplogin-block.component.scss' )]
})
export class MyAMPLoginBlockComponent extends FormBlock {
    private hasLoginError = false;

    constructor( formModelService : FormModelService,
        elementRef : ElementRef,
        _cd : ChangeDetectorRef,
        scrollService : ScrollService,
        progressObserver : ProgressObserverService,
        private zone : NgZone,
        private renderer: Renderer) {
        super( formModelService, elementRef, _cd, progressObserver, scrollService );
    }

    // TODO: Check with design if the OK / Change buttons are the right ones to use
    onNext () {
        if ( this.canGoNext ) {
            let DOM = getDOM();

            // Clear error message
            this.hasLoginError = false;

            // Check if we already have a login form already
            if (!DOM.query('#myamploginframe')) {
                // Generate hidden MyAMP TAM Login form/iframe
                let hiddenFormDiv = document.createElement('div');
                hiddenFormDiv.style.display = 'none';
                hiddenFormDiv.innerHTML = 
                    "<form action='/eam/login' method='post'>" + 
                        "<input id='userid' name='userid'/>" +
                        "<input id='password' name='password' type='password'/>" +
                        "<button id='myAmpLoginBtn' type='submit' formtarget='myamploginframe'></button>" +
                    "</form><iframe name='myamploginframe' id='myamploginframe'></iframe>";
                document.body.appendChild(hiddenFormDiv);

                // Bind the onload event of the iframe back into angular to get the response of the login
                this.renderer.listen(DOM.query('#myamploginframe'), 'load', (event) => {
                    try {
                        let landingURL = DOM.query('#myamploginframe').location.href;

                        if (landingURL) {
                            if (landingURL.endsWith('errorCode=logon.invalid')) {
                                this.onLoginFail();
                                console.log("Username and password combination is incorrect.");
                            } else if (landingURL.indexOf('wps/myportal/sec/xseed/dashboard/mywealth/') > -1) {
                                this.onLoginSuccess();
                            } else {
                                this.onLoginFail(); 
                                console.log("Got a response but unable to determine status based on the URL [" + landingURL + "]");
                            }
                        } else {
                            this.onLoginFail();
                            // NA, the more likey scenario of CORS will be caught in the try/catch block
                            console.log("System Error: Failed to get status of the TAM Login request");
                        }

                    } catch (err) {
                        this.onLoginFail();
                    }

                    this._cd.markForCheck();
                    console.log('iframe loaded. Lets check the url'); 
                });
            }

            // Sync login details from the block to the generated hidden form.
            this.renderer.setElementProperty(DOM.query('#userid'), 'value', this.__controlGroup.get(this.__custom.controls[0].id).value);
            this.renderer.setElementProperty(DOM.query('#password'), 'value', this.__controlGroup.get(this.__custom.controls[1].id).value);

            // Finally, submit the form to TAM
            this.renderer.invokeElementMethod(DOM.query('#myAmpLoginBtn'), 'click');
        }
    }

    onLoginSuccess () {
        // TODO: Maybe trigger the prepopulation api based on the scvId we get back from TAM
        console.log('Login succeeded');
        super.onNext();
    }

    onLoginFail () {
        this.hasLoginError = true;
        // TODO: Need more requirements, do we let them try 3 times, do we just provide a MyAMP forgotten password link?
        console.log('Login failed');

    }
}
