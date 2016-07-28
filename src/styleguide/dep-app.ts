import { Component , View , enableProdMode , bind , Input , OnDestroy , ApplicationRef } from '@angular/core';
import { bootstrap } from '@angular/platform-browser';
import * as ngCore from '@angular/core';
import {
    ROUTER_PROVIDERS ,
    ROUTER_DIRECTIVES ,
    RouteConfig ,
    HashLocationStrategy ,
    LocationStrategy ,
    Router
} from '@angular/router-deprecated';
import { MATERIAL_DIRECTIVES , MATERIAL_PROVIDERS } from 'ng2-material/all';
import { DEMO_DIRECTIVES } from './all';
import Example from './example';
import { Http , Response , HTTP_PROVIDERS } from '@angular/http';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { ComponentsService , IComponentMeta } from './services/components';
import { NavigationService } from './services/navigation';
import { VersionService } from './services/version';
import { SidenavService } from 'ng2-material/components/sidenav/sidenav_service';
import { Media } from 'ng2-material/core/util/media';
import { ScrollService , FormModelService , AmpHttpService , ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
import { BrowserDomAdapter } from '@angular/platform-browser';
import { Renderer } from '@angular/core';
/**
 * Describe an example that can be dynamically loaded.
 */
export interface IExampleData {
    template : string;
    source : string;
    styles : string;
    component : string;
    component_src_location : string;
    name : string;
    galen? : string;
    jasmine? : string;
}
@RouteConfig( [
    { path : '/' , name : 'Index' , component : IndexPage , useAsDefault : true } ,
    { path : '/components/:id' , name : 'Component' , component : ComponentPage }
] )
@Component( {
    selector : 'demos-app' ,
    host     : {
        '[class.push-menu]' : 'fullPage'
    }
} )
@View( {
    templateUrl : 'src/styleguide/app.html' ,
    // styleUrls: [require('./app.scss')],
    directives  : [ MATERIAL_DIRECTIVES , ROUTER_DIRECTIVES , Example , DEMO_DIRECTIVES ]
} )
export class DemosApp implements OnDestroy {
    static SIDE_MENU_BREAKPOINT : string = 'gt-md';
    @Input()
           fullPage : boolean            = Media.hasMedia( DemosApp.SIDE_MENU_BREAKPOINT );
    public site : string                 = 'AMP DDC';
           version : string;
           components : IComponentMeta[] = [];
    private _subscription                = null;

    constructor ( http : Http ,
                  public navigation : NavigationService ,
                  public media : Media ,
                  public router : Router ,
                  public appRef : ApplicationRef ,
                  private _components : ComponentsService ,
                  private _sidenav : SidenavService ) {
        let query          = Media.getQuery( DemosApp.SIDE_MENU_BREAKPOINT );
        this._subscription = media.listen( query ).onMatched.subscribe( ( mql : MediaQueryList ) => {
            this.fullPage = mql.matches;
            this.appRef.tick();
        } );
        http.get( 'src/assets/version.json' )
            .subscribe( ( res : Response ) => {
                this.version = res.json().version;
            } );
        this._components.getComponents()
            .then( ( comps ) => {
                this.components = comps;
            } );
    }

    ngOnDestroy () : any {
        this._subscription.unsubscribe();
    }

    showMenu ( event? ) {
        this._sidenav.show( 'menu' );
    }

    navigate ( to : any ) {
        this.router.navigate( to );
    }
}
let appProviders = [
    HTTP_PROVIDERS , ROUTER_PROVIDERS , MATERIAL_PROVIDERS ,
    ComponentsService , NavigationService , VersionService ,
    Renderer ,
    FormModelService , ScrollService , BrowserDomAdapter , AmpHttpService , ProgressObserverService ,
    bind( LocationStrategy ).toClass( HashLocationStrategy ) ,
    ngCore.provide( Window , { useValue : window } )
];
if ( window.location.href.indexOf( 'github.com' ) !== - 1 ) {
    enableProdMode();
}
bootstrap( DemosApp , appProviders );
