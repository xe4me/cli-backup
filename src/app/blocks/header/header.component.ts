import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { Environments } from 'amp-ddc-components';
@Component( {
    selector : 'header-with-logo',
    templateUrl : './header.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles : [ require( './header.component.scss' ) ]
} )

export class Header {
    private damContentUrl = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;

    constructor () {
    }
}
