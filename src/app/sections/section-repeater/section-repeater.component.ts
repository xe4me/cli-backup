import {
    Component,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import { AmpRowRepeaterComponent } from '../../modules/amp-row-repeater';
@Component( {
    selector : 'section-repeater',
    template : `
        <amp-row-repeater
                #repeater
                [controlGroup]="__controlGroup"
                [hasButtons]="false"
                [initialRowCount]="__custom.initialRowCount"
                [id]="__child_blocks.name"
                [context]="context()">
            <template let-index="index" let-controlGroup="controlGroup">
                <div [amp-block-loader]="__child_blocks"
                     [fdn]="controlGroup.__fdn"
                     [repeaterIndex]="index"
                     [form]="__form">
                </div>
            </template>
        </amp-row-repeater>
  `,

    styles          : [ require( './section-repeater.component.scss' ) ]
} )
export class SectionRepeaterComponent {
    @ViewChild( 'repeater' ) repeater : AmpRowRepeaterComponent;
    public __fdn;
    public __controlGroup;
    public __custom;

    context() {
        return this;
    }
}
