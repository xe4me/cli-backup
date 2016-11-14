import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'sortByType'
})

export class AccountsListPipe implements PipeTransform {
    public transform ( data : Array<any> ) : any {
        return data.sort((a, b) => {
            return (a.bett3rAccountType === b.bett3rAccountType)
                ? 0 : (a.bett3rAccountType > b.bett3rAccountType ? 1 : -1 ) ;
        });
    }
}
