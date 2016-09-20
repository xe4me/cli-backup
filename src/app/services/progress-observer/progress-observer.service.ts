import { Injectable , EventEmitter } from '@angular/core';
@Injectable()
export class ProgressObserverService {
    public $progressed : EventEmitter<any>;

    constructor () {
        this.$progressed = new EventEmitter();
    }

    public onProgress ( fdn ) {
        this.$progressed.emit( fdn );
    }
}
