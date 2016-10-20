import { Injectable,
         EventEmitter,
         Output
} from '@angular/core';
import {
         Http,
         Response,
         Headers,
         RequestOptions
} from '@angular/http';
import { UploadStatus } from './upload-status.class';
import { humanizeBytes } from '../../modules/amp-utils/functions.utils';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { Observable } from 'rxjs';
import { AmpHttpService } from '../../services/amp-http/amp-http.service';

@Injectable()
export class AmpFileUploadService {
    public static BASE_URL          = Environments.property.ApiCallsBaseUrl;

    @Output() onUpload : EventEmitter<any> = new EventEmitter();

    public _tokenUrl : string = AmpFileUploadService.BASE_URL + '/upload/token';
    public _uploadUrl : string = AmpFileUploadService.BASE_URL + '/upload/upload';
    public _deleteUrl : string = AmpFileUploadService.BASE_URL + '/upload/delete';
    public _errorMessage : string = 'Error in uploading the file. Please try again';
    private _formName : string;
    private _formId : string;

    private _queue : any[] = [];

    constructor ( private http : Http,
                  private ampHttp : AmpHttpService  ) {
    }

    public get tokenUrl () : string {
        return this._tokenUrl;
    }

    public setTokenUrl ( url : string ) : void {
        this._tokenUrl = url;
    }

    public get uploadUrl () : string {
        return this._uploadUrl;
    }

    public get deleteUrl () : string {
        return this._deleteUrl;
    }

    public get errorMessage () : string {
        return this._errorMessage;
    }

    public updateUrl ( url : string ) : void {
        this._uploadUrl = url;
    }

    public updateFormDetails ( formName : string, formId : string ) : void {
        this._formName = formName;
        this._formId = formId;
    }

    public retrieveNewToken ( ) : Observable<any> {
        let headers  = new Headers( {
                'Content-Type' : 'application/json' ,
                'caller'       : 'components'
            } );
        let options = new RequestOptions( {
            body : '' ,
            headers : headers
        } );
        return this.ampHttp.get( this.tokenUrl, options )
            .map( ( res : Response ) => res.json() );
    }

    public addFilesToQueue( files : any ) : void {
        this._queue = [];
        files.forEach(( file : File ) => {
            if (this.isFile( file )) {
                this._queue.push( file );
            }
        });
        this.uploadFilesInQueue();
    }

    public uploadFilesInQueue( ) : void {
        this._queue.forEach(( f ) => {
            this.uploadFile( f );
        });
    };

    public deleteFile ( fileName : string, formName : string, formId : string ) : Observable<any> {
        let deleteUrlwithParms : string;
        deleteUrlwithParms = this._deleteUrl + '?fileName=' + fileName + '&formName=' + formName + '&objectId=' + formId;
        return this.ampHttp.post( deleteUrlwithParms, {}, {} )
                        .map( ( res : Response ) => res.json() );
    }

    private isFile( file : any ) : boolean {
        return file !== null && ( file instanceof Blob || ( file.name && file.size ));
    }

    private uploadFile( file : any ) : void {
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append('file', file, file.name);

        let uploadingFile = new UploadStatus(
            file.name,
            file.size
        );

        let time : number = new Date().getTime();
        let load : number = 0;
        let speed : number = 0;
        let speedHumanized : string = null;

        xhr.upload.onprogress = ( e : ProgressEvent ) => {
            if ( e.lengthComputable ) {
                time = new Date().getTime() - time;
                load = e.loaded - load;
                speed = load / time * 1000;
                speed = parseInt( <any> speed, 10 );
                speedHumanized = humanizeBytes(speed);

                let percent = Math.round( e.loaded / e.total * 100 );
                let progressStatus : Object = {
                    total: e.total,
                    loaded: e.loaded,
                    percent: percent
                };
                if ( speed !== 0 ) {
                    Object.assign( progressStatus,
                        {
                            speed,
                            speedHumanized
                        });
                }
                uploadingFile.setProgress( progressStatus );
            }
            this.onUpload.emit( uploadingFile );
        };

        xhr.upload.onabort = ( e : Event ) => {
            uploadingFile.setAbort();
            this.onUpload.emit( uploadingFile );
        };

        xhr.upload.onerror = ( e : Event ) => {
            uploadingFile.setError();
            this.onUpload.emit( uploadingFile );
        };

        xhr.onreadystatechange = () => {
            if ( xhr.readyState === XMLHttpRequest.DONE ) {
                uploadingFile.onFinished(
                    xhr.status,
                    xhr.statusText,
                    xhr.response
                );
            }
            this.onUpload.emit( uploadingFile );
        };
        let BASIC_AUTH_BEARER = 'Bearer ';
        xhr.open('POST', this._uploadUrl, true);
        xhr.setRequestHeader( 'Cache-Control' , 'no-cache' );
        xhr.setRequestHeader( 'caller' , 'components' );
        if ( this._uploadUrl.indexOf( Environments.property.GwPracticeService.Path ) > - 1 ) {
            xhr.setRequestHeader( 'apikey' , BASIC_AUTH_BEARER + Environments.property.GwPracticeService.ApiKey );
        } else if ( this._uploadUrl.indexOf( Environments.property.GwDDCService.Path ) > - 1 ) {
            xhr.setRequestHeader( 'apikey' , BASIC_AUTH_BEARER + Environments.property.GwDDCService.ApiKey );
        }
        xhr.send(form);
    }
}
