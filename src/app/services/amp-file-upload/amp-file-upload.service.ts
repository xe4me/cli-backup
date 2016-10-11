import {Injectable, EventEmitter, Output} from '@angular/core';
import { humanizeBytes } from '../../modules/amp-utils/functions.utils';

@Injectable()
export class AmpFileUploadService {

    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    public _tokenUrl : string = '/ddc/secure/api/upload/token';
    public _uploadUrl : string = '/ddc/secure/api/upload/upload';
    public _errorMessage : string = 'Error in uploading the file. Please try again';

    private _uploadUrl;
    private _queue: any[] = [];

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

    public addFilesToQueue( files: File[] ) : void {
        files.forEach(( file: File ) => {
            if (this.isFile( file )) {
                this._queue.push( file );
            }
        });
        this.uploadFilesInQueue();
    }

    private isFile( file: any ) : boolean {
        return file !== null && ( file instanceof Blob || ( file.name && file.size ));
    }

    uploadFilesInQueue( ) : void {
        let newFiles = this._queue.filter(( f ) => {
            return !f.uploading;
        });
        newFiles.forEach(( f ) => {
            this.uploadFile( f );
        });
    };

    uploadFile( file: any ): void {
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append('file', file, file.name);

        let uploadingFile = new UploadedFile(
            file.name,
            file.size
        );

        let time: number = new Date().getTime();
        let load = 0;
        let speed = 0;
        let speedHumanized: string = null;

        xhr.upload.onprogress = ( e: ProgressEvent ) => {
            if ( e.lengthComputable ) {
                time = new Date().getTime() - time;
                load = e.loaded - load;
                speed = load / time * 1000;
                speed = parseInt( <any>speed, 10 );
                speedHumanized = humanizeBytes(speed);

                let percent = Math.round( e.loaded / e.total * 100 );
                if ( speed === 0 ) {
                    uploadingFile.setProgress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: percent
                    });
                } else {
                    uploadingFile.setProgress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: percent,
                        speed: speed,
                        speedHumanized: speedHumanized
                    });
                }
            }
            this.onUpload.emit( uploadingFile );
        };

        xhr.upload.onabort = ( e: Event ) => {
            uploadingFile.setAbort();
            this.onUpload.emit( uploadingFile );
        };

        xhr.upload.onerror = ( e: Event ) => {
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


export class UploadedFile {
    status: number;
    statusText: string;
    progress: Object;
    originalName: string;
    size: number;
    response: string;
    done: boolean;
    error: boolean;
    abort: boolean;
    startTime: number;
    endTime: number;
    speedAverage: number;
    speedAverageHumanized: string;

    constructor( originalName : string, size : number) {
        this.originalName = originalName;
        this.size = size;
        this.progress = {
            loaded: 0,
            total: 0,
            percent: 0,
            speed: 0,
            speedHumanized: null
        };
        this.done = false;
        this.error = false;
        this.abort = false;
        this.startTime = new Date().getTime();
        this.endTime = 0;
        this.speedAverage = 0;
        this.speedAverageHumanized = null;
    }

    setProgress( progress: Object ) : void {
        this.progress = progress;
    }

    setError() : void {
        this.error = true;
        this.done = true;
    }

    setAbort() : void {
        this.abort = true;
        this.done = true;
    }

    onFinished( status: number, statusText: string, response: string ) : void {
        this.endTime = new Date().getTime();
        this.speedAverage = this.size / (this.endTime - this.startTime) * 1000;
        this.speedAverage = parseInt( <any>this.speedAverage, 10);
        this.speedAverageHumanized = humanizeBytes( this.speedAverage );
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.done = true;
    }
}
