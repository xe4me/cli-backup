import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    OnInit ,
    ChangeDetectionStrategy ,
    ViewContainerRef
} from '@angular/core';
import {
    Validators,
    FormControl
} from '@angular/forms';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    clone
} from 'amp-ddc-components';
import {
    Constants
} from '../../shared';
@Component( {
    selector        : 'online-or-offline-id-check-block' ,
    templateUrl     : './online-or-offline-id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class OnlineOrOfflineIdCheckBlock extends FormBlock implements OnInit {
    private isOnlineCheckLoaded = false;
    private offlineCheckKey = Constants.offlineIdCheck;
    private onlineCheckKey = Constants.onlineIdCheck;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ,
                  private viewContainerRef : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
        } else {
            const control = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
            control.setValidators(Validators.required);
            control.updateValueAndValidity({onlySelf: false});
        }
    }

    private addOrRemoveOnlineIdCheck(typeOfCheck : string) {
        const optionalBlocks = clone(this.__custom.optionalBlocks);
        if (typeOfCheck === Constants.onlineIdCheck && !this.isOnlineCheckLoaded) {
            for (let optionalBlock of optionalBlocks) {
                optionalBlock.custom.applicantIndex = this.__custom.applicantIndex;
            }
            this.__loadAllNext(optionalBlocks, this.viewContainerRef).then(() => {
                setTimeout(() => {
                    this.onNext();
                }, 0);
            });
            this.isOnlineCheckLoaded = true;
            return;
        }
        if (typeOfCheck === Constants.offlineIdCheck && this.isOnlineCheckLoaded ) {
            for ( let i = 0; i <= optionalBlocks.length; i++ ) {
                this.__removeNext(this.viewContainerRef);
            }
            this.isOnlineCheckLoaded = false;
            this.onNext();
            return;
        }
        this.onNext();
    }

    private onIdCheckSelection ( typeOfCheck : string ) {
        const onlineOrOffline = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        onlineOrOffline.setValue( typeOfCheck );
        onlineOrOffline.markAsTouched();
        this.addOrRemoveOnlineIdCheck( typeOfCheck );
    }
}
