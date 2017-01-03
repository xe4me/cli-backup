import { AmpBlockLoaderDirective } from 'amp-ddc-components/src/app/amp-block-loader.directive';
import { AppComponent } from './app.component';
import { DYNAMIC_BLOCKS } from './app.dynamic-blocks';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
export const DECLARATIONS = [
    ...DYNAMIC_BLOCKS,
    AmpBlockLoaderDirective,
    ApplicationFormComponent,
    AppComponent
];