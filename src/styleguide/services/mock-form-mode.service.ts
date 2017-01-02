import { Observable } from 'rxjs/Observable';
export class MockFormModelService {
    private model = {
        currentBlockClassName : 'IntroBlockComponent',
        errors                : [],
        currentBlockID        : null,         // Defaults to the first block on the current page
        context               : {
            licensee                   : 'DEA_CHARTER',
            practicePrincipalFirstName : 'Darren',
            practicePrincipalLastName  : 'Mink',
            payeeId                    : 'BCABB-F',
            practiceName               : 'Pinnancle Financial pty ltd'
        },
        contactDetails        : {
            email : 'sample@gmail.com',
            phone : '12121212'
        },
        advisers              : [],
        flags                 : {
            introIsDone                  : false,
            contactDetailsIsDone         : false,
            partnershipIsDone            : false,
            equityHoldersIsDone          : false,
            fullOrPartialIsDone          : false,
            practiceAssociationIsDone    : false,
            isOveralOverlayActive        : false,
            practiceAssociationIsVisible : false
        }
    };

    getContext () : Observable<string> {
        return Observable.create(
            ( observer ) => {
                observer.onNext(
                    {
                        licensee                   : 'DEA_CHARTER',
                        practicePrincipalFirstName : 'Darren',
                        practicePrincipalLastName  : 'Mink',
                        payeeId                    : 'BCABB-F',
                        practiceName               : 'Pinnancle Financial pty ltd'
                    } );
                observer.onCompleted();
                return () => {
                    // Clean up logic
                };
            } );
    }

    getContactDetails () : Observable<string> {
        return Observable.create(
            ( observer ) => {
                observer.onNext(
                    {
                        email : 'sample@gmail.com',
                        phone : '12121212'
                    } );
                observer.onCompleted();
                return () => {
                    // Clean up logic
                };
            } );
    }

    getFlags ( flag ) {
        return this.model.flags[ flag ];
    }

    present ( data ) {
        this.model.currentBlockID = data;
    }

    public get currentComponent () {
        return this.model.currentBlockClassName;
    }

    public setCurrentBlock ( class_name : string ) {
        this.model.currentBlockClassName = class_name;
    }

    getModel () {
        return this.model;
    }
}
