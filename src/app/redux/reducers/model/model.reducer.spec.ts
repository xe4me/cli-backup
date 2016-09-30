import 'rxjs/add/operator/let';
import { of } from 'rxjs/observable/of';
import { ModelActions } from '../../actions/model/model.action';
import modelReducer from './model.reducer';
import { getIn } from '../../../modules/amp-utils';
const TestModel = require( '../../fixtures/model/test.model.json' );
interface Array<T> {
    last() : Array<T>;
}
if ( ! (<any> Array.prototype).last ) {
    (<any> Array.prototype).last = function() {
        return this[ this.length - 1 ];
    };
}
describe( 'Model' , function() {
    const modelActions = new ModelActions();
    describe( 'Reducer UPDATE' , function() {
        it( 'should return the state untouched if the action is undefined' , function() {
            const initialState = modelReducer( TestModel , { type : 'test-action' } );
            expect( initialState ).toEqual( TestModel );
        } );
        it( 'should update the contactNumber in the model based on the fully distinguished name provider (fdn),' +
            ' object lookup only' , function() {
            const fdn          = [
                'Application' ,
                'FirstInsuranceDetailsSection' ,
                'samplefieldsblock' ,
                'contactNumber'
            ];
            const payload      = {
                fdn   : fdn ,
                query : 'updated with redux'
            };
            const updateAction = modelActions.update( payload );
            expect( updateAction ).toEqual( {
                type    : ModelActions.UPDATE ,
                payload : payload
            } );
            const state = modelReducer( TestModel , updateAction );
            expect( state ).not.toEqual( TestModel );
            let updatedSection = getIn( fdn , state );
            expect( updatedSection.contactNumber ).toEqual( payload.query );
        } );
        it( 'should update the phone in telehpnes array in the model based on the fully distinguished name provider' +
            ' (fdn) ,' +
            ' array and object lookups' , function() {
            const fdn          = [
                'Application' ,
                'FirstInsuranceDetailsSection' ,
                'samplefieldsblock' ,
                'telephones' ,
                0 ,
                'phone'
            ];
            const payload      = {
                fdn   : fdn ,
                query : '321321321321'
            };
            const updateAction = modelActions.update( payload );
            expect( updateAction ).toEqual( {
                type    : ModelActions.UPDATE ,
                payload : payload
            } );
            const state = modelReducer( TestModel , updateAction );
            expect( state ).not.toEqual( TestModel );
            let updatedSection = getIn( fdn , state );
            expect( updatedSection.phone ).toEqual( payload.query );
        } );
    } );
    describe( 'Reducer PUSH' , function() {
        it( 'should Add an item to the specified array in the provider fdn' , function() {
            const fdn        = [
                'Application' ,
                'FirstInsuranceDetailsSection' ,
                'samplefieldsblock' ,
                'telephones'
            ];
            const payload    = {
                fdn   : fdn ,
                query : {
                    phone : 'new phone number'
                }
            };
            const pushAction = modelActions.push( payload );
            expect( pushAction ).toEqual( {
                type    : ModelActions.PUSH ,
                payload : payload
            } );
            const state = modelReducer( TestModel , pushAction );
            expect( state ).not.toEqual( TestModel );
            let updatedSection = getIn( fdn , state );
            expect( updatedSection.telephones.last() ).toEqual( payload.query );
        } );
    } );
    describe( 'Reducer REMOVE' , function() {
        it( 'should Remove specified item from the specified array in the provider fdn' , function() {
            const fdn        = [
                'Application' ,
                'FirstInsuranceDetailsSection' ,
                'samplefieldsblock' ,
                'telephones'
            ];
            const payload    = {
                fdn   : fdn ,
                query : 0
            };
            const pushAction = modelActions.removeAt( payload );
            expect( pushAction ).toEqual( {
                type    : ModelActions.REMOVE_AT ,
                payload : payload
            } );
            const state = modelReducer( TestModel , pushAction );
            expect( state ).not.toEqual( TestModel );
            let updatedSection = getIn( fdn , state );
            expect( updatedSection.telephones.length ).toEqual( 1 );
        } );
        it( 'should Remove all the items from the specified array in the provider fdn' , function() {
            const fdn        = [
                'Application' ,
                'FirstInsuranceDetailsSection' ,
                'samplefieldsblock' ,
                'telephones'
            ];
            const payload    = {
                fdn   : fdn ,
                query : null
            };
            const pushAction = modelActions.removeAll( payload );
            expect( pushAction ).toEqual( {
                type    : ModelActions.REMOVE_ALL ,
                payload : payload
            } );
            const state = modelReducer( TestModel , pushAction );
            expect( state ).not.toEqual( TestModel );
            let updatedSection = getIn( fdn , state );
            expect( updatedSection.telephones.length ).toEqual( 0 );
        } );
    } );
} );
//     describe('getBook', function() {
//         it('should get a selected book out of the books state', function() {
//             const state : fromBooks.BooksState = {
//                 entities: {
//                     [TestBook.id]: TestBook
//                 },
//                 ids: [ TestBook.id ]
//             };
//
//             of(state).let(fromBooks.getBook(TestBook.id)).subscribe(book => {
//                 expect(book).toBe(TestBook);
//             });
//         });
//     });
//
//     describe('getBooks', function() {
//         it('should return all of the books in an array for a given list of ids', function() {
//             const state : fromBooks.BooksState = {
//                 entities: {
//                     [TestBook.id]: TestBook
//                 },
//                 ids: [ TestBook.id ]
//             };
//
//             of(state).let(fromBooks.getBooks([ TestBook.id ])).subscribe(books => {
//                 expect(books).toEqual([ TestBook ]);
//             });
//         });
//     });
// });
