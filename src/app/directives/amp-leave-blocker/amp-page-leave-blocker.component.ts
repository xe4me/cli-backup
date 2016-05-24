// import { Directive , ElementRef , Input , Renderer } from 'angular2/core';
// import { AfterViewInit , OnDestroy , OnChanges } from 'angular2/src/core/linker/interfaces';
// import { NgZone } from 'angular2/src/core/zone/ng_zone';
// import { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
// import { EventManager } from 'angular2/src/platform/dom/events/event_manager';
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
