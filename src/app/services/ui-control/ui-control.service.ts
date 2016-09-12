// import { Injectable } from '@angular/core';
// import { FormControl , FormArray , FormGroup , FormBuilder } from '@angular/forms';
//
// @Injectable()
// export class UIControlService {
//     public logging: boolean = false;
//     private model: any;
//
//     constructor ( private builder: FormBuilder ) {
//         this.model = builder.group( {} );
//     }
//
//     /*
//      Control
//      */
//     public createControl ( path: string[] ,
//                            name: string ,
//                            defaultValue?: string | number ): FormControl {
//         let ctrlgroup = this.createControlGroup( path );
//         if ( this.logging ) {
//             console.info( 'createControl:' , path , name , defaultValue , ctrlgroup );
//         }
//         let newControl = null;
//         if ( ! ctrlgroup.contains( name ) ) {
//             newControl = new FormControl( defaultValue );
//             ctrlgroup.addControl( name , newControl );
//         } else {
//             if ( this.logging ) {
//                 console.info( 'Control already exists:' , name );
//             }
//             newControl = ctrlgroup.controls[ name ];
//         }
//         return newControl;
//     }
//
//     public getControl ( path: string[] , name: string ): FormControl {
//         let ctrlgroup = this.getControlGroup( path );
//         let control   = null;
//         if ( ! ctrlgroup || ! ctrlgroup.contains( name ) ) {
//             if ( this.logging ) {
//                 console.info( 'Control doesn\'t exists:' , name );
//             }
//             control = null;
//         } else {
//             control = ctrlgroup.controls[ name ];
//         }
//         return control;
//     }
//
//     /*
//      Control Group
//      */
//     public getControlGroup ( path?: string[] ): FormGroup {
//         let root = this.model;
//         if ( path ) {
//             for ( let i in path ) {
//                 const group = path[ i ];
//                 if ( root.contains( group ) ) {
//                     root = <FormGroup>root.controls[ group ];
//                 } else {
//                     if ( this.logging ) {
//                         console.info( 'FormGroup doesn\'t exists:' , group );
//                     }
//                     return null;
//                 }
//             }
//         }
//         return root;
//     }
//
//     public createControlGroup ( path: string[] ): FormGroup {
//         let root = this.model;
//         for ( let i in path ) {
//             const group = path[ i ];
//             let newRoot = null;
//             if ( root.contains( group ) ) {
//                 newRoot = root.controls[ group ];
//             } else {
//                 newRoot = new FormGroup( {} );
//                 root.addControl( group , newRoot );
//             }
//             root = newRoot;
//         }
//         return root;
//     }
//
//     /*
//      *
//      * TODO: Very important:
//      * The bellow hack for occupation list should be fixed , this is just a quick fix for NIO
//      *
//      * */
//     public updateModel ( newModel: any ): void {
//         let occupationSelect1;
//         let occupationSelect2;
//         if ( newModel.Quote.LifeInsuredOne ) {
//             occupationSelect1 = newModel.Quote.LifeInsuredOne.applicantDetails.occupationSelect + '';
//             delete newModel.Quote.LifeInsuredOne.applicantDetails.occupationSelect;
//         }
//         if ( newModel.Quote.LifeInsuredTwo ) {
//             occupationSelect2 = newModel.Quote.LifeInsuredTwo.applicantDetails.occupationSelect + '';
//             delete newModel.Quote.LifeInsuredTwo.applicantDetails.occupationSelect;
//         }
//         let magic  = JSON.stringify( newModel )
//                          .replace( /\[/g , 'this.builder.array([' )
//                          .replace( /\]/g , '])' )
//                          .replace( /{"/g , 'this.builder.group({"' )
//                          .replace( /}/g , '})' );
//         this.model = eval( magic );
//         if ( occupationSelect1 ) {
//             this.model.controls.Quote.controls.LifeInsuredOne.controls.applicantDetails.addControl( 'occupationSelect' , new FormControl( occupationSelect1 ) );
//         }
//         if ( occupationSelect2 ) {
//             this.model.controls.Quote.controls.LifeInsuredTwo.controls.applicantDetails.addControl( 'occupationSelect' , new FormControl( occupationSelect1 ) );
//         }
//     }
//
//     /*
//      Update model
//      */
//     public updateModelOld ( newModel: any , path?: string[] ): void {
//         if ( ! path ) {
//             path = [];
//         }
//         const pathIndex = path.length;
//         for ( let key in newModel ) {
//             path.splice( pathIndex );
//             path[ pathIndex ] = key;
//             let currentModel  = newModel[ key ];
//             const group       = path.slice( 0 , path.length - 1 );
//             if ( currentModel instanceof Array ) {
//                 this.createControlArray( group , key , currentModel );
//             } else if ( typeof(currentModel) === 'object' ) {
//                 this.updateModelOld( currentModel , path );
//             } else {
//                 this.createControl( group , key , currentModel );
//             }
//         }
//     }
//
//     /*
//      Control Array
//      */
//     public createControlArray ( path: string[] , name: string , defaultValues? ): FormArray {
//         let ctrlgroup       = this.createControlGroup( path );
//         let newControlArray = null;
//         if ( ! ctrlgroup.contains( name ) ) {
//             newControlArray = new FormArray( this.createControlGroupsFromArray( defaultValues ) );
//             ctrlgroup.addControl( name , newControlArray );
//         } else {
//             if ( this.logging ) {
//                 console.info( 'ControlArray already exists:' , name );
//             }
//             newControlArray = ctrlgroup.controls[ name ];
//         }
//         return newControlArray;
//     }
//
//     public getControlArray ( path: string[] , name: string ): FormArray {
//         let ctrlgroup = this.getControlGroup( path );
//         if ( ctrlgroup && ctrlgroup.contains( name ) ) {
//             return <FormArray>ctrlgroup.controls[ name ];
//         }
//         if ( this.logging ) {
//             console.info( 'Control doesn\'t exists:' , name );
//         }
//         return null;
//     }
//
//     private createControlGroupsFromArray ( array? ) {
//         let ret = [];
//         if ( array ) {
//             for ( let i in array ) {
//                 const obj    = array[ i ];
//                 let newGroup = new FormGroup( {} );
//                 for ( let key in obj ) {
//                     newGroup.addControl( key , new FormControl( obj[ key ] ) );
//                 }
//                 ret.push( newGroup );
//             }
//         }
//         return ret;
//     }
// }
