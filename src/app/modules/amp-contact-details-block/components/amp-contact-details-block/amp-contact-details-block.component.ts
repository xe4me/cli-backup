import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component({
    selector        : 'amp-contact-details-block',
    template        : require('./amp-contact-details-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AmpContactDetailsBlockComponent extends FormBlock implements OnInit {

    private defaultValues = [
        [
            {
                attr: 'label',
                defaultVal: 'Email'
            },
            {
                attr: 'required',
                defaultVal: true
            },
            {
                attr: 'tooltipMessage',
                defaultVal: 'Confirmation of your application will be sent to this email address.'
            }
        ], [
            {
                attr: 'label',
                defaultVal: 'Mobile number'
            },
            {
                attr: 'required',
                defaultVal: true
            },
            {
                attr: 'tooltipMessage',
                defaultVal: 'A mobile phone number is required to allow AMP Bank to securely protect your account.'
            },
            {
                attr: 'requiredErrorMessage',
                defaultVal: 'Mobile number is a required field.'
            },
            {
                attr: 'patternErrorMessage',
                defaultVal: 'Mobile number must be in the format 04nnnnnnnn.'
            }
        ], [
            {
                attr: 'label',
                defaultVal: 'Home number'
            },
            {
                attr: 'required',
                defaultVal: false
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
