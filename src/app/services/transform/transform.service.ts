import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {
    private _formData : any;
    private _transformedData : any;
    private _isTransformed : boolean = false;

    get transformedData() : any {
        return this._transformedData;
    }

    set transformedData( value : any ) {
        this._transformedData = value;
    }
    get formData() : any {
        return this._formData;
    }

    set formData( value : any ) {
        this._formData = value;
    }

    set isTransformedFormData ( value : boolean ) {
        this._isTransformed = value;
    }

    get isTransformedFormData () : boolean {
        return this._isTransformed;
    }

    public transform ( value ) {
        this._formData = value;
        return this._formData;
    }
}
