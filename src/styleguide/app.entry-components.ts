// Import components that will get loaded dynamically in a block loader
import { AMP_ADDRESS_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-address-block/entry-components';
import { AMP_AML_QUESTIONS_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-aml-questions-block/entry-components';
import { AMP_BASIC_INFO_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-basic-info-block/entry-components';
import { AMP_CAPTCHA_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-captcha-block/entry-components';
import { AMP_MENU_FRAME_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-menu-frame-block/entry-components';
import { AMP_NEW_OR_EXISTING_CUSTOMER_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-new-or-existing-customer-block/entry-components';
import { AMP_WELCOME_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-welcome-block/entry-components';
import { AMP_LOGIN_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-login-block/entry-components';
import { AMP_GREENID_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-greenid-block/entry-components';
import { AMP_RESIDENCY_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-residency-block/entry-components';
import { AMP_FORM_BLOCK_EXAMPLE_ENTRY_COMPONENTS } from './blocks/amp-form-block/entry-components';
import { AMP_TAX_FILE_NUMBER_BLOCK_ENTRY_COMPONENTS } from './blocks/amp-tax-file-number-block/entry-components';
import { AmpConfirmationPageComponent } from '../app/pages/amp-confirmation-page/amp-confirmation-page.component';
import { AmpTransitioningAccountPageComponent } from '../app/pages/amp-transitioning-account-page/amp-transitioning-account-page.component';
import { BASIC_USAGE_ENTRY_COMPONENTS } from './basic-usage-entry-components';

export const DYNAMICALLY_LOADED_COMPONENTS = [
    ...BASIC_USAGE_ENTRY_COMPONENTS,
    ...AMP_ADDRESS_BLOCK_ENTRY_COMPONENTS,
    ...AMP_AML_QUESTIONS_BLOCK_ENTRY_COMPONENTS,
    ...AMP_BASIC_INFO_BLOCK_ENTRY_COMPONENTS,
    ...AMP_CAPTCHA_BLOCK_ENTRY_COMPONENTS,
    ...AMP_LOGIN_BLOCK_ENTRY_COMPONENTS,
    ...AMP_GREENID_BLOCK_ENTRY_COMPONENTS,
    ...AMP_FORM_BLOCK_EXAMPLE_ENTRY_COMPONENTS,
    ...AMP_MENU_FRAME_BLOCK_ENTRY_COMPONENTS,
    ...AMP_RESIDENCY_BLOCK_ENTRY_COMPONENTS,
    ...AMP_TAX_FILE_NUMBER_BLOCK_ENTRY_COMPONENTS,
    ...AMP_WELCOME_BLOCK_ENTRY_COMPONENTS,
    AmpConfirmationPageComponent,
    AmpTransitioningAccountPageComponent
];
