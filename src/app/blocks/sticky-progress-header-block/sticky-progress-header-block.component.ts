import { Component, AfterViewInit } from '@angular/core';
import { AmpLinearProgressBarComponent } from 'amp-ddc-components';
@Component(
    {
        selector   : 'sticky-progress-header-block' ,
        template   : `
        <div class="sticky" *ngIf="showReferenceNo">
            <div class="sticky__header">
                <div class="sticky__header--right">
                    <div>Reference number:  {{ refNumber }}</div>
                </div>
            </div>
        </div>
    ` ,
        directives : [ AmpLinearProgressBarComponent ] ,
        inputs     : [ 'determinate' , 'value' ] ,
        styles     : [ require( './sticky-progress-header-block.component.scss' ) ] ,
    } )
export class StickyProgressHeaderBlockComponent {
    private refNumber : string = '12345';
    private determinate : string;
    private showReferenceNo : boolean = false;
}
