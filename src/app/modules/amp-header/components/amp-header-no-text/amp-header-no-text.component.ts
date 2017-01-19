import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
@Component( {
    selector : 'amp-header-no-text',
    template : require( './amp-header-no-text.component.html' ) ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles : [ require( './amp-header-no-text.component.scss' ) ]
} )

export class AmpHeaderNoTextComponent {
    private damContentUrl = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;

    constructor () {
    }
}
