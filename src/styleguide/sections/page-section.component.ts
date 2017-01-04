import { Component } from '@angular/core';

@Component( {
    selector : 'page-section',
    template : `
    <div class='section' [id]='label' [ngClass]='{"section__hide": !isCurrentSection()}'>
         <div [amp-block-loader]="__child_blocks" [fdn]="__fdn" [form]="__form"></div>
    </div>
  `
} )
export class PageSectionComponent {

}
