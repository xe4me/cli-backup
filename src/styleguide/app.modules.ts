import { AmpStyleguideReduxModule } from '../app/redux/amp-styleguide-redux.module';
import { AmpQasAddressModule } from '../app/modules/amp-qas-address';
import { AmpFileUploadModule } from '../app/modules/amp-file-upload';
import { AmpTypeaheadModule } from '../app/modules/amp-typeahead';
import { AmpDirectivesModule } from '../app/modules/amp-directives';
import { AmpInputsModule } from '../app/modules/amp-inputs';
import { AmpPipesModule } from '../app/modules/amp-pipes';
import { AmpErrorModule } from '../app/modules/amp-error/amp-error.module';
import { AmpCheckboxModule } from '../app/modules/amp-checkbox';
import { AmpDropdownModule } from '../app/modules/amp-dropdown';
import { AmpTextareaModule } from '../app/modules/amp-textarea';
import { AmpGroupButtonsModule } from '../app/modules/amp-group-buttons';
import { AmpRadioButtonGroupModule } from '../app/modules/amp-radio-button-group';
import { AmpButtonModule } from '../app/modules/amp-button';
import { AmpStandAloneMenuModule } from '../app/modules/amp-standalone-menu';
import { AmpFormModule } from '../app/modules/amp-form/amp-form.module';
import { AmpRowRepeaterModule } from '../app/modules/amp-row-repeater/amp-row-repeater.module';
import { AmpTooltipModule } from '../app/modules/amp-tooltip/amp-tooltip.module';
import { AmpGreenIdModule } from '../app/modules/amp-greenid-block/amp-greenid.module';
import { AmpGoogleRecaptchaModule } from '../app/modules/amp-google-recaptcha/amp-google-recaptcha.module';
import { AmpLogoModule } from '../app/modules/amp-logo/amp-logo.module';
import { AmpCardsModule } from '../app/modules/amp-cards/amp-cards.module';
import { AmpProgressBarsModule } from '../app/modules/amp-progress-bars/amp-progress-bars.module';
import { AmpOverlayModule } from '../app/modules/amp-overlay/amp-overlay.module';
import {AmpReviewModule} from '../app/modules/amp-review/amp-review.module';
import {AmpIntroBlockModule} from 'app/modules/amp-intro-block/amp-intro-block.module';
export const AMP_MODULES = [
    AmpTooltipModule.forRoot() ,
    AmpProgressBarsModule ,
    AmpIntroBlockModule ,
    AmpOverlayModule ,
    AmpFileUploadModule ,
    AmpRowRepeaterModule ,
    AmpFormModule ,
    AmpReviewModule ,
    AmpStandAloneMenuModule ,
    AmpButtonModule ,
    AmpRadioButtonGroupModule ,
    AmpGroupButtonsModule ,
    AmpTextareaModule ,
    AmpCheckboxModule ,
    AmpErrorModule ,
    AmpPipesModule ,
    AmpDirectivesModule ,
    AmpDropdownModule ,
    AmpInputsModule ,
    AmpTypeaheadModule ,
    AmpQasAddressModule ,
    AmpStyleguideReduxModule ,
    AmpGreenIdModule ,
    AmpLogoModule ,
    AmpGoogleRecaptchaModule ,
    AmpCardsModule
];
