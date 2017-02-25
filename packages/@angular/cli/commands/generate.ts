import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {CliConfig} from '../models/config';

const chalk = require('chalk');
const EmberGenerateCommand = require('../ember-cli/lib/commands/generate');
const Blueprint = require('../ember-cli/lib/models/blueprint');
const SilentError = require('silent-error');

const blueprintList = fs.readdirSync(path.join(__dirname, '..', 'blueprints'));
const blueprints = blueprintList
  .filter(bp => bp.indexOf('-test') === -1)
  .filter(bp => bp !== 'ng')
  .map(bp => Blueprint.load(path.join(__dirname, '..', 'blueprints', bp)));

const GenerateCommand = EmberGenerateCommand.extend({
  name: 'generate',

  blueprints: blueprints,

  beforeRun: function (rawArgs: string[]) {
    if (!rawArgs.length) {
      return;
    }

    // map the blueprint name to allow for aliases
    rawArgs[0] = mapBlueprintName(rawArgs[0]);
    this.project.ngConfig = this.project.ngConfig || CliConfig.fromProject();

    if (rawArgs[0] !== '--help' &&
      !fs.existsSync(path.join(__dirname, '..', 'blueprints', rawArgs[0]))) {
      SilentError.debugOrThrow('@angular/cli/commands/generate',
        `Invalid blueprint: ${rawArgs[0]}`);
    }

    if (!rawArgs[1]) {
      SilentError.debugOrThrow('@angular/cli/commands/generate',
        `The \`ng generate ${rawArgs[0]}\` command requires a name to be specified.`);
    }

    // Override default help to hide ember blueprints
    EmberGenerateCommand.prototype.printDetailedHelp = function () {
      this.ui.writeLine(chalk.cyan('  Available blueprints'));
      this.ui.writeLine(blueprints.map(bp => bp.printBasicHelp(false)).join(os.EOL));
    };

    return EmberGenerateCommand.prototype.beforeRun.apply(this, arguments);
  }
});

function mapBlueprintName(name: string): string {
  let mappedName: string = aliasMap[name];
  return mappedName ? mappedName : name;
}

const aliasMap: { [alias: string]: string } = {
  'cl': 'class',
  'c': 'component',
  'd': 'directive',
  'e': 'enum',
  'i': 'interface',
  'm': 'module',
  'p': 'pipe',
  'r': 'route',
  's': 'service'
};

export default GenerateCommand;
GenerateCommand.overrideCore = true;
