import {
    Injectable,
    EventEmitter
} from '@angular/core';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

@Injectable()
export class ProfileService {

    public $profileChanged : EventEmitter<any> = new EventEmitter<any>();

    private _profile    = { initialized : false };
    private _profileUrl = Environments.property.TamServicePath + Environments.property.GwPracticeService.EnvPath + Environments.property.GwPracticeService.Path + '/profile';

    constructor ( private http : AmpHttpService ) {
    }

    get profile () {
        return this._profile;
    }

    set profile ( profile ) {
        Object.assign( this._profile, profile );
        this._profile.initialized = true;
        this.$profileChanged.emit( this._profile );
    }

    public fetchProfile () : Observable<any> {
        let headers = new Headers( { 'Content-Type' : 'application/json' } );
        let options = new RequestOptions( { headers , body : '' } );
        return this.http.get( this._profileUrl, options )
                   .map( ( res ) => res.json() );
    }
}
