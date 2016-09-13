import { getIn } from '../../util/functions.utils';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class StoreService {
    public distinctSelect ( _fdn ) : Observable<any> {
        return this.select( _fdn ).distinctUntilChanged();
    };

    public select ( _fdn ) : Observable<any> {
        return this.store.select( ( state ) => {
            let s = state;
            s     = getIn( _fdn , s );
            return s[ _fdn.last() ];
        } );
    };

    constructor ( private store : Store<any> ) {
    }
}

