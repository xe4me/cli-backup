import { Component,
         ChangeDetectorRef,
         ElementRef,
         ChangeDetectionStrategy,
         OnInit,
         ViewContainerRef
} from '@angular/core';
import { AmpButton,
         ProgressObserverService,
         FormBlock,
         FormModelService,
         ScrollService }
from 'amp-ddc-components';
import {
    Validators,
    FormControl
} from '@angular/forms';
import {
    Constants,
    ApplicantGeneratorService
} from '../../shared';

@Component( {
    selector        : 'single-or-joint-block' ,
    templateUrl        : './single-or-joint-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock implements OnInit {
    public applicant2Added : boolean = false;
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService,
                  private applicantGenerator : ApplicantGeneratorService,
                  private viewContainerRef : ViewContainerRef) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
        this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
        this.formModelService.setSubmitRelativeUrl(Constants.saveUrl);
        // load applicant 1
        this.__loadAt(this.applicantGenerator.getApplicantSection(1), 2);
    }

    public addOrRemoveJointApplicantSection(singleJointIndicator : string) {
        if (!this.applicant2Added && singleJointIndicator === Constants.jointApplicant) {
            this.__loadAt(this.applicantGenerator.getApplicantSection(2), 3);
            this.applicant2Added = true;
        }
        if (this.applicant2Added && singleJointIndicator === Constants.singleApplicant) {
            this.__removeAt(3);
            this.applicant2Added = false;
        }
    }

    private onSingleJoint(singleJointIndicator : string) {
        const singleOrJoint = this.__controlGroup.get(this.__custom.controls[0].id);
        singleOrJoint.setValue(singleJointIndicator);
        singleOrJoint.markAsTouched();

        this.addOrRemoveJointApplicantSection(singleJointIndicator);
    }
}
