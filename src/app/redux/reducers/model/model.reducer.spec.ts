import 'rxjs/add/operator/let';
import { of } from 'rxjs/observable/of';
import { ModelActions } from '../../actions/model/model.action';
import modelReducer from './model.reducer';
const TestModel = require( '../../fixtures/model/test.model.json' );
interface Array<T> {
    last() : Array<T>;
}
if ( ! (<any>Array.prototype).last ) {
    (<any>Array.prototype).last = function() {
        return this[ this.length - 1 ];
    };
}
describe( 'Model ' , function() {
    const modelActions = new ModelActions();
    describe( 'Reducer' , function() {
        it( 'should return the state untouched if the action is undefined' , function() {
            const initialState = modelReducer( TestModel , { type : 'test-action' } );
            expect( initialState ).toEqual( TestModel );
        } );
        it( 'should update the contactNumber in the model based on the fully distinguished name provider (fdn)' , function() {
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
            expect( state.Application.FirstInsuranceDetailsSection.samplefieldsblock.contactNumber ).toEqual( 'updated with redux' );
        } );
    } );
    // describe('Selectors', function() {
    //     describe('getBookEntities', function() {
    //         it('should get the entities table out of the books state', function() {
    //             const state = modelReducer(undefined, { type: 'test-action' });
    //
    //             of(state).let(fromBooks.getBookEntities()).subscribe(entities => {
    //                 expect(entities).toBe(state.entities);
    //             });
    //         });
    //     });
    //
    //     describe('getBook', function() {
    //         it('should get a selected book out of the books state', function() {
    //             const state: fromBooks.BooksState = {
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
    //             const state: fromBooks.BooksState = {
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
} );
