import { Injectable,
         EventEmitter,
         Output
} from '@angular/core';
import { UploadStatus } from './upload-status.class';
import { humanizeBytes } from '../../modules/amp-utils/functions.utils';

@Injectable()
export class AmpFileUploadService {

    @Output() onUpload : EventEmitter<any> = new EventEmitter();

    public _tokenUrl : string = '/ddc/secure/api/upload/token';
    public _uploadUrl : string = '/ddc/secure/api/upload/upload';
    public _errorMessage : string = 'Error in uploading the file. Please try again';

    private _queue : any[] = [];

    public get tokenUrl () : string {
        return this._tokenUrl;
    }

    public get uploadUrl () : string {
        return this._uploadUrl;
    }

    public get errorMessage () : string {
        return this._errorMessage;
    }

    public updateUrl ( url : string ) : void {
        this._uploadUrl = url;
    }

    public addFilesToQueue( files : File[] ) : void {
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
        xhr.open('POST', this._uploadUrl, true);
        xhr.send(form);
    }
}
