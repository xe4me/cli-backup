import { Component,
         OnInit,
         ChangeDetectorRef,
         Input,
         ViewChild } from '@angular/core';
import { Response,
         Headers,
         RequestOptions
} from '@angular/http';
import { AmpButton } from '../../components/amp-button/amp-button.component';
import { AmpLinearProgressBarComponent } from '../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { AmpFileUploadService } from '../../services/amp-file-upload/amp-file-upload.service';
import { humanizeBytes } from '../../modules/amp-utils/functions.utils';
import { Observable } from 'rxjs';
import { AmpHttpService } from '../../services/amp-http/amp-http.service';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    directives  : [ AmpButton, AmpLinearProgressBarComponent ],
    providers   : [ AmpFileUploadService ]
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
    private headers  = new Headers( {
        'Content-Type' : 'application/json' ,
        'caller'       : 'components'
    } );

    constructor ( protected _cd : ChangeDetectorRef,
                  private http : AmpHttpService,
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
        if ( !this.deleteUrl ) {
            this.deleteUrl = this.fileUploadService.deleteUrl;
        }
        this.errorMessage = this.fileUploadService.errorMessage;
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
        this.fileUploadService.addFilesToQueue( files );
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
        let options = new RequestOptions( { body : '' , headers : this.headers } );
        this.fileInput.nativeElement.value = null;
        this.error = false;
        this.http.get( this.tokenUrl, options )
            .map( ( res : Response ) => res.json() )
            .subscribe(
                ( res : any ) => {
                    this.token = res.payload.token;
                    this.uploadUrlWithParms = this.uploadUrl + '?formName=' + this.formName + '&objectId=' + this.formId
                                            + '&token=' + this.token;
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

    private removeFile () : void {
        let fileRemoved : Observable <any>;
        fileRemoved = this.fileUploadService.deleteFile( this.deleteFileName, this.formName, this.formId );
        fileRemoved.subscribe(
            ( res : any ) => {
                this.showProgress = false;
            },
            ( error ) => {
                this.error = true;
                this.errorMessage = 'Error in deleting file';
            }
        );
    }
}
