import { Component,
         OnInit,
         ChangeDetectorRef,
         Input,
         ViewChild } from '@angular/core';
import { AmpFileUploadService } from '../services/amp-file-upload.service';
import { humanizeBytes } from '../../../modules/amp-utils/functions.utils';
import { AmpLinearProgressBarComponent } from '../../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { Observable } from 'rxjs';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    providers   : [ AmpFileUploadService ] ,
    directives  : [ AmpLinearProgressBarComponent ]
})
export class AmpFileUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    @Input() title : string;
    @Input() text : string;
    @Input() uploadUrl : string;
    @Input() deleteUrl : string;
    @Input() tokenUrl : string;
    @Input() formName : string;
    @Input() formId : string;

    public token : string;
    private progress : number = 0;
    private fileName : string;
    private deleteFileName : string;
    private fileSize : string;
    private speed : string;
    private uploaded : string;
    private showProgress : boolean = false;
    private backendError : boolean = false;
    private error : boolean = false;
    private errorMessage : string;
    private uploadUrlWithParms : string = '';
    private errorCodes : number[] = [ 400, 401, 404, 500, 503 ];
    private typesAllowed : string[] = [ 'application/pdf' ];
    private sizeAllowed : number = 2000000;

    constructor ( protected _cd : ChangeDetectorRef,
                  private fileUploadService : AmpFileUploadService,
                    ) {
    }

    ngOnInit() {
        // Get the urls from fileUploadService if it is not passed as input
        if ( this.tokenUrl ) {
            this.fileUploadService.setTokenUrl( this.tokenUrl );
        }
        if ( !this.uploadUrl ) {
            this.uploadUrl = this.fileUploadService.uploadUrl;
        }
        if ( !this.deleteUrl ) {
            this.deleteUrl = this.fileUploadService.deleteUrl;
        }
        this.errorMessage = this.fileUploadService.errorMessage;
        this.fileUploadService.updateFormDetails( this.formName, this.formId );
        this.fileUploadService.onUpload.subscribe(( data : any ) => {
            this.handleUpload( data );
        });
    }

    private displayProgress ( ) : void {
        if ( this.backendError ) {
            this.setErrorMessage( null );
            return null;
        }
        this.error = this.backendError;
        this.showProgress = !this.error;
        this.fileUploadService.updateUrl( this.uploadUrlWithParms );
        let files = Array.from( this.fileInput.nativeElement.files );
        let isValidFile = this.validateFile( files[0] );
        if ( isValidFile ) {
            this.fileUploadService.addFilesToQueue( files );
        }
    }

    private showProgressBar ( ) : boolean {
        return this.progress < 1 ? true : false;
    }

    private handleUpload ( response : any ) : void {
        let res : any;
        res = response.response ? JSON.parse( response.response ) : null;
        if ( res && (this.errorCodes.indexOf(res.statusCode) > -1 )) {
            this.setErrorMessage( res );
            return null;
        }
        if (res && res.statusCode === 200 ) {
            this.deleteFileName = res ? res.payload.fileName : '';
            return null;
        }
        this.fileName = response.originalName;
        this.fileSize = humanizeBytes( response.size );
        this.speed = response.progress.speedHumanized ? response.progress.speedHumanized : this.speed;
        this.uploaded = humanizeBytes((( response.size * response.progress.percent ) / 100));
        this.progress = response.progress.percent / 100;
        this._cd.detectChanges();
    }

    private updateToken () : void {
        this.fileInput.nativeElement.value = null;
        this.error = false;
        let retrieveToken : Observable <any>;
        retrieveToken = this.fileUploadService.retrieveNewToken( );
        retrieveToken.subscribe(
            ( res : any ) => {
                let token = res.payload.token;
                this.uploadUrlWithParms = this.uploadUrl + '?formName=' + this.formName + '&objectId=' + this.formId
                    + '&token=' + token;
                this.backendError = false;
                // TODO: Change detection is not happening automatically
                this._cd.detectChanges();
            },
            ( error ) => {
                this.backendError = true;
                this._cd.detectChanges();
            }
        );
    }

    private setErrorMessage ( res : any ) : void {
        this.error = true;
        this.showProgress = !this.error;
        this.errorMessage = res ? res.message : this.errorMessage;
        this._cd.detectChanges();
    }

    private removeFile () : void {
        let fileRemoved : Observable <any>;
        fileRemoved = this.fileUploadService.deleteFile( this.deleteFileName, this.formName, this.formId );
        fileRemoved.subscribe(
            ( res : any ) => {
                this.showProgress = false;
                this._cd.detectChanges();
            },
            ( error ) => {
                this.error = true;
                this.errorMessage = 'Error in deleting file';
                this._cd.detectChanges();
            }
        );
    }

    private validateFile ( file : any ) : boolean {
        let error : any = {
            message : ''
        };
        if ( !(file.type.indexOf( this.typesAllowed ) > -1 )) {
            error.message = 'Invalid file type';
            this.setErrorMessage( error );
            return false;
        }
        if ( !(file.size <= this.sizeAllowed ) ) {
            console.log(file.size);
            error.message = 'File size Exceeds allowable limit of 1MB';
            this.setErrorMessage( error );
            return false;
        }
        return true;
    }
}
