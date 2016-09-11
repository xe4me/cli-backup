import { Injectable } from "@angular/core";
import { FormGroup , FormControl } from "@angular/forms";
@Injectable()
export class FormService {
    public getControlFromGroup ( _fdn : any[] , _form  ) : FormControl {
        let _control = _form;
        for ( let i = 0 ; i < _fdn.length ; i ++ ) {
            if ( _control.contains( _fdn[ i ] ) ) {
                _control = (<any>_control).controls[ _fdn[ i ] ];
            }
        }
        return (<FormControl>_control);
    };
}