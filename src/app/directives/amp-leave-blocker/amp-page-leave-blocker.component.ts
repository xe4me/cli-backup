// import { Directive , ElementRef , Input , Renderer } from '@angular/core';
// import { AfterViewInit , OnDestroy , OnChanges } from '@angular/core';
// import { NgZone } from '@angular/core';
// import { DomEventsPlugin } from '@angular/platform-browser';
// import { EventManager } from '@angular/platform-browser';
// @Directive( {
//     selector : '[page-leave-blocker]'
// } )
// export class AmpLeaveBlocker implements AfterViewInit,OnChanges {
//     @Input( 'page-leave-blocker' ) shouldBlock : boolean;
//     ngOnChanges ( changes : {} ) : any {
//         console.log( 'changes' , changes );
//         if ( changes.shouldBlock.currentValue === true ) {
//             this.zone.runOutsideAngular( () => {
//                 const manager =
//                           new EventManager( [ new DomEventsPlugin() ] , new NgZone( { enableLongStackTrace : false } ) );
//                 manager.addGlobalEventListener( 'window' , 'beforeunload' , ( e ) => {
//                     console.log( 'binded' );
//                     return 'Are you sure you want to leave?';
//                 } );
//             } );
//         }
//         return undefined;
//     }
//
//
//
//     ngAfterViewInit () : any {
//         this.zone.runOutsideAngular( () => {
//             console.log('binding ........');
//             const manager =
//                       new EventManager( [ new DomEventsPlugin() ] , new NgZone( { enableLongStackTrace : false } ) );
//             manager.addGlobalEventListener( 'window' , 'beforeunload' , ( e ) => {
//                 console.log( 'binded' );
//                 return 'Are you sure you want to leave?';
//             } );
//         } );
//         return undefined;
//     }
//
//     constructor ( private zone : NgZone ) {
//     }
// }
