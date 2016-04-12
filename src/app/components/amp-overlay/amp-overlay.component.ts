import {Component} from 'angular2/core';
import {Action} from 'amp-ddc-ui-core/src/app/actions/action';

@Component({
  selector: 'amp-overlay',
  template: `
        <div *ngIf="active" class="amp-overlay"></div>
     `,
  styles: [require('./amp-overlay.scss').toString()],
  inputs: ['active']
})
export class AmpOverlayComponent {
  private active:boolean;

}
