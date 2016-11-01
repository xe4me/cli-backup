import { Store , provideStore , StoreModule } from '@ngrx/store';
import { Inject , SkipSelf , Injectable , Injector , ReflectiveInjector } from '@angular/core';
import { AmpReduxModule } from '../amp-redux.module';
import reducers from '../reducers/model/model.reducer';
export type PropertySelector = string | number | symbol;
export type PathSelector = (string | number)[];
export type FunctionSelector<T, S> = (( s : T ) => S);
export type FDNSelector = any[];
export type Comparator = ( x : any , y : any ) => boolean;
export type PropertyDecorator = ( target : any , propertyKey : string ) => void;
// export function Select<T> ( selector? : FDNSelector | PropertySelector | PathSelector | FunctionSelector<any, T> ,
//                             comparator? : Comparator ) : PropertyDecorator {
//     return function decorate ( target : any , key : string ) : void {
//         let injector = ReflectiveInjector.resolveAndCreate( [
//             AmpReduxModule.provideAmpStore().providers
//         ] );
//         let store    = injector.get( Store )
//         console.log( 'injector' , );
//         store.select( 'Application' ).subscribe( ( Application )=> {
//             console.log( 'Application' , Application );
//         } );
//         // console.log( 'injectore' , injector.get( Store ) );
//         // console.log( 'selector' , selector );
//         // console.log( 'target' , target );
//         // console.log( 'key' , key );
//         // console.log( 'Store' , Store );
//         // let storeInjector = new StoreInjector();
//         // console.log( '****** storeInjector store' , storeInjector.store );
//         // let bindingKey = selector;
//         // if ( ! selector ) {
//         //     bindingKey = (key.lastIndexOf( '$' ) === key.length - 1) ?
//         //         key.substring( 0 , key.length - 1 ) :
//         //         key;
//         // }
//         // function getter () {
//         //     return target.store.select( bindingKey , comparator );
//         // }
//         //
//         // // Replace decorated property with a getter that returns the observable.
//         // if ( delete target[ key ] ) {
//         //     Object.defineProperty( target , key , {
//         //         get          : getter ,
//         //         enumerable   : true ,
//         //         configurable : true
//         //     } );
//         // }
//     };
// }
export function Select<T> ( selector ) {
    return function decorate ( target : any , key : string ) : void {
        let injector = ReflectiveInjector.resolveAndCreate( [
            StoreModule.provideStore( reducers , { Application : 'milad' } ).providers
        ] );
        let store    = injector.get( Store );
        store.select( 'Application' ).subscribe( () => {
        } );
    };
}
export function AmpControl<T> ( selector? : FDNSelector ) {
    return function decorate ( target : any , key : string ) : void {
    };
}
