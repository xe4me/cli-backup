import { Injectable , EventEmitter } from '@angular/core';
@Injectable()
export class ProgressObserverService {
    public $progressed : EventEmitter<any>;

    public onProgress ( fdn ) {
        this.$progressed.emit( fdn );
    }

    constructor () {
        this.$progressed = new EventEmitter();
    }
}
