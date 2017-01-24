import {
    Injectable,
    EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { ErrorService } from '../../../../services/error/error.service';
@Injectable()
export class AmpLoadingService {

    public $loading = new EventEmitter<boolean>();

    private _showLoading : boolean = false;

    get showLoading () {
        return this._showLoading;
    }

    set showLoading ( showLoading ) {
        this.$loading.emit( showLoading );
        this._showLoading = showLoading;
    }

    public intercept ( obs : Observable<Response> ) : Observable<Response> {
        this.showLoading = true;
        return obs
            .catch( ( error ) => {
                this.showLoading = false;
                return ErrorService.handleError( error );
            } )
            .do( res => {
                this.showLoading = false;
                return res;
            } )
    }
}
