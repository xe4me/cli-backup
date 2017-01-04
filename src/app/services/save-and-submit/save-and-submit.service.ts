import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../error/error.service';
import { SaveService } from '../save/save.service';
import { SubmitService } from '../submit/submit.service';

@Injectable()
export class SaveAndSubmitService {
    constructor ( private saveService : SaveService, private submitService : SubmitService ) {
    }

    public saveAndSubmit ( model, referenceId = null, overrideUrls : { saveUrl?, submitUrl? } = {} ) : Observable<any> {
        let saveAndSubmitReplay =
                this.saveService.save( model, overrideUrls.saveUrl )
                    .flatMap( ( saveResponse ) => this.submitService.submit( referenceId ? referenceId : saveResponse.referenceId, overrideUrls.submitUrl ) )
                    .catch( ErrorService.handleError )
                    .publishReplay( 1 );
        saveAndSubmitReplay.connect();
        return saveAndSubmitReplay;
    }
}
