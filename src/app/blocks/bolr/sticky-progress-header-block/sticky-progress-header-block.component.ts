import { Component } from 'angular2/core';
import { AmpLinearProgressBarComponent } from '../../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
@Component(
    {
        selector   : 'sticky-progress-header-block' ,
        template   : `
        <div class='sticky'>
            <div class="sticky__header">
                <div class='sticky__header--left'>
                    <span>Request to exercise {{ licenseeName }} </span>
                    <!--<span class='line-vertical-text-wrap line-vertical-text-wrap-gray '></span>-->
                    <!--<span class='utils__weight&#45;&#45;700'>{{value}}</span>-->
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
    private licenseeFormName : any = {
        LIC_AMPFP    : 'Buyer of last resort' ,
        LIC_HILLROSS : 'Licensee / Enhanced buyback' ,
        LIC_CHARTER  : 'Buy out option' ,
        null         : 'Buyer of last resort'
    };

    private get licenseeName () {
        return this.licenseeFormName[ this.formModelService.getModel().context.licensee ];
    }

    constructor ( private formModelService : FormModelService ) {
    }
}
