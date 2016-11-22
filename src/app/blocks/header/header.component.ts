import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'header-with-logo' ,
    templateUrl     : './header.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './header.component.scss').toString() ]
} )

export class Header {
    private damContentUrl = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;
    constructor () {
    }
}
