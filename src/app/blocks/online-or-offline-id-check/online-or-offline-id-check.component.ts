import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    OnInit ,
    ChangeDetectionStrategy ,
    ViewContainerRef
} from '@angular/core';
import { Validators , FormControl } from '@angular/forms';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
import { Constants } from '../../shared';
@Component( {
    selector        : 'online-or-offline-id-check-block' ,
    templateUrl     : './online-or-offline-id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class OnlineOrOfflineIdCheckBlock extends FormBlock implements OnInit {
    public isOnlineCheckLoaded = false;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ,
                  private viewContainerRef : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        this.__controlGroup.addControl( this.__custom.controls[ 0 ].id , new FormControl( null , Validators.required ) );
    }

    private addOrRemoveOnlineIdCheck ( typeOfCheck : string ) {
        if ( typeOfCheck === Constants.onlineIdCheck && ! this.isOnlineCheckLoaded ) {
            let onlineIdCheckBlock                   = this.__custom.optionalBlocks[ 0 ];
            onlineIdCheckBlock.custom.applicantIndex = this.__custom.applicantIndex;
            this.__loadNext( onlineIdCheckBlock , this.viewContainerRef ).then( ()=> {
                this.isOnlineCheckLoaded = true;
                this.onNext();
                return;
            } )
        } else if ( typeOfCheck === Constants.offlineIdCheck && this.isOnlineCheckLoaded ) {
            this.__removeNext( this.viewContainerRef ).then( ()=> {
                this.isOnlineCheckLoaded = false;
                this.onNext();
                return;
            } )
        } else {
            this.onNext();
        }
    }

    private onIdCheckSelection ( typeOfCheck : string ) {
        const onlineOrOffline = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        onlineOrOffline.setValue( typeOfCheck );
        onlineOrOffline.markAsTouched();
        this.addOrRemoveOnlineIdCheck( typeOfCheck );
    }
}
