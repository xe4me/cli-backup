import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    IGreenIdFormModel
} from 'amp-ddc-components';
@Component( {
    selector        : 'id-check-block' ,
    templateUrl     : './id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IdCheckBlock extends FormBlock implements OnInit {
    private modelValue : IGreenIdFormModel = {
        firstName: 'John',
        lastName: 'Smith',
        middleNames: 'Danger',
        title: 'Mr',
        dateOfBirth:  '12/04/2001',
        email: 'sample@test.com',
        verificationId: 'fred',
        verificationToken: 'fred',
        verificationStatus: 'fred',
        address: {
            country: 'AU',
            state: 'NSW',
            streetName: 'SMITH',
            flatNumber: 'U 2',
            streetNumber: '53-57',
            suburb: 'SYDNEY'
        }
    };
    private configScriptUrl = 'https://test2.edentiti.com/df/javascripts/greenidConfig.js';
    private uiScriptUrl = 'https://test2.edentiti.com/df/javascripts/greenidui.min.js';
    private styleUrl = 'https://test2.edentiti.com/df/assets/stylesheets/greenid.css';
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
    }
}
