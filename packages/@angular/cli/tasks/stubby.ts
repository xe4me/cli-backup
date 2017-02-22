import { stripIndents } from 'common-tags';
const Task = require('../ember-cli/lib/models/task');
const fs   = require('fs');
import * as path from 'path';
import * as chalk from 'chalk';
// require dependencies within the target project
function requireDependency(root: string, moduleName: string) {
  const packageJson = require(path.join(root, 'node_modules', moduleName, 'package.json'));
  const main = path.normalize(packageJson.main);
  return require(path.join(root, 'node_modules', moduleName, main));
}

export default Task.extend({
  run: function (options: any) {
    const ui = this.ui;
    const projectRoot = this.project.root;
    const Stubby = requireDependency(projectRoot, 'stubby').Stubby;
    let stubby = new Stubby ();
    let stubsPort = 8882;
    let adminPort = 8809;
    let httpsPort = 7444;
    let host = 'localhost';

    // :shipit:
    let stubs = [];
    ui.writeLine(chalk.green(stripIndents`
       ------------*************----------
        'Stubby server started at ' + ${stubsPort} 
         Loading the fils inside the api-dev directory ...  
      `));
    fs.readdir ( projectRoot + '/api-dev' , function ( key , files ) {
      for ( let i = 0 ; i < files.length ; i ++ ) {
        let file = require ( projectRoot + '/api-dev/' + files[ i ] );
        for ( let l = 0 ; l < file.length ; l ++ ) {
          stubs.push ( file[ l ] );
        }
        ui.writeLine(chalk.green(stripIndents`
            Stub  :  ${files[ i ]} 
          `));
      }
      stubby.start ( {
        stubs : stubsPort ,
        admin : adminPort ,
        location : host ,
        data : stubs,
        tls : httpsPort
      } );
      ui.writeLine(chalk.green(stripIndents` 
        ------------*************----------
      `));

    } );
    return new Promise((resolve , reject) => {

    });
  }
});
