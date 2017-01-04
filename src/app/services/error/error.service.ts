import { Observable } from 'rxjs';
export class ErrorService {

    public static defaultErrorMessage = 'Server error';

    public static handleError ( error : any ) {
        let errMsg = (error.message) ? error.message : error.status ? error.status : ErrorService.defaultErrorMessage;
        return Observable.throw( errMsg );
    }
}
