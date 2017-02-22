import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
const routes : Routes = [
    { path : '', component : ApplicationFormComponent }
];
@NgModule( {
    imports : [ RouterModule.forRoot( routes ) ],
    exports : [ RouterModule ],
    providers : []
} )
export class AppRoutingModule {
}
