import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';

// import { Home } from './home';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';

export const ROUTES : Routes = [
    { path : 'component/:id' , component : ComponentPage },
    { path : '**' ,              component : IndexPage }
];

// [
//   { path: '',      component: Home },
//   { path: 'home',  component: Home },
//   {
//     path: 'detail', loadChildren: () => require('es6-promise-loader!./example')('default')
//   },
//   { path: '**',    component: NoContent },
// ];
