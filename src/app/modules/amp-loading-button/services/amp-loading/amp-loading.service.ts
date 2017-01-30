import {
    Injectable,
    EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import {
    Response,
    Request
} from '@angular/http';
import { ErrorService } from '../../../../services/error/error.service';
export interface LoadingMessage {
    isLoading : boolean;
    url : string|Request;
}
@Injectable()
export class AmpLoadingService {

    public $loading = new EventEmitter<LoadingMessage>();

    private isLoading : boolean = false;

    public emitLoading ( options : LoadingMessage ) {
        this.isLoading = options.isLoading;
        this.$loading.emit( options );
    }

    public intercept ( obs : Observable<Response>, url : string|Request ) : Observable<Response> {
        this.emitLoading( {
            url,
            isLoading : true
        } );
        return obs
            .catch( ( error ) => {
                return ErrorService.handleError( error );
            } )
            .finally( () => {
                this.emitLoading( {
                    url,
                    isLoading : false
                } );
            } );
    }
}
