### Temporary fixes
1. Hardcoded package.json
    From - "@angular-cli/ast-tools": "<%= version %>",
    To - "@angular-cli/ast-tools": "1.0.0-beta.11-webpack.5"
    due to webpack.8 wasn't available for ast-tools at this time 12/9/2016
1. From "angular-cli": "<%= version %>" to "amp-angular-cli": "^1.0.0",
1. Commented out the below line in webpack-build-common.ts, due to breaking webpack dynamic require context. Will definitely need to work out how to co-operate between LazyModule and ComponentFactoryResolver in future. 
    - new webpack.ContextReplacementPlugin(/.*/, appRoot, lazyModules),

### TODO:
1. DONE - ERROR in [default] C:\ampdigital\ddc\experience-demo6\node_modules\amp-ddc-ui-core\src\app\abstracts\environments\environments.abstract.ts:57:13
        Cannot find name 'process'.
1. DONE - Error with the AmpGroupButtonsComponent, some change occurred last night (Suspect error from direct usage rather than via Block)
1. DONE - Delete node_modules directory from amp-ddc-ui-core (Milad has migrated it to Components)
1. DONE - Aligned zone and rxjs dependency with amp-ddc-components
1. DONE - angular-cli from node_modules of Experience
1. TODO - Convert URL to be inline with the project name experience-XXX
1. TODO - Remove "../../src/styleguide/blocks" dynamic require in amp-block-loader.directive.ts and change "../../src/app/" back to "../../../../src/app/", unless there was a good reason
1. TODO - Integrate stubby.js into amp-ng serve


### Outstanding tasks
1. NPM dependency is a mess, it appears to manage by CLI itself...need to wait until the OOTB CLI to fix this.
1. Resolve how LazyLoadModule impacts ComponentFactoryResolver? How will they co-exist?
1. How to integrate Webpack environment variables into Angular Cli cycle
