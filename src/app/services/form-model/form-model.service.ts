import {
    Injectable,
    EventEmitter
} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { HydrationService } from '../../services/hydration/hydration.service';

@Injectable()
export class FormModelService {
    public $hydrateForm : EventEmitter<any> = new EventEmitter();
    public form : FormGroup                 = new FormGroup( {} );

    private _formDefinition;
    private _storedModel;

    constructor ( private hydrationService : HydrationService ) {

    }

    public storeModelAndHydrateForm ( _model ) {
        this.storeModel( _model );
        this.hydrateForm( _model );
    }

    public hydrateForm ( newModel : any = this._storedModel ) : FormGroup {
        if ( !newModel ) {
            return this.form;
        }
        this.form = this.hydrationService.hydrate( newModel );
        this.$hydrateForm.emit( this.form );
        return this.form;
    }

    public storeModel ( _model ) {
        this._storedModel = _model;
    }

    public get storedModel () {
        return this._storedModel;
    }

    public get formDefinition () {
        return this._formDefinition;
    }

    public set formDefinition ( formDef ) {
        this._formDefinition = formDef;
    }

}
