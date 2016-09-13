import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class ProgressObserverService {
    public $progressed : EventEmitter<any>;

    public onProgress () {
        this.$progressed.emit( 'progressed' );
    }

    constructor () {
        this.$progressed = new EventEmitter();
    }
}
