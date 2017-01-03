import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { NormalAccountPage } from './pages/confirmation/normal-account-page';
import { PostnoneSingleAccountPage } from './pages/confirmationWithConditionSingle/postnone-account-page';
import { PostnoneJointAccountPage } from './pages/confirmationWithConditionJoint/postnone-account-page';
import { TransitioningAccountPage } from './pages/confirmationFromTransitioning/transitioning-account-page';
import { SaveConfirmationPage } from './pages/saveConfirmation/save-confirmation-page';
import { SubmitErrorPage } from './pages/submitError/submit-error-page';
import { BetterFormComponent } from './forms/better-form/better-form.component';
import { RequestRefViaSMSPage } from './pages/request-ref-via-sms/request-ref-via-sms-page';
const routes : Routes = [
    { path : '', component : BetterFormComponent },
    { path : 'confirmation', component : NormalAccountPage },
    { path : 'confirmationWithConditionSingle', component : PostnoneSingleAccountPage },
    { path : 'confirmationWithConditionJoint', component : PostnoneJointAccountPage },
    { path : 'confirmationTransitioning', component : TransitioningAccountPage },
    { path : 'submitError/:errorId', component : SubmitErrorPage },
    { path : 'requestsms/:referenceId/:mobileNumber', component : RequestRefViaSMSPage },
    { path : 'saveConfirmation/:ref', component : SaveConfirmationPage }
];
@NgModule( {
    imports   : [ RouterModule.forRoot( routes ) ],
    exports   : [ RouterModule ],
    providers : []
} )
export class AppRoutingModule {
}
