import { Subject } from 'rxjs';
export function TakeUntilDestroy ( constructor ) {
    let original                           = constructor.prototype.ngOnDestroy;
    let subject;
    constructor.prototype.componentDestroy = function () {
        subject = new Subject();
        return subject.asObservable();
    };
    constructor.prototype.ngOnDestroy      = function () {
        if ( original && typeof original === 'function' ) {
            original.apply( this, arguments );
        }
        subject.next( 'ngOnDestroy' );
        subject.unsubscribe();
    };
}
