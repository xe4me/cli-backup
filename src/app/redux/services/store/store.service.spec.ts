import 'rxjs/add/operator/let';
import { ModelActions } from '../../actions/model/model.action';
import { getIn } from '../../../modules/amp-utils';
import { StoreService } from './store.service';
import { AmpReduxModule } from '../../amp-redux.module';
import { Store } from '@ngrx/store';
import {
    async,
    TestBed,
    inject,
    tick,
    fakeAsync
} from '@angular/core/testing';

const TestModel = require( '../../fixtures/model/test.model.json' );
interface Array<T> {
    last() : T[];
}
if ( !(<any> Array.prototype).last ) {
    (<any> Array.prototype).last = () => {
        return this[ this.length - 1 ];
    };
}
describe( 'Store Service', () => {
    const modelActions = new ModelActions();
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports : [
                AmpReduxModule,
                AmpReduxModule.provideAmpStore( TestModel ),
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ StoreService, Store ], ( storeService : StoreService, store : Store<any> ) => {
    } ) );
    describe( 'Select', () => {
        it( 'it should get section corresponded to fdn from the store',
            inject( [ StoreService ], ( storeService : StoreService ) => {
                const fdn   = [
                    'Application',
                    'FirstInsuranceDetailsSection',
                    'samplefieldsblock',
                    'telephones'
                ];
                let section = getIn( fdn, TestModel );
                storeService.select( fdn ).subscribe( ( telephones ) => {
                    expect( telephones ).toEqual( section.telephones );
                } );
            } )
        );
        it( 'it should update the store and then the subscriber should get that change',
            inject( [ StoreService, Store ], ( storeService : StoreService, store : Store<any> ) => {
                let updated   = false;
                const fdn     = [
                    'Application',
                    'FirstInsuranceDetailsSection',
                    'samplefieldsblock',
                    'contactNumber'
                ];
                const payload = {
                    fdn,
                    query : 'updated with redux'
                };
                storeService.select( fdn ).subscribe( ( contactNumber ) => {
                    if ( updated ) {
                        expect( contactNumber ).toEqual( payload.query );
                    } else {
                        expect( contactNumber ).toEqual( null );
                    }
                } );
                const updateAction = modelActions.update( payload );
                expect( updateAction ).toEqual( {
                    type : ModelActions.UPDATE,
                    payload
                } );
                updated = true;
                store.dispatch( updateAction );
            } )
        );
        it( 'subscriber to the store should only called once if the update has not met debounceTime',
            inject( [ StoreService, Store ], ( storeService : StoreService, store : Store<any> ) => {
                let updated   = false;
                let called    = 0;
                const fdn     = [
                    'Application',
                    'FirstInsuranceDetailsSection',
                    'samplefieldsblock',
                    'contactNumber'
                ];
                const payload = {
                    fdn,
                    query : 'updated with redux'
                };
                storeService.select( fdn ).subscribe( ( contactNumber ) => {
                    if ( updated ) {
                        called++;
                        expect( contactNumber ).toEqual( payload.query );
                        expect( called ).toBe( 1 );
                    } else {
                        expect( contactNumber ).toEqual( null );
                    }
                } );
                const updateAction = modelActions.update( payload );
                expect( updateAction ).toEqual( {
                    type : ModelActions.UPDATE,
                    payload
                } );
                updated = true;
                store.dispatch( updateAction );
                store.dispatch( updateAction );
                store.dispatch( updateAction );
            } )
        );
        it( 'subscriber to the store should only called once if the update has not actually changed the model',
            fakeAsync( inject( [ StoreService, Store ], ( storeService : StoreService, store : Store<any> ) => {
                    let updated   = false;
                    let called    = 0;
                    const fdn     = [
                        'Application',
                        'FirstInsuranceDetailsSection',
                        'samplefieldsblock',
                        'contactNumber'
                    ];
                    const payload = {
                        fdn,
                        query : 'updated with redux'
                    };
                    storeService.select( fdn ).subscribe( ( contactNumber ) => {
                        if ( updated ) {
                            called++;
                            expect( contactNumber ).toEqual( payload.query );
                            expect( called ).toBe( 1 );
                        } else {
                            expect( contactNumber ).toEqual( null );
                        }
                    } );
                    const updateAction = modelActions.update( payload );
                    expect( updateAction ).toEqual( {
                        type : ModelActions.UPDATE,
                        payload
                    } );
                    updated = true;
                    store.dispatch( updateAction );
                    setTimeout( () => {
                        store.dispatch( updateAction );
                    }, 1800 );
                    tick( 1800 );
                }
            ) )
        );
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
} );
