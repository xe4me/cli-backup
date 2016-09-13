### Temporary fixes
1. Hardcoded package.json
    From - "@angular-cli/ast-tools": "<%= version %>",
    To - "@angular-cli/ast-tools": "1.0.0-beta.11-webpack.5"
    due to webpack.8 wasn't available for ast-tools at this time 12/9/2016
1. From "angular-cli": "<%= version %>" to "amp-angular-cli": "^1.0.0",
1. TODO:
    - Fix this - ERROR in [default] C:\ampdigital\ddc\experience-demo6\node_modules\amp-ddc-ui-core\src\app\abstracts\environments\environments.abstract.ts:57:13
Cannot find name 'process'.
    - DONE - Delete node_modules directory from amp-ddc-ui-core (Milad has migrated it to Components)
    - DONE - Aligned zone and rxjs dependency with amp-ddc-components
    - DONE - angular-cli from node_modules of Experience
1. Commented out the below line in webpack-build-common.ts, due to breaking webpack dynamic require context. Will definitely need to work out how to co-operate between LazyModule and ComponentFactoryResolver in future. 
    - new webpack.ContextReplacementPlugin(/.*/, appRoot, lazyModules),



### Outstanding tasks
1. NPM dependency is a mess, it appears to manage by CLI itself...need to wait until the OOTB CLI to fix this.
1. 