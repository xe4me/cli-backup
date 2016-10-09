import { Injectable } from '@angular/core';

@Injectable()
export class AmpFileUploadService {
    public _tokenUrl : string = '/ddc/secure/api/upload/token';
    public _uploadUrl : string = '/ddc/secure/api/upload/upload';
    public _errorMessage : string = 'Error in uploading the file. Please try again';

    public get tokenUrl () : string {
        return this._tokenUrl;
    }

    public get uploadUrl () : string {
        return this._uploadUrl;
    }

    public get errorMessage () : string {
        return this._errorMessage;
    }
}
