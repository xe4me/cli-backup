import { Component } from '@angular/core';
import { AmpBlockLoaderDirective } from "../../../../../app/amp-block-loader.directive";
@Component( {
    selector   : 'details-page' ,
    template   : `
    <div class="Landing">
        <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form" ></div>
    </div>
  ` ,
    directives : [ AmpBlockLoaderDirective ]
    // encapsulation: ViewEncapsulation.Emulated
} )
export class DetailsPage {
    static CLASS_NAME = 'DetailsPage';
}
