import {
    Injectable,
    EventEmitter
} from '@angular/core';
@Injectable()
export class MockScrollService {
    public $scrolled : EventEmitter<any>;

    constructor () {
        this.$scrolled = new EventEmitter();
    }

    get scrollTop () : number {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
    public scrollMeOut(){}
}
