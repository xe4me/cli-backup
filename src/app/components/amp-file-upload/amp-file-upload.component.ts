import { Component,
         OnInit,
         ChangeDetectorRef,
         Input,
         ViewChild } from '@angular/core';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { Http,
         Response } from '@angular/http';
import { AmpButton } from '../../components/amp-button/amp-button.component';
import { AmpLinearProgressBarComponent } from '../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { AmpFileUploadService } from '../../services/amp-file-upload/amp-file-upload.service';
import { humanizeBytes } from '../../modules/amp-utils/functions.utils';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    directives  : [ UPLOAD_DIRECTIVES, AmpButton, AmpLinearProgressBarComponent ],
    providers   : [ AmpFileUploadService ]
})
export class AmpFileUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    @Input() uploadUrl : string;
    @Input() tokenUrl : string;
    @Input() formName : string;
    @Input() formId : string;
    @Input() enableVirusScan : string;

    public token : string;
    private basicOptions : Object;
    private progress : number = 0;
    private fileName : string;
    private fileSize : string;
    private speed : string;
    private uploaded : string;
    private showProgress : boolean = false;
    private backendError : boolean = false;
    private error : boolean = false;
    private errorMessage : string;
    private uploadUrlWithParms : string = '';

    constructor ( protected _cd : ChangeDetectorRef,
                  private http : Http,
                  private fileUploadService : AmpFileUploadService,
                    ) {
    }

    ngOnInit() {
        // Get the urls from fileUploadService if it is not passed as input
        if ( !this.tokenUrl ) {
            this.tokenUrl = this.fileUploadService.tokenUrl;
        }
        if ( !this.uploadUrl ) {
            this.uploadUrl = this.fileUploadService.uploadUrl;
        }
        this.errorMessage = this.fileUploadService.errorMessage;
        this.basicOptions = {
            calculateSpeed: true
        };
        this.fileUploadService.onUpload.subscribe(( data: any ) => {
            this.handleUpload( data );
        });
    }

    private displayProgress ( ) : void {
        this.error = this.backendError;
        this.showProgress = !this.error;
        this.fileUploadService.updateUrl( this.uploadUrlWithParms );
        let files = Array.from( this.fileInput.nativeElement.files );
        this.fileUploadService.addFilesToQueue( files );
    }

    private showProgressBar ( ) : boolean {
        return this.progress < 1 ? true : false;
    }

    private handleUpload ( response : any ) : void {
        let res : any;
        if ( response.response && response.status !== 404 ) {
            res = JSON.parse( response.response );
        }
        this._cd.detectChanges();
        this.fileName = response.originalName;
        this.fileSize = humanizeBytes( response.size );
        this.speed = response.speedAverageHumanized ? response.speedAverageHumanized : response.progress.speedHumanized;
        this.uploaded = humanizeBytes((( response.size * response.progress.percent ) / 100));
        this.progress = response.progress.percent / 100;
        if ( (res && res.statusCode !== 200) || response.status === 404 ) {
            this.setErrorMessage( res );
        }
    }

    private updateToken () : void {
        this.fileInput.nativeElement.value = null;
        this.error = false;
        this.http.get( this.tokenUrl )
            .map( ( res : Response ) => res.json() )
            .subscribe(
                ( res : any ) => {
                    this.token = res.payload.token;
                    this.uploadUrlWithParms = this.uploadUrl + '?formName=' + this.formName + '&objectId=' + this.formId
                                            + '&enableVirusScan=' + this.enableVirusScan + '&token=' + this.token;
                    this.basicOptions = {
                        url : this.uploadUrlWithParms,
                        calculateSpeed : true
                    };
                    this.backendError = false;
                },
                ( error ) => {
                    this.backendError = true;
                }
            );
    }

    private setErrorMessage ( res : any ) : void {
        this.error = true;
        this.showProgress = !this.error;
        this.errorMessage = res ? res.message : this.errorMessage;
    }
}
