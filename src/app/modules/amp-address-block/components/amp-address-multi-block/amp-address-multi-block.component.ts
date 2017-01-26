import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input,
    OnInit
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component({
    selector        : 'amp-address-multi-block',
    template        : require('./amp-address-multi-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AmpAddressMultiBlockComponent extends FormBlock implements OnInit {
    private defaultValues = [
        [
            {
                attr: 'id',
                defaultVal: 'Address'
            }
        ]
    ];

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );

    }

    ngOnInit() {
        // Set default values if no custom ones from form-def...
        this.defaultValues.forEach((control, index) => {
            control.forEach((prop) => {
                this.setIfNot(this.__custom.controls[index], prop.attr, prop.defaultVal);
            });
        });
    }

    private setIfNot(control, attr, defaultValue) {
        if (control[attr] === undefined) {
            control[attr] = defaultValue;
        }
    }

}
