import { Injectable } from '@angular/core';
import { Headers , RequestOptions , Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Environments } from '../../../abstracts/environments/environments.abstract';
import { AmpHttpService } from '../../../services/amp-http/amp-http.service';
@Injectable()
export class AmpGreenIdServices {

    public static BASE_URL          = 'http://localhost:9000';

    public static DEFAULT_ERROR_TEXT = 'Server error';
    private headers                  = new Headers( {
        'Content-Type' : 'application/json' ,
        'caller'       : 'components'
    } );

    constructor ( private http : AmpHttpService ) {

    }

}
