import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component , Output , OnInit , Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store , provideStore } from '@ngrx/store';
import { ModelActions , Payload } from '../../../styleguide/blocks/amp-form-block/actions/model.action'
import { AmpInputComponent } from "../../components/amp-input/amp-input.component";
@Component( {
    selector   : 'amp-r-input' ,
    template   : `
        <amp-input
            [id]="'age'"
            [controlGroup]="controlGroup"
            (onKeyup)="keyup$.next($event)"
            >
        </amp-input>
  `
    ,
    directives : [ AmpInputComponent ] ,
    inputs     : [ 'controlGroup' ]
} )
export class AmpRInputComponent implements OnInit {
    keyup$                  = new Subject<KeyboardEvent>();
    @Input() fdn : string[] = [];
    private search : Observable<string>
                            = this.keyup$
                                  .debounceTime( 1000 )
                                  .map( event => (event.target as HTMLInputElement).value )
                                  .distinctUntilChanged();

    constructor ( public store : Store<any> , private _modelActions : ModelActions ) {
    }

    ngOnInit () {
        this.fdn = [ ...this.fdn , ...[ 'age' ] ];
        this.search.subscribe( ( query )=> {
            this.updateModel( query );
        } )
    }

    updateModel ( query : string ) {
        let payload : Payload = {
            query : query ,
            fdn   : this.fdn
        };
        this.store.dispatch( this._modelActions.updateModel( payload ) );
    }
}
