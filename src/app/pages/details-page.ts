import { Component } from '@angular/core';
import { AmpBlockLoaderDirective } from "amp-ddc-components";
@Component( {
    selector   : 'details-page' ,
    template   : `
    <div class="Landing">
        <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form" ></div>
    </div>
  ` ,
    directives : [ AmpBlockLoaderDirective ]
} )
export class DetailsPage {
    static CLASS_NAME = 'DetailsPage';
}
