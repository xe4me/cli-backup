import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    ViewContainerRef
} from '@angular/core';
import {
    LoadedBlockInfo ,
    AmpButton ,
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService
} from 'amp-ddc-components';
import {
    Validators ,
    FormControl
} from '@angular/forms';
import {
    Constants ,
    ApplicantGeneratorService ,
    SharedFormDataService
} from '../../shared';
@Component( {
    selector        : 'new-or-continue-block' ,
    templateUrl     : './new-or-continue-block.component.html' ,
    styles          : [ require( './new-or-continue-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NewOrContinueApplicationBlock extends FormBlock implements OnInit {
    private newApplicationKey : string = Constants.newApplication;
    private continueApplicationKey : string = Constants.existingApplication;
    private nextBlockChanged = false;
    private hideThisBlock = false;
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private applicantGenerator : ApplicantGeneratorService ,
                  private viewContainerRef : ViewContainerRef ,
                  private sharedDataService : SharedFormDataService,
                  private viewReference : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
        }
        this.__controlGroup.markAsTouched();
    }

    private addOrRemoveContinueSection(newOrContinue : string) : Promise<any> {
        if ( newOrContinue === this.continueApplicationKey && !this.nextBlockChanged) {
            this.nextBlockChanged = true;
            return this.__loadNext( this.__custom.optionalBlocks[ 0 ] , this.viewReference );
        }
        let promise = new Promise((resolve) => resolve() );
        return promise;
    }

    private onNewOrContinue ( newOrContinue : string ) {
        const newOrContinueControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        newOrContinueControl.setValue( newOrContinue );
        newOrContinueControl.markAsTouched();
        this.addOrRemoveContinueSection( newOrContinue ).then((actualComponent) => {
            setTimeout(() => {
                this.onNext();
                this.hideThisBlock = true;
            }, 0);
        });
    }

}
