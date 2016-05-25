import { Component } from 'angular2/core';
import { AmpLinearProgressBarComponent } from '../../../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { FormModelService , LicenseesAbstract } from 'amp-ddc-ui-core/ui-core';
@Component(
    {
        selector   : 'sticky-progress-header-block' ,
        template   : `
        <div class='sticky'>
            <div class="sticky__header">
                <div class='sticky__header--left'>
                    <div class='amp-logo'></div>
                    <div>Request to access the  {{ licenseeBuybackFacility }} facility</div>
                    <!--<span class='line-vertical-text-wrap line-vertical-text-wrap-gray '></span>-->
                    <!--<span class='utils__weight&#45;&#45;700'>{{value}}</span>-->
                </div>
                <div class="sticky__header--right bolr-right-padding">
                    <span (click)='chat()' class="sticky__header--right--chat">
                        <span aria-hidden="true" class="icon icon--chat"></span> Chat now
                    </span>
                    <span (click)='call()' class="sticky__header--right--call">
                        <span aria-hidden="true" class="icon icon--phone"></span> 1300 158 587
                    </span>
                </div>
            </div>

            <div class='sticky__progress'>
                <amp-linear-progress-bar
                    [determinate]='indeterminate'
                    [value]='value'
                    >
                </amp-linear-progress-bar>
            </div>
        </div>

    ` ,
        directives : [ AmpLinearProgressBarComponent ] ,
        inputs     : [ 'determinate' , 'value' ] ,
        styles     : [ require( './sticky-progress-header-block.component.scss' ).toString() ] ,
    } )
export class StickyProgressHeaderBlockComponent {
    private value : number;
    private determinate : string;

    constructor ( private formModelService : FormModelService ) {
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }

    private chat () {
    }

    private call () {
    }
}
