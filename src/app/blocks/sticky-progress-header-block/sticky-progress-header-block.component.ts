import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import { AmpLinearProgressBarComponent } from 'amp-ddc-components';
import {
    Constants,
    ApplicantGeneratorService,
    SharedFormDataService
} from '../../shared';
@Component(
    {
        selector: 'sticky-progress-header-block',
        template: `
        <div class="sticky" *ngIf="showReferenceNo">
            <div class="sticky__header">
                <div class="sticky__header--right">
                    <div>Reference number:  {{ refNumber }}</div>
                </div>
            </div>
        </div>
    ` ,
        directives: [AmpLinearProgressBarComponent],
        styles: [require('./sticky-progress-header-block.component.scss')],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
export class StickyProgressHeaderBlockComponent implements OnInit {
    @Input()
    private form : FormGroup;
    private refNumber : string;
    private refNumberControl : FormControl;
    private showReferenceNo : boolean = false;

    constructor(private sharedDataService : SharedFormDataService, private _cd : ChangeDetectorRef) {
    }

    public ngOnInit() {
        // Hide the reference number as requested.
        // this.refNumberControl = <FormControl> this.sharedDataService.getReferenceIdControl(this.form);
        // this.refNumberControl.valueChanges.subscribe((refNumber : string) => {
        //     this.refNumber = refNumber;
        //     this.showReferenceNo = this.refNumber.length > 0 ? true : false;
        //     this._cd.markForCheck();
        // });
    }
}
