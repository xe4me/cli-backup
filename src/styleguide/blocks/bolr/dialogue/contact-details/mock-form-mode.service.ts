import { Observable }     from 'rxjs/Observable';
import { BlockID } from 'amp-ddc-ui-core/ui-core';
export class MockFormModelService {
    private model = {
        currentBlockClassName : 'IntroBlockComponent' ,
        errors                : [] ,
        currentBlockID        : new BlockID( null , 0 ) ,         // Defaults to the first block on the current page
        context               : {
            licensee                    : 'LIC_CHARTER' ,
            practicePrincipal_firstName : 'Darren' ,
            practicePrincipal_lastName  : 'Mink' ,
            payeeId                     : 'BCABB-F' ,
            practiceName                : 'Pinnancle Financial pty ltd'
        } ,
        contactDetails        : {
            email : 'sample@gmail.com' ,
            phone : '12121212'
        } ,
        advisers              : [] ,
        flags                 : {
            introIsDone                  : false ,
            contactDetailsIsDone         : false ,
            partnershipIsDone            : false ,
            equityHoldersIsDone          : false ,
            fullOrPartialIsDone          : false ,
            practiceAssociationIsDone    : false ,
            isOveralOverlayActive        : false ,
            practiceAssociationIsVisible : false
        }
    };

    getContext () : Observable<string> {
        return Observable.create(
            function( observer ) {
                observer.onNext(
                    {
                        licensee                    : 'LIC_CHARTER' ,
                        practicePrincipal_firstName : 'Darren' ,
                        practicePrincipal_lastName  : 'Mink' ,
                        payeeId                     : 'BCABB-F' ,
                        practiceName                : 'Pinnancle Financial pty ltd'
                    } );
                observer.onCompleted();
                return function() {
                    //Clean up logic
                };
            } );
    }

    getContactDetails () : Observable<string> {
        return Observable.create(
            function( observer ) {
                observer.onNext(
                    {
                        email : 'sample@gmail.com' ,
                        phone : '12121212'
                    } );
                observer.onCompleted();
                return function() {
                    //Clean up logic
                };
            } );
    }

    getFlags ( flag ) {
        return this.model.flags[ flag ];
    }

    present ( data ) {
        this.model.currentBlockID = new BlockID( null , 1 );
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
