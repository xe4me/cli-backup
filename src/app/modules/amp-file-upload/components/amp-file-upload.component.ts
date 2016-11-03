import {
    Component,
    ChangeDetectorRef,
    Input,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import { AmpFileUploadService } from '../services/amp-file-upload.service';
import { humanizeBytes } from '../../../modules/amp-utils/functions.utils';
import { AmpLinearProgressBarComponent } from '../../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { Observable } from 'rxjs';
import { BaseControl } from '../../../../app/base-control';
import { EventEmitter } from '@angular/platform-browser';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    inputs          : [
        'id' ,
        'controlGroup'
    ] ,
    providers   : [ AmpFileUploadService ] ,
    directives  : [ AmpLinearProgressBarComponent ]
})
export class AmpFileUploadComponent extends BaseControl implements AfterViewInit {
    @ViewChild('fileInput') fileInput;
    @Input() uploadUrl : string;
    @Input() deleteUrl : string;
    @Input() tokenUrl : string;
    @Input() formName : string;
    @Input() formId : string;
    @Input() fileName : string;
    @Input() deleteFileName : string;
    @Input() description : string;
    @Input() size : number;

    public uploaded : EventEmitter<any>;

    public token : string;
    private progress : number = 0;
    private fileSize : string;
    private speed : string;
    private uploaded : string;
    private showProgress : boolean = false;
    private backendError : boolean = false;
    private error : boolean = false;
    private errorMessage : string;
    private uploadCompleted : boolean = false;
    private uploadUrlWithParms : string = '';
    private errorCodes : number[] = [ 400, 401, 404, 500, 503 ];
    private typesAllowed : string[] = [ 'application/pdf' ];
    private sizeAllowed : number = 1048576 * 2;

    constructor ( protected _cd : ChangeDetectorRef,
                  private fileUploadService : AmpFileUploadService
    ) {
        super();
    }

    ngAfterViewInit () : any {
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
        if ( this.fileName ) {
            this.fileSize = humanizeBytes( this.size );
            this.showProgress = true;
            this.uploadCompleted = true;
        }
        this.errorMessage = this.fileUploadService.errorMessage;
        this.fileUploadService.updateFormDetails( this.formName, this.formId );
        this.fileUploadService.onUpload.subscribe(( data : any ) => {
            this.handleUpload( data );
        });
        this.control.setErrors({error: 'file upload pending'});
        this._cd.detectChanges();
        return undefined;
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
        return !this.uploadCompleted;
    }

    private handleUpload ( response : any ) : void {
        let res : any;
        res = response.response ? JSON.parse( response.response ) : null;
        if ( res && (this.errorCodes.indexOf(res.statusCode) > -1 )) {
            this.setErrorMessage( res );
            this.uploadCompleted = true;
            this._cd.detectChanges();
            return null;
        }
        if (res && res.statusCode === 200 ) {
            this.deleteFileName = res ? res.payload.fileName : '';
            this.control.setErrors( null );
            this.uploadCompleted = true;
            this.uploaded.emit( res.payload );
            this._cd.detectChanges();
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
        this.uploadCompleted = false;
        this.control.setErrors( {error : 'file upload pending'} );
        let retrieveToken : Observable <any>;
        retrieveToken = this.fileUploadService.retrieveNewToken( );
        retrieveToken.subscribe(
            ( res : any ) => {
                let token = res.payload.token;
                this.uploadUrlWithParms = this.uploadUrl + '?formName=' + this.formName + '&id=' + this.formId
                    + '&token=' + token + '&description=' + this.description;
                this.backendError = false;
                // TODO: Change detection is not happening automatically
                this._cd.detectChanges();
            },
            ( error ) => {
                this.errorMessage = this.fileUploadService.errorMessage;
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
        this.error = false;
        let fileRemoved : Observable <any>;
        fileRemoved = this.fileUploadService.deleteFile( this.deleteFileName, this.formName, this.formId );
        fileRemoved.subscribe(
            ( res : any ) => {
                this.showProgress = false;
                this.control.setErrors({error: 'file upload pending'});
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
            error.message = 'File size Exceeds allowable limit of 2MB';
            this.setErrorMessage( error );
            return false;
        }
        return true;
    }
}
