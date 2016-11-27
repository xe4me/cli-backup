const Task = require('ember-cli/lib/models/task');
const fs = require('fs');
import * as path from 'path';

// require dependencies within the target project
function requireDependency(root: string, moduleName: string) {
  const packageJson = require(path.join(root, 'node_modules', moduleName, 'package.json'));
  const main = path.normalize(packageJson.main);
  return require(path.join(root, 'node_modules', moduleName, main));
}

export default Task.extend({
  run: function (options: any) {
    const projectRoot = this.project.root;
    return new Promise((resolve) => {
      const Stubby = requireDependency(projectRoot, 'stubby').Stubby;

      let stubby = new Stubby ();
      let stubsPort = 8882;
      let adminPort = 8809;
      let httpsPort = 7444;
      let host = 'localhost';

      // :shipit:
      let stubs = [];
      fs.readdir ( projectRoot + '/api-dev' , function ( key , files ) {
          for ( let i = 0 ; i < files.length ; i ++ ) {
              let file = require ( projectRoot + '/api-dev/' + files[ i ] );
              for ( let l = 0 ; l < file.length ; l ++ ) {
                  stubs.push ( file[ l ] );
              }
          }
          stubby.start ( {
              stubs : stubsPort ,
              admin : adminPort ,
              location : host ,
              data : stubs,
              tls : httpsPort
          } );
          console.log ( '------------*************----------' );
          console.log ( 'Stubby server started at ' + stubsPort );
          console.log ( '------------*************----------' );
      } );
    });
  }
});
