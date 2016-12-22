import { Component } from '@angular/core';
@Component(
  {
    selector : 'sticky-progress-header-block' ,
    template : `
        <div class='sticky'>
            <div class="sticky__header">
                <div class='sticky__header--left'>
                    <span>Request to exercise choice and join AMP Super Plan</span>
                </div>
            </div>
            <div class='sticky__progress'>
                <!--<amp-linear-progress-bar-->
                    <!--[determinate]='indeterminate'-->
                    <!--[value]='value'-->
                    <!--&gt;-->
                <!--</amp-linear-progress-bar>-->
            </div>
        </div>
    ` ,
    inputs   : [ 'determinate' , 'value' ] ,
    styles   : [ require( './sticky-progress-header-block.component.scss' ).toString() ] ,
  } )
export class StickyProgressHeaderBlockComponent {
  private value : number;
  private determinate : string;
}
