import { AmpStyleguideReduxModule } from '../app/redux/amp-styleguide-redux.module';
import { AmpQasAddressModule } from '../app/modules/amp-qas-address';
import { AmpFileUploadModule } from '../app/modules/amp-file-upload';
import { AmpTypeaheadModule } from '../app/modules/amp-typeahead';
import { AmpDirectivesModule } from '../app/modules/amp-directives';
import { AmpInputsModule } from '../app/modules/amp-inputs';
import { AmpPipesModule } from '../app/modules/amp-pipes';
import { AmpErrorModule } from '../app/modules/amp-error';
import { AmpCheckboxModule } from '../app/modules/amp-checkbox';
import { AmpDropdownModule } from '../app/modules/amp-dropdown';
import { AmpTextareaModule } from '../app/modules/amp-textarea';
import { AmpGroupButtonsModule } from '../app/modules/amp-group-buttons';
import { AmpRadioButtonGroupModule } from '../app/modules/amp-radio-button-group';
import { AmpButtonModule } from '../app/modules/amp-button';
import { AmpStandAloneMenuModule } from '../app/modules/amp-standalone-menu';
import { AmpFormModule } from '../app/modules/amp-form';
import { AmpRowRepeaterModule } from '../app/modules/amp-row-repeater';
import { AmpPopDownModule } from '../app/modules/amp-pop-down';
import { AmpTooltipModule } from '../app/modules/amp-tooltip';
import { AmpGreenIdModule } from '../app/modules/amp-greenid-block';
import { AmpGoogleRecaptchaModule } from '../app/modules/amp-google-recaptcha';
import { AmpLogoModule } from '../app/modules/amp-logo';
import { AmpCardsModule } from '../app/modules/amp-cards';
import { AmpProgressBarsModule } from '../app/modules/amp-progress-bars';
import { AmpOverlayModule } from '../app/modules/amp-overlay';
import { AmpReviewModule } from '../app/modules/amp-review';
import { AmpIntroBlockModule } from 'app/modules/amp-intro-block';
export const AMP_MODULES = [
    AmpTooltipModule.forRoot(),
    AmpProgressBarsModule,
    AmpIntroBlockModule,
    AmpOverlayModule,
    AmpFileUploadModule,
    AmpRowRepeaterModule,
    AmpPopDownModule,
    AmpFormModule,
    AmpReviewModule,
    AmpStandAloneMenuModule,
    AmpButtonModule,
    AmpRadioButtonGroupModule,
    AmpGroupButtonsModule,
    AmpTextareaModule,
    AmpCheckboxModule,
    AmpErrorModule,
    AmpPipesModule,
    AmpDirectivesModule,
    AmpDropdownModule,
    AmpInputsModule,
    AmpTypeaheadModule,
    AmpQasAddressModule,
    AmpStyleguideReduxModule,
    AmpGreenIdModule,
    AmpLogoModule,
    AmpGoogleRecaptchaModule,
    AmpCardsModule
];
