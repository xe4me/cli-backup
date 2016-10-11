import {
    Injectable,
    EventEmitter
} from '@angular/core';

import {
    RequestOptions,
    Headers,
    Response
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

@Injectable()
export class SubmitService {

    public $saveMe   : EventEmitter<any> = new EventEmitter();
    public $response : EventEmitter<any> = new EventEmitter();
    public $error    : EventEmitter<any> = new EventEmitter();

    private _baseURL = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path + '/';
    private _relativeUrl = null;
    constructor(private http : AmpHttpService) {

        this.$saveMe.subscribe( (model) => {
                                if (!this._relativeUrl) {
                                    throw new Error('Relative URL not set in SubmitService!');
                                }
                                this.save(model)
                                    .subscribe ( (response) => {
                                        this.$response.emit(response.json());
                                    }, (error) =>   {
                                        if (error) {
                                            this.$error.emit(error);
                                        }
                                    });
                              });
    }

    public setRelativeUrl (relativeUrl : string) {
        this._relativeUrl = relativeUrl;
    }

    public save (model) : Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._baseURL + this._relativeUrl, JSON.stringify(model), options);
    }
}
