import { Injectable } from '@angular/core';
import {
    Observable,
    Subject
} from 'rxjs';

const loginUserWithoutEligibleAccounts = require('./data/eligible-accounts-no-accounts.json');
const loginUserwithDepositAccountsOnly = require('./data/eligible-accounts-deposit-accounts-only.json');
const loginUserwithLoanAccountsOnly = require('./data/eligible-accounts-loan-accounts-only.json');
const loginUserWithDepositAndLoanAccountsOnly = require('./data/eligible-accounts-deposit-and-loan-accounts-only.json');
const loginUserWithLoanAndOffsetAccountsOnly = require('./data/eligible-accounts-loan-and-offset-accounts-only.json');
const loginUserWithDepositLoanAndOffsetAccounts = require('./data/eligible-accounts-deposit-loan-and-offset-accounts.json');

@Injectable()
export class MockEligibleAccountsService {

    public accounts : any = {
        LOGIN_NO_ACCOUNTS : loginUserWithoutEligibleAccounts,
        LOGIN_DEPOSITS_ACCOUNTS_ONLY: loginUserwithDepositAccountsOnly,
        LOGIN_LOAN_ACCOUNTS_ONLY : loginUserwithLoanAccountsOnly,
        LOGIN_DEPOSIT_AND_LOAN_ACCOUNTS_ONLY : loginUserWithDepositAndLoanAccountsOnly,
        LOGIN_LOAN_AND_OFFSET_ACCOUNTS_ONLY : loginUserWithLoanAndOffsetAccountsOnly,
        LOGIN_DEPOSIT_LOAN_AND_OFFSET_ACCOUNTS : loginUserWithDepositLoanAndOffsetAccounts
    };

    private eligibleAccountsSubject : Subject<any>;

    constructor () {
        this.eligibleAccountsSubject = new Subject();
    }

    public getEligibleAccounts () : Observable<any> {
        return this.eligibleAccountsSubject;
    }

    public setEligibleAccounts ( account : any ) : void {
        this.eligibleAccountsSubject.next( account );
    }
}