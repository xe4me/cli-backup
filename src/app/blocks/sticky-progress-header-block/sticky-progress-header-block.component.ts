import { Component } from '@angular/core';
import { AmpLinearProgressBarComponent } from 'amp-ddc-components';
@Component(
    {
        selector   : 'sticky-progress-header-block' ,
        template   : `
        <div class='sticky'>
            <div class="sticky__header">
                <div class='sticky__header--right'>
                    <div>Save and close</div>
                    <div>Reference number:</div>
                </div>
            </div>
        </div>
    ` ,
        directives : [ AmpLinearProgressBarComponent ] ,
        inputs     : [ 'determinate' , 'value' ] ,
        styles     : [ require( './sticky-progress-header-block.component.scss' ) ] ,
    } )
export class StickyProgressHeaderBlockComponent {
    private value : number;
    private determinate : string;
}
