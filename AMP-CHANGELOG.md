### Temporary fixes
1. Hardcoded package.json
    From - "@angular-cli/ast-tools": "<%= version %>",
    To - "@angular-cli/ast-tools": "1.0.0-beta.11-webpack.5"
    due to webpack.8 wasn't available for ast-tools at this time 12/9/2016
1. From "angular-cli": "<%= version %>" to "amp-angular-cli": "^1.0.0",
1. TODO:
    - Fix this - ERROR in [default] C:\ampdigital\ddc\experience-demo6\node_modules\amp-ddc-ui-core\src\app\abstracts\environments\environments.abstract.ts:57:13
Cannot find name 'process'.
    - Fix this - Delete the node_modules directory from amp-ddc-ui-core (Milad has migrated it to Components)
    - Fix this - rxjs between amp-ddc-component and amp-ddc-ui-core and experience
