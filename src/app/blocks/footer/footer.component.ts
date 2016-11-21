import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'footer' ,
    templateUrl     : './footer.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './footer.component.scss').toString() ],
} )

export class Footer {
    private damContentUrl = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;
    constructor () {
    }
}
