import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Input , Component , ContentChild , AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModelActions , Payload } from '../../actions/model/model.action';
import { FormControl } from '@angular/forms';
@Component( {
    selector : 'amp-redux' ,
    template : `<ng-content></ng-content>`
} )
export class AmpReduxComponent implements AfterViewInit {
    @Input( 'debounce-time' ) debounceTime : number = 300;
    @Input( 'fdn' ) fdn : string[]                  = [];
    @ContentChild( 'ampReduxRef' ) ampReduxRef;

    constructor ( public store : Store<any> , private _modelActions : ModelActions ) {
    }

    ngAfterViewInit () : void {
        if ( this.ampReduxRef ) {
            let childFormControl : FormControl = this.ampReduxRef.control;
            if ( childFormControl ) {
                childFormControl
                    .valueChanges
                    .debounceTime( this.debounceTime )
                    .distinctUntilChanged()
                    .subscribe( ( query ) => {
                        this.dispatch( query , this.fdn );
                    } );
            }
        }
    }

    dispatch ( query : string , fdn : string[] ) {
        let payload : Payload = {
            query : query ,
            fdn   : fdn
        };
        this.store.dispatch( this._modelActions.update( payload ) );
    }
}
