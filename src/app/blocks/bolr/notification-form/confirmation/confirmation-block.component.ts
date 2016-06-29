import { FormBlock , provideParent } from '../../../../formBlock';
import { ThemeIDDirective } from '../../../../directives/themeId.directive';
import { Component , OnInit , ElementRef , ViewEncapsulation, ViewContainerRef } from '@angular/core';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract
} from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector      : 'confirmation-block' ,
    template      : `
            <div *ngIf='showConfirmationBlock' class='confirmation-block mb-80' id='confirmation-block'>
                <div class='confirmation-block--logo mb-60' ampLicenseeThemeID></div>
                <div class='grid__item 1/6'></div>
                <section class='grid__item 2/3'>
                    <div class='heading heading-contxtual-label'>
                        Thank you, your request has been submitted.
                    </div>
                    <h3 class='heading heading-intro mt-30'>Like more information?</h3>
                    <div *ngIf='isAMPFPP' class='heading heading-micro-intro mt-35 mb-10'>
                        You can find more details on extending your notice period and / or withdrawing your notification in the AMP Financial Planning Buyer of last resort policy.
                    </div>
                    <div *ngIf='isHILLROSS' class='heading heading-micro-intro mt-35 mb-10'>
                        You can find more details on extending your notice period and / or withdrawing your notification in the Hillross Buyback booklet.
                    </div>
                    <div class='heading heading-micro-intro mb-10'>
                        If you have any questions, please speak to your partnership manager.
                    </div>
                    <amp-button (click)='download()' class='btn btn-submit btn-download mt-40'>
                        Download a copy
                    </amp-button>
                </section>
            </div>
          ` ,
    styles        : [ require( './confirmation-block.component.scss' ).toString() ] ,
    directives    : [ ThemeIDDirective ] ,
    encapsulation : ViewEncapsulation.None ,
    providers     : [ provideParent( ConfirmationBlockComponent ) ]
} )
export class ConfirmationBlockComponent extends FormBlock implements OnInit, FormBlock {
    static CLASS_NAME             = 'ConfirmationBlockComponent';
    private showConfirmationBlock = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef,
                  public _viewContainerRef: ViewContainerRef ) {
        super();
        this.formControlGroupName = 'confirmation';
    }

    ngOnInit () : any {
        let visibleFlag = this.getMyVisibleFlagString();
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes[ visibleFlag ] ) {
                this.showConfirmationBlock = true;
                this.formModelService.$flags.unsubscribe();
            }
        } );
        return undefined;
    }

    preBindControls ( _formBlockDef ) {
    }

    isIE(): boolean {
        return (window.navigator.userAgent.indexOf('MSIE ') > -1) ||
                (window.navigator.userAgent.indexOf('Trident/') > -1) ||
                (window.navigator.userAgent.indexOf('Edge/') > -1) ;
    }

    b64toBlob(b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    wrapInDataURI(base64Data) : string {
        return 'data:application/pdf;base64,' + base64Data;
    }

    download () {
        if (this.formModelService.generatePDFUrl()) {
            this.formModelService
                .generatePDF()
                .subscribe(base64PDF => {
                    // Technical challenge: PDF reside in a APIGW protected URL that requires header "apiKey Bearer blahblah"
                    // Data URI will work for most browsers http://caniuse.com/#feat=datauri, except for the dreaded IE11
                    if (this.isIE()) {
                        window.navigator.msSaveBlob(this.b64toBlob(base64PDF, 'application/pdf'), 'Buyback notification.pdf');
                    } else {
                        window.open(this.wrapInDataURI(base64PDF), '_blank');
                    }
                });
        } else {
            console.log('Failed to obtain PDF Url', this.formModelService.generatePDFUrl());
        }
    }

    private get isAMPFPP () {
        return (this.formModelService.licensee === 'DEA_AMPFP' || this.formModelService.licensee === 'DEA_ASSURED');
    }

    private get isHILLROSS () {
        return this.formModelService.licensee === 'DEA_HILLROSS';
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }
}
