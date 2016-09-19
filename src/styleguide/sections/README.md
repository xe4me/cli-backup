########## IMPORTANT: DO NOT MODIFY !!! ############
This directory is a mirror image of the one in /src/app, the only difference are the import 
statements to point to the amp-block-loader.directive.ts in styleguide.

The reason why we need another version of amp-block-loader.directive.ts is because of the 
dynamic require context that Webpack needs at static compile time to map all of the possible
modules the FormDefinition could load. 

When used in Components(as oppose to any other Experience-XXX project) the loadable modules 
needs to include the /src/styleguide components, which is used for the demo Styleguide website 
only, we don't want to include these in the Experience repo. Hence a separate amp-block-loader.directive.ts