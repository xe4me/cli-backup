import { Component } from '@angular/core';
import { AmpLinearProgressBarComponent } from "../../../../app/components/amp-linear-progress-bar/amp-linear-progress-bar.component";

@Component(
    {
        selector   : 'sticky-progress-header-block' ,
        template   : `
        <div class='sticky'>
            <div class="sticky__header">
                <div class='sticky__header--left'>
                    <span>Request to exercise choice and join AMP Super Plan</span>
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
}
