import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import * as rimraf from 'rimraf';
import * as webpack from 'webpack';
import * as url from 'url';
import * as _ from 'lodash';
import { oneLine, stripIndents } from 'common-tags';
import { getWebpackStatsConfig } from '../models/webpack-configs/utils';
import { NgCliWebpackConfig } from '../models/webpack-config';
import { ServeTaskOptions } from '../commands/serve';
import { CliConfig } from '../models/config';

const WebpackDevServer = require('webpack-dev-server');
const Task = require('../ember-cli/lib/models/task');
const SilentError = require('silent-error');
const opn = require('opn');

export default Task.extend({
  run: function (serveTaskOptions: ServeTaskOptions, rebuildDoneCb: any) {
    const ui = this.ui;
    let webpackCompiler: any;
    const projectConfig = CliConfig.fromProject().config;
    const appConfig = projectConfig.apps[0];

    const outputPath = serveTaskOptions.outputPath || appConfig.outDir;
    if (this.project.root === outputPath) {
      throw new SilentError('Output path MUST not be project root directory!');
    }
    if (projectConfig.project && projectConfig.project.ejected) {
      throw new SilentError('An ejected project cannot use the build command anymore.');
    }
    rimraf.sync(path.resolve(this.project.root, outputPath));

    const serveDefaults = {
      // default deployUrl to '' on serve to prevent the default from .amp-angular-cli.json
      deployUrl: outputPath.replace('dist','')
    };

    serveTaskOptions = Object.assign({}, serveDefaults, serveTaskOptions);

    let webpackConfig = new NgCliWebpackConfig(serveTaskOptions).config;

    const serverAddress = url.format({
      protocol: serveTaskOptions.ssl ? 'https' : 'http',
      hostname: serveTaskOptions.host,
      port: serveTaskOptions.port.toString()
    });
    let clientAddress = serverAddress;
    if (serveTaskOptions.liveReloadClient) {
      const clientUrl = url.parse(serveTaskOptions.liveReloadClient);
      // very basic sanity check
      if (!clientUrl.host) {
        return Promise.reject(new SilentError(`'live-reload-client' must be a full URL.`));
      }
      clientAddress = clientUrl.href;
    }

    if (serveTaskOptions.liveReload) {
      // This allows for live reload of page when changes are made to repo.
      // https://webpack.github.io/docs/webpack-dev-server.html#inline-mode
      let entryPoints = [
        `webpack-dev-server/client?${clientAddress}`
      ];
      if (serveTaskOptions.hmr) {
        const webpackHmrLink = 'https://webpack.github.io/docs/hot-module-replacement.html';
        ui.writeLine(oneLine`
          ${chalk.yellow('NOTICE')} Hot Module Replacement (HMR) is enabled for the dev server.
        `);
        ui.writeLine('  The project will still live reload when HMR is enabled,');
        ui.writeLine('  but to take advantage of HMR additional application code is required');
        ui.writeLine('  (not included in an Angular CLI project by default).');
        ui.writeLine(`  See ${chalk.blue(webpackHmrLink)}`);
        ui.writeLine('  for information on working with HMR for Webpack.');
        entryPoints.push('webpack/hot/dev-server');
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
        if (serveTaskOptions.extractCss) {
          ui.writeLine(oneLine`
            ${chalk.yellow('NOTICE')} (HMR) does not allow for CSS hot reload when used
            together with '--extract-css'.
          `);
        }
      }
      if (!webpackConfig.entry.main) { webpackConfig.entry.main = []; }
      webpackConfig.entry.main.unshift(...entryPoints);
    } else if (serveTaskOptions.hmr) {
      ui.writeLine(chalk.yellow('Live reload is disabled. HMR option ignored.'));
    }

    if (!serveTaskOptions.watch) {
      // There's no option to turn off file watching in webpack-dev-server, but
      // we can override the file watcher instead.
      webpackConfig.plugins.unshift({
        apply: (compiler: any) => {
          compiler.plugin('after-environment', () => {
            compiler.watchFileSystem = { watch: () => {} };
          });
        }
      });
    }

    webpackCompiler = webpack(webpackConfig);

    if (rebuildDoneCb) {
      webpackCompiler.plugin('done', rebuildDoneCb);
    }

    const statsConfig = getWebpackStatsConfig(serveTaskOptions.verbose);
//    [`${serveDefaults.deployUrl}/*`]: {
//      // rewrite all the local asset request to remove the relative path from them, this is not needed in the environments and is only for local
//      target: 'http://localhost:3000',
//        pathRewrite: function (path:string, req:any) {
//        if (req.url) {
//          let to = req.url.replace(serveDefaults.deployUrl, '');
//          if (to !== req.url) {
//            req.url = to;
//          }
//        } else {
//        }
//      }
//    }
    let proxyConfig = {};
    let defaultProxySetting = {

    };
    if (serveTaskOptions.proxyConfig) {
      const proxyPath = path.resolve(this.project.root, serveTaskOptions.proxyConfig);
      if (fs.existsSync(proxyPath)) {
        proxyConfig = _.merge(require(proxyPath),defaultProxySetting);
      } else {
//        const message = 'Proxy config file ' + proxyPath + ' does not exist.';
//        return Promise.reject(new SilentError(message));
        proxyConfig = defaultProxySetting;
      }
    }
    ui.writeLine(chalk.magenta(stripIndents`
   
    ****************************************************************************************
    All the calls to the ${serveDefaults.deployUrl} will be redirected to /
    This is only for develop , for prod build the baseUrl will still be ${serveDefaults.deployUrl} 
    ****************************************************************************************
    
  `));
    let sslKey: string = null;
    let sslCert: string = null;
    if (serveTaskOptions.ssl) {
      const keyPath = path.resolve(this.project.root, serveTaskOptions.sslKey);
      if (fs.existsSync(keyPath)) {
        sslKey = fs.readFileSync(keyPath, 'utf-8');
      }
      const certPath = path.resolve(this.project.root, serveTaskOptions.sslCert);
      if (fs.existsSync(certPath)) {
        sslCert = fs.readFileSync(certPath, 'utf-8');
      }
    }

    const webpackDevServerConfiguration: IWebpackDevServerConfigurationOptions = {
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: {
        index: `/${appConfig.index}`,
        disableDotRule: true,
        verbose : true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
      },
      stats: statsConfig,
      inline: true,
      proxy: proxyConfig,
      compress: serveTaskOptions.target === 'production',
      watchOptions: {
        poll: serveTaskOptions.poll
      },
      https: serveTaskOptions.ssl,
      overlay: serveTaskOptions.target === 'development'
    };

    if (sslKey != null && sslCert != null) {
      webpackDevServerConfiguration.key = sslKey;
      webpackDevServerConfiguration.cert = sslCert;
    }

    webpackDevServerConfiguration.hot = serveTaskOptions.hmr;

    if (serveTaskOptions.target === 'production') {
      ui.writeLine(chalk.red(stripIndents`
        ****************************************************************************************
        This is a simple server for use in testing or debugging Angular applications locally.
        It hasn't been reviewed for security issues.

        DON'T USE IT FOR PRODUCTION USE!
        ****************************************************************************************
      `));
    }

    ui.writeLine(chalk.green(oneLine`
      **
      NG Live Development Server is running on
      http${serveTaskOptions.ssl ? 's' : ''}://${serveTaskOptions.host}:${serveTaskOptions.port}${serveDefaults.deployUrl}.
      **
    `));

    const server = new WebpackDevServer(webpackCompiler, webpackDevServerConfiguration);
    return new Promise((_resolve, reject) => {
      server.listen(serveTaskOptions.port, serveTaskOptions.host, (err: any, _stats: any) => {
        if (err) {
          return reject(err);
        }
        if (serveTaskOptions.open) {
            opn(serverAddress);
        }
      });
    })
    .catch((err: Error) => {
      if (err) {
        this.ui.writeError('\nAn error occured during the build:\n' + ((err && err.stack) || err));
      }
      throw err;
    });
  }
});
