import { AmpAutoCompleteComponent } from '../app/components/amp-autocomplete/amp-autocomplete.component';
import { LeftNavigationComponent } from './styleguide-components';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    ViewEncapsulation ,
    Component
} from '@angular/core';
import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
    DynamicComponentLoaderFix
} from 'amp-ddc-ui-core/ui-core';
import {
    ROUTER_DIRECTIVES ,
    RouteConfig ,
    Router
} from '@angular/router-deprecated';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { ComponentsService , IComponentMeta } from './services/components';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { NavigationService } from './services/navigation';
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
    selector      : 'styleguide-app' ,
    styles        : [ require( './app.scss' ).toString() ] ,
    providers     : [
        FormModelService ,
        ScrollService ,
        ProgressObserverService ,
        AmpHttpService ,
        NavigationService ,
        ComponentsService,
        BrowserDomAdapter ,
        DynamicComponentLoaderFix,
        MdIconRegistry
    ] ,
    template      : `
        <div class="styleguide-app">
            <div class="grid__item 1/6 styleguide-app--menu">
                <left-navigation [components]="components"></left-navigation>
            </div><!--
         --><div class="examples grid__item 5/6 pl styleguide-app--components">
                <router-outlet ></router-outlet>
                <!--<amp-auto-complete -->
                    <!--class="1/4"-->
                    <!--[options]="options"-->
                    <!--[isActive]="true"-->
                    <!--[isInSummaryState]="isInSum"-->
                    <!--[label]='"Occupations"'>-->
                    <!--<template let-option="option">-->
                        <!--{{ option.title }}-->
                    <!--</template>-->
                <!--</amp-auto-complete>-->
            </div>     
        </div>
    ` ,
    directives    : [ AmpAutoCompleteComponent , LeftNavigationComponent , ROUTER_DIRECTIVES ] ,
    encapsulation : ViewEncapsulation.None
} )
export class StyleGuideApp {
    private options                       = [
        {
            'id'       : 1 ,
            'title'    : 'Professional (medical)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 2 ,
            'title'    : 'White collar professional (specialist)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 3 ,
            'title'    : 'White collar (no manual)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 4 ,
            'title'    : 'White collar (light manual)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 5 ,
            'title'    : 'Light manual (special risk)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 6 ,
            'title'    : 'Manual' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 7 ,
            'title'    : 'Manual special risk' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 8 ,
            'title'    : 'Heavy manual' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 9 ,
            'title'    : 'Heavy manual special risk 1' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 10 ,
            'title'    : 'Heavy manual special risk 2' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 11 ,
            'title'    : 'Heavy manual special risk 3' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 12 ,
            'title'    : 'Heavy manual special risk 4' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 13 ,
            'title'    : 'Heavy manual special risk 5' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 14 ,
            'title'    : 'Trauma only (low risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 15 ,
            'title'    : 'Trauma only (medium risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 16 ,
            'title'    : 'Trauma (high risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 17 ,
            'title'    : 'Abalone diver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 18 ,
            'title'    : 'Abattoir worker (not slaughterer)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 19 ,
            'title'    : 'Accountant (CPA/CA qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 20 ,
            'title'    : 'Accountant (not CPA/CA qualified )' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 21 ,
            'title'    : 'Actuary (FIAA qualified or overseas equivalent)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1051 ,
            'title'    : 'Actuary (not FIAA qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1052 ,
            'title'    : 'Acupuncturist (not qualified)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 22 ,
            'title'    : 'Acupuncturist (qualified and registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 23 ,
            'title'    : 'Acupuncturist (qualified, not registered)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 24 ,
            'title'    : 'Administration/clerical (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 25 ,
            'title'    : 'Advertising - executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 27 ,
            'title'    : 'Advertising - other staff (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 26 ,
            'title'    : 'Advertising - sales representative (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 32 ,
            'title'    : 'Adviser - insurance/salesperson (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 28 ,
            'title'    : 'Agent - advertising (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1041 ,
            'title'    : 'Agent - customs and shipping (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 29 ,
            'title'    : 'Agent - customs and shipping (some light manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 30 ,
            'title'    : 'Agent - employment (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 33 ,
            'title'    : 'Agent - machinery' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 34 ,
            'title'    : 'Agent - mercantile/repossession/private detective' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 35 ,
            'title'    : 'Agent - real estate (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1053 ,
            'title'    : 'Agent - real estate (light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 36 ,
            'title'    : 'Agent - stock/station' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1081 ,
            'title'    : 'Agronomist - analytical/lab (Degree Qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1082 ,
            'title'    : 'Agronomist - field work' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1083 ,
            'title'    : 'Agronomist - office based consultant' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 39 ,
            'title'    : 'Air conditioning - installation/repairs/servicing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 40 ,
            'title'    : 'Air conditioning - office and consulting (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 41 ,
            'title'    : 'Air conditioning - supervisor/inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 43 ,
            'title'    : 'Air traffic controller' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 44 ,
            'title'    : 'Airforce (all ranks, no special hazards)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1002 ,
            'title'    : 'Airport management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 45 ,
            'title'    : 'Aluminium fixer/framer/installer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 47 ,
            'title'    : 'Ambulance personnel - officer/paramedic/driver' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 46 ,
            'title'    : 'Ambulance personnel (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 48 ,
            'title'    : 'Amusement parlour - employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 50 ,
            'title'    : 'Amusement parlour - owner/manager (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 49 ,
            'title'    : 'Amusement parlour - owner/manager (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 51 ,
            'title'    : 'Anaesthetist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 52 ,
            'title'    : 'Annealer and locksmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 54 ,
            'title'    : 'Antenna erector (commercial/industrial)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 53 ,
            'title'    : 'Antenna erector (domestic only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 55 ,
            'title'    : 'Antique dealer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 58 ,
            'title'    : 'Apiarist/beekeeper' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1003 ,
            'title'    : 'Apprentice (1st, 2nd, 3rd year)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 938 ,
            'title'    : 'Apprentice (4th year)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 57 ,
            'title'    : 'Archaeologist - field' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 60 ,
            'title'    : 'Archaeologist (100% office work/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 61 ,
            'title'    : 'Architect (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 62 ,
            'title'    : 'Architectural draftperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 64 ,
            'title'    : 'Armoured car driver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 65 ,
            'title'    : 'Army (all ranks, bomb disposal)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 63 ,
            'title'    : 'Army (all ranks, no special hazards)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 66 ,
            'title'    : 'Artificial inseminator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 67 ,
            'title'    : 'Artist commercial (full-time, not working at home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 68 ,
            'title'    : 'Artist graphic (full-time, not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 70 ,
            'title'    : 'Artist others' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 69 ,
            'title'    : 'Artist sculptor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 71 ,
            'title'    : 'Asbestos worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 72 ,
            'title'    : 'Asphalt layer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 73 ,
            'title'    : 'Assembly worker/production line' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 74 ,
            'title'    : 'Assessor/loss adjuster' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 75 ,
            'title'    : 'Astronomer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 77 ,
            'title'    : 'Atomic research/development - energy worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 76 ,
            'title'    : 'Atomic research/development (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 79 ,
            'title'    : 'Auctioneer - livestock (minimum 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 78 ,
            'title'    : 'Auctioneer - real estate' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 81 ,
            'title'    : 'Audiologist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 82 ,
            'title'    : 'Audiometrist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 84 ,
            'title'    : 'Auditor (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 83 ,
            'title'    : 'Auditor (not degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 85 ,
            'title'    : 'Author/writer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 86 ,
            'title'    : 'Auto electrician' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 87 ,
            'title'    : 'Aviation industry - flying personnel - aircrew/flight attendants' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 88 ,
            'title'    : 'Aviation industry - flying personnel - instructor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1054 ,
            'title'    : 'Aviation industry - flying personnel - pilot' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 89 ,
            'title'    : 'Aviation industry - non-flying personnel - air traffic controller' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 91 ,
            'title'    : 'Aviation industry - non-flying personnel - baggage handler' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 90 ,
            'title'    : 'Aviation industry - non-flying personnel - mechanic maintenance staff' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 92 ,
            'title'    : 'Aviation industry - non-flying personnel - other manual' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 93 ,
            'title'    : 'Aviation industry - non-flying personnel (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 94 ,
            'title'    : 'Backhoe operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 95 ,
            'title'    : 'Bakery - others (minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 96 ,
            'title'    : 'Bakery - pastry cook (fully qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 97 ,
            'title'    : 'Balloonist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 99 ,
            'title'    : 'Banana farmer- owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 939 ,
            'title'    : 'Banking - administration (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1004 ,
            'title'    : 'Banking - merchant' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 100 ,
            'title'    : 'Banking - senior management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 101 ,
            'title'    : 'Bar staff' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 102 ,
            'title'    : 'Barber (not working at home)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 103 ,
            'title'    : 'Barber (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 104 ,
            'title'    : 'Batteries - manufacturing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 106 ,
            'title'    : 'Batteries - repairs and fitting' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 105 ,
            'title'    : 'Batteries - sales' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 107 ,
            'title'    : 'Beach inspector' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 108 ,
            'title'    : 'Beautician (not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 109 ,
            'title'    : 'Beautician (working at home )' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 110 ,
            'title'    : 'Bicycle - dealer/shopowner' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 111 ,
            'title'    : 'Bicycle - repairs' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 114 ,
            'title'    : 'Billiard saloon - employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 112 ,
            'title'    : 'Billiard saloon - proprietor (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 113 ,
            'title'    : 'Billiard saloon - proprietor (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 117 ,
            'title'    : 'Biologist (100% office/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 115 ,
            'title'    : 'Biologist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 118 ,
            'title'    : 'Blacksmith/farrier' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 119 ,
            'title'    : 'Blaster/explosives handling' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 121 ,
            'title'    : 'Blind/awning/screen - installer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 120 ,
            'title'    : 'Blind/awning/screen - manufacturer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 122 ,
            'title'    : 'Boarding house - proprietor/owner' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 123 ,
            'title'    : 'Boat builder (tradesperson qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 124 ,
            'title'    : 'Boat/watercraft operator' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 125 ,
            'title'    : 'Bobcat owner/operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 126 ,
            'title'    : 'Boilermaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 127 ,
            'title'    : 'Boilermaker - inspector (no manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 128 ,
            'title'    : 'Bomb disposal' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 129 ,
            'title'    : 'Bookbinder' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 130 ,
            'title'    : 'Bookbinder, compositor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 131 ,
            'title'    : 'Bookkeeper' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 132 ,
            'title'    : 'Bookmaker/betting' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 133 ,
            'title'    : 'Botanist (100% office/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1055 ,
            'title'    : 'Botanist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 134 ,
            'title'    : 'Bottle dealer' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 135 ,
            'title'    : 'Bottle shop attendant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 136 ,
            'title'    : 'Bouncers/crowd control' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 137 ,
            'title'    : 'Bread vendor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 138 ,
            'title'    : 'Brewery/distillery - admin/clerical/management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 139 ,
            'title'    : 'Brewery/distillery - chemist (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 140 ,
            'title'    : 'Brewery/distillery - supervisor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 141 ,
            'title'    : 'Brewery/distillery - worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 142 ,
            'title'    : 'Bricklayer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 143 ,
            'title'    : 'Brickworks employee (non-skilled)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 144 ,
            'title'    : 'Bridgebuilder' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 145 ,
            'title'    : 'Broker - commodities (fully qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 146 ,
            'title'    : 'Broker - general insurance' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 147 ,
            'title'    : 'Broker - land' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 148 ,
            'title'    : 'Broker - life insurance' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 149 ,
            'title'    : 'Broker - stocks' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 152 ,
            'title'    : 'Builder (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 153 ,
            'title'    : 'Builder (without trade qualification)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 151 ,
            'title'    : 'Builder administration (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 154 ,
            'title'    : 'Builders labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 157 ,
            'title'    : 'Builders supply merchant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 155 ,
            'title'    : 'Building and construction - joiner' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 156 ,
            'title'    : 'Building and construction - mason' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 158 ,
            'title'    : 'Building inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 159 ,
            'title'    : 'Business executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 160 ,
            'title'    : 'Butcher (shop only)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 161 ,
            'title'    : 'Butcher (slaughterer)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 162 ,
            'title'    : 'Butler' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 163 ,
            'title'    : 'Buyer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1056 ,
            'title'    : 'Cabinet maker (1st, 2nd, 3rd year apprentice)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 166 ,
            'title'    : 'Cabinet maker (4th year apprentice)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1057 ,
            'title'    : 'Cabinet maker (unqualified/labourer)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 165 ,
            'title'    : 'Cabinet maker (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 169 ,
            'title'    : 'Cable maker/wire maker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 168 ,
            'title'    : 'Cafe proprietor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 170 ,
            'title'    : 'Cane farmer - owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 171 ,
            'title'    : 'Car salesperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 172 ,
            'title'    : 'Caravan park - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 173 ,
            'title'    : 'Caravan park - proprietor/owner' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 174 ,
            'title'    : 'Cardiologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 175 ,
            'title'    : 'Caretaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1058 ,
            'title'    : 'Carpenter (1st, 2nd, 3rd year apprentice)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 177 ,
            'title'    : 'Carpenter (4th year apprentice)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1005 ,
            'title'    : 'Carpenter (unqualified/labourer)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 176 ,
            'title'    : 'Carpenter (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 178 ,
            'title'    : 'Carpet - cleaner (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 179 ,
            'title'    : 'Carpet - layer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 180 ,
            'title'    : 'Cartage contractor/carrier - local/metropolitan' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 181 ,
            'title'    : 'Cartage contractor/carrier - long distance' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 183 ,
            'title'    : 'Cartographer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 182 ,
            'title'    : 'Cartographer (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 184 ,
            'title'    : 'Cartoonist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 185 ,
            'title'    : 'Cashier - financial institution' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 186 ,
            'title'    : 'Cashier - service station (no driveway work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 187 ,
            'title'    : 'Cashier - shop' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 188 ,
            'title'    : 'Cashier/console operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 189 ,
            'title'    : 'Casino - croupier (minimum 2 years experience)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 190 ,
            'title'    : 'Casino - manager and clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 192 ,
            'title'    : 'Casino - poker/gaming machine staff' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 195 ,
            'title'    : 'Catering (cooking)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 194 ,
            'title'    : 'Catering (no cooking)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1077 ,
            'title'    : 'Ceiling fixer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1084 ,
            'title'    : 'Cement renderer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 196 ,
            'title'    : 'Cemetery/crematorium worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 197 ,
            'title'    : 'Chainman (surveying)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 198 ,
            'title'    : 'Chandler' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 199 ,
            'title'    : 'Charter services (regular flights)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 200 ,
            'title'    : 'Chauffeur' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 201 ,
            'title'    : 'Chef (qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 202 ,
            'title'    : 'Chef (unqualified, minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 203 ,
            'title'    : 'Chemist - analytical or lab (degree qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 205 ,
            'title'    : 'Chemist - industrial (non hazardous materials)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 207 ,
            'title'    : 'Chemist - pharmacist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 208 ,
            'title'    : 'Chemist - research (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 940 ,
            'title'    : 'Child care/day care - (not registered)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 210 ,
            'title'    : 'Child care/day care - (with qualification, registered, not working from home' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1006 ,
            'title'    : 'Child care/day care - (with qualification, registered, working from home' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 209 ,
            'title'    : 'Child care/day care - others - (not working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 211 ,
            'title'    : 'Chiropodist/podiatrist (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 213 ,
            'title'    : 'Chiropractor (registered)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 216 ,
            'title'    : 'Circus animal trainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 215 ,
            'title'    : 'Circus performer/worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 217 ,
            'title'    : 'Cleaner - airport (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 218 ,
            'title'    : 'Cleaner - brick (full-time)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 219 ,
            'title'    : 'Cleaner - carpet (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 220 ,
            'title'    : 'Cleaner - factory/office/school (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 221 ,
            'title'    : 'Cleaner - household (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 222 ,
            'title'    : 'Cleaner - street (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 223 ,
            'title'    : 'Cleaner - window - (full-time, does not work above 10 metres)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 224 ,
            'title'    : 'Cleaner - window - (full-time, work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 225 ,
            'title'    : 'Clergy' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 226 ,
            'title'    : 'Clerical worker/clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 227 ,
            'title'    : 'Club entertainment' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 228 ,
            'title'    : 'Club night/disco' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 229 ,
            'title'    : 'Club private/exclusive - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 231 ,
            'title'    : 'Commercial artist (full-time, not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 232 ,
            'title'    : 'Commercial traveller' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 233 ,
            'title'    : 'Composer - music/recording (full-time, not working from home)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 234 ,
            'title'    : 'Compositor (keyboard work only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 235 ,
            'title'    : 'Compositor (other)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1085 ,
            'title'    : 'Computer industry consultant (other)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 236 ,
            'title'    : 'Computer industry consultant (professional, degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1042 ,
            'title'    : 'Computer industry engineer (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 237 ,
            'title'    : 'Computer industry keyboard operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 238 ,
            'title'    : 'Computer industry maintenance engineer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 239 ,
            'title'    : 'Computer industry operator (no keyboard work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 240 ,
            'title'    : 'Computer industry programmer/systems analyst' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 241 ,
            'title'    : 'Computer industry sales representative' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 242 ,
            'title'    : 'Computer industry technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 243 ,
            'title'    : 'Concierge/bell captain' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 244 ,
            'title'    : 'Concretor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 245 ,
            'title'    : 'Cook (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 246 ,
            'title'    : 'Coroner (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 249 ,
            'title'    : 'Crane labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 248 ,
            'title'    : 'Crane person/driver - other' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 247 ,
            'title'    : 'Crane person/driver - tower crane' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 254 ,
            'title'    : 'Curator of art gallery, library, museum' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1059 ,
            'title'    : 'Customs inspector (airport / mail centre)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 255 ,
            'title'    : 'Customs inspector (docked ships only)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1060 ,
            'title'    : 'Customs officer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 257 ,
            'title'    : 'Dairy delivery person' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 258 ,
            'title'    : 'Dairy employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 256 ,
            'title'    : 'Dairy proprietor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1043 ,
            'title'    : 'Debt collector (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 259 ,
            'title'    : 'Debt collector no repossessing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 260 ,
            'title'    : 'Debt collector repossessing' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 261 ,
            'title'    : 'Decorator/designer - design only (no manual work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 262 ,
            'title'    : 'Decorator/designer - interior/exterior (manual work, does not work above 10 metres)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 263 ,
            'title'    : 'Decorator/designer - interior/exterior (manual work, works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1008 ,
            'title'    : 'Demolisher (building) - foreperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1009 ,
            'title'    : 'Demolisher (building) - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 264 ,
            'title'    : 'Dental nurse' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 265 ,
            'title'    : 'Dental prosthesist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 266 ,
            'title'    : 'Dental surgeon (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 267 ,
            'title'    : 'Dental technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 268 ,
            'title'    : 'Dentist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 269 ,
            'title'    : 'Dermatologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 270 ,
            'title'    : 'Despatch clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 271 ,
            'title'    : 'Diamond cutter/polisher/setter' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 272 ,
            'title'    : 'Diemaker/caster' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 273 ,
            'title'    : 'Dietician (qualified and registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1061 ,
            'title'    : 'Dietician (unqualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1010 ,
            'title'    : 'Director (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 274 ,
            'title'    : 'Disc jockey' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 275 ,
            'title'    : 'Ditcher/drainer (trade qualified)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 276 ,
            'title'    : 'Diver (professional)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 277 ,
            'title'    : 'Docker/waterside worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 278 ,
            'title'    : 'Doctor (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 279 ,
            'title'    : 'Dogman' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 280 ,
            'title'    : 'Dogs - breeder' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 281 ,
            'title'    : 'Dogs - grooming (not mobile, 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 282 ,
            'title'    : 'Dogs - kennel operator' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 283 ,
            'title'    : 'Dogs - trainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 284 ,
            'title'    : 'Domestic help - butler/maid/gardener (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 285 ,
            'title'    : 'Draftsperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 286 ,
            'title'    : 'Drainage contractor (trade qualified)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 287 ,
            'title'    : 'Dredge (harbour or river)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 288 ,
            'title'    : 'Dressmaker (full-time, not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 289 ,
            'title'    : 'Dressmaker (working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 290 ,
            'title'    : 'Driver - ambulance' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 291 ,
            'title'    : 'Driver - bulldozer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 292 ,
            'title'    : 'Driver - bus/coach - local' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 293 ,
            'title'    : 'Driver - bus/coach - long distance' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 294 ,
            'title'    : 'Driver - chauffeur (not hire car)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 295 ,
            'title'    : 'Driver - courier (bicycle)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 297 ,
            'title'    : 'Driver - courier (cars, small vans)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 296 ,
            'title'    : 'Driver - courier (motorcycle)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 298 ,
            'title'    : 'Driver - crane (other than dock worker and tower cranes)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 299 ,
            'title'    : 'Driver - dairy delivery person' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 300 ,
            'title'    : 'Driver - earthmoving and construction equipment' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 301 ,
            'title'    : 'Driver - explosives' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 302 ,
            'title'    : 'Driver - fork lift' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 303 ,
            'title'    : 'Driver - garbage collector' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 304 ,
            'title'    : 'Driver - instructor (car)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1062 ,
            'title'    : 'Driver - instructor (truck)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 305 ,
            'title'    : 'Driver - log hauler' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 306 ,
            'title'    : 'Driver - mail van' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 307 ,
            'title'    : 'Driver - taxi' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 308 ,
            'title'    : 'Driver - tow truck' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 310 ,
            'title'    : 'Driver - train (interstate)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 309 ,
            'title'    : 'Driver - train (metropolitan)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 312 ,
            'title'    : 'Driver - tram' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 313 ,
            'title'    : 'Driver - trucks (local/metropolitan)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 314 ,
            'title'    : 'Driver - trucks (long distance)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 315 ,
            'title'    : 'Drover/musterer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 317 ,
            'title'    : 'Dry cleaning industry - employee' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 316 ,
            'title'    : 'Dry cleaning industry - owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 319 ,
            'title'    : 'Earthenware pipe manufacturer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 318 ,
            'title'    : 'Earthmoving worker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 320 ,
            'title'    : 'Economist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 321 ,
            'title'    : 'Editor - newspaper industry' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 322 ,
            'title'    : 'Editor - painting and publishing' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 323 ,
            'title'    : 'Electrical fitter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 324 ,
            'title'    : 'Electrical lines installer or repairer/power lines (does not work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1063 ,
            'title'    : 'Electrical lines installer or repairer/power lines (works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 325 ,
            'title'    : 'Electrician - domestic or light commercial (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 326 ,
            'title'    : 'Electrician - industrial high voltage (with trade qualification)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 327 ,
            'title'    : 'Electroplater/electrotyper/enameller' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 328 ,
            'title'    : 'Elevator mechanic/installer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 330 ,
            'title'    : 'Employment agency worker (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 331 ,
            'title'    : 'Endocrinologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1044 ,
            'title'    : 'Engineer - aircraft (degree qualified, no manual work) (flying endorsement will apply)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 333 ,
            'title'    : 'Engineer - aircraft (manual work) (flying endorsement will apply)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 340 ,
            'title'    : 'Engineer - manual work (not involved with bridges or heights, underground work or explosives)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 344 ,
            'title'    : 'Engineer - maritime (degree qualified, not sea going, no manual work)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 347 ,
            'title'    : 'Engineer - supervising (not involved with bridges or heights, underground work or explosives)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 332 ,
            'title'    : 'Engineer (degree qualified, 100% office work)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 348 ,
            'title'    : 'Engraver/etcher' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 349 ,
            'title'    : 'Entertainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 350 ,
            'title'    : 'Executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 351 ,
            'title'    : 'Explosives worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 352 ,
            'title'    : 'Exporter/importer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1011 ,
            'title'    : 'Exporter/importer (some light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 353 ,
            'title'    : 'Factory hand/worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 354 ,
            'title'    : 'Farm hand/labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 355 ,
            'title'    : 'Farm manager (involved in farm management)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 356 ,
            'title'    : 'Farmer owner/manager' ,
            'IPClass'  : 'F' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 357 ,
            'title'    : 'Farrier' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 358 ,
            'title'    : 'Fashion designer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 360 ,
            'title'    : 'Fencing contractor - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 359 ,
            'title'    : 'Fencing contractor - proprietor' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 361 ,
            'title'    : 'Fibreglass worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 362 ,
            'title'    : 'Financial planner/consultant' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 363 ,
            'title'    : 'Firefighter - airport' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 364 ,
            'title'    : 'Firefighter - city' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 365 ,
            'title'    : 'Firefighter - explosives' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1086 ,
            'title'    : 'Firefighter - rural' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1012 ,
            'title'    : 'Fishing - deep sea or seasonal' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 369 ,
            'title'    : 'Fishing - other workers (Aust waters only)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 370 ,
            'title'    : 'Fishing - owner/skipper (Aust waters only)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 368 ,
            'title'    : 'Fitter and turner' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 371 ,
            'title'    : 'Flats/units proprietor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 372 ,
            'title'    : 'Floor coverer/layer (linoleum/plastic, not carpet)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 373 ,
            'title'    : 'Floor surfacer/tiler/sander' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 374 ,
            'title'    : 'Foreperson - building and construction (no demolition/wrecking)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 376 ,
            'title'    : 'Forester - mill worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 375 ,
            'title'    : 'Forester - tree feller' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 378 ,
            'title'    : 'Foundry - other' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1013 ,
            'title'    : 'Foundry - patternmaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 379 ,
            'title'    : 'Freezing works - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 380 ,
            'title'    : 'French polisher' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 381 ,
            'title'    : 'Fruit picker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 384 ,
            'title'    : 'Funeral parlour - driver/embalmer/pall bearer/other' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 383 ,
            'title'    : 'Funeral parlour - funeral director/undertaker (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1014 ,
            'title'    : 'Furniture removalist (local)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1015 ,
            'title'    : 'Furniture removalist (long distance)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 386 ,
            'title'    : 'Furniture restorer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 387 ,
            'title'    : 'Garbage collector' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 389 ,
            'title'    : 'Gardener - domestic landscape (less than 2 years experience)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 388 ,
            'title'    : 'Gardener - domestic landscape (minimum 2 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 390 ,
            'title'    : 'Gas industry - atter (fully qualified)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 391 ,
            'title'    : 'Gas industry - fitter' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 392 ,
            'title'    : 'Gas industry - inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 393 ,
            'title'    : 'Gas industry - mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 394 ,
            'title'    : 'Gas industry - meter reader' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 395 ,
            'title'    : 'Gas industry - pipe laying' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 396 ,
            'title'    : 'Gastroenterologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 397 ,
            'title'    : 'General practitioner (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 398 ,
            'title'    : 'Geneticist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 399 ,
            'title'    : 'Geologist (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 400 ,
            'title'    : 'Geologist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 401 ,
            'title'    : 'Glass cutter/blower' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 402 ,
            'title'    : 'Glazier' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 403 ,
            'title'    : 'Goldsmith/silversmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 404 ,
            'title'    : 'Golf professional (full-time, minimum 3 years experience, not touring or professional player)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 405 ,
            'title'    : 'Golf professional (touring)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 406 ,
            'title'    : 'Government employee (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1080 ,
            'title'    : 'Graduate dental professional MP (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1079 ,
            'title'    : 'Graduate medical doctor AA (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1078 ,
            'title'    : 'Graduate medical doctor MP (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 407 ,
            'title'    : 'Graphic artist/designer (not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 408 ,
            'title'    : 'Grave digger' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 410 ,
            'title'    : 'Greenkeeper/grounds person - other' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 409 ,
            'title'    : 'Greenkeeper/grounds person - supervisor (detail training/occupational history)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 411 ,
            'title'    : 'Guest house proprietor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1087 ,
            'title'    : 'Gym instructor (other)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1070 ,
            'title'    : 'Gym instructor (qualified, minimum 3 years experience, working in practice/sports club only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 412 ,
            'title'    : 'Gynaecologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 413 ,
            'title'    : 'Haberdasher' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 414 ,
            'title'    : 'Haematologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 415 ,
            'title'    : 'Hairdresser/barber (not working at home)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 416 ,
            'title'    : 'Hairdresser/barber (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 417 ,
            'title'    : 'Handyperson (minimum 2 years experience)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1088 ,
            'title'    : 'Harbour pilot' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 418 ,
            'title'    : 'Hardware/building supplies - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 419 ,
            'title'    : 'Hardware/building supplies - storeperson (heavy lifting)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 420 ,
            'title'    : 'Hardware/building supplies - storeperson (light lifting)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 421 ,
            'title'    : 'Harvester (crops/fruit, not seasonal)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 422 ,
            'title'    : 'Helicopter pilot - commercial' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 424 ,
            'title'    : 'Herbalist (with industry qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 423 ,
            'title'    : 'Herbalist (without industry qualification)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 425 ,
            'title'    : 'Home duties (full-time care and maintenance of home and dependents)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 426 ,
            'title'    : 'Horse riding instructor' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 427 ,
            'title'    : 'Horse stablehand/strapper' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 428 ,
            'title'    : 'Horse trainer/breeder (no horse breaking)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 430 ,
            'title'    : 'Horticulturist (degree qualified, less than 25% manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 431 ,
            'title'    : 'Hospital - aides' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 432 ,
            'title'    : 'Hospital - domestic' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 433 ,
            'title'    : 'Hospital - orderly/wardperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 434 ,
            'title'    : 'Hospital - porter' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 435 ,
            'title'    : 'Hospitality industry - admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 436 ,
            'title'    : 'Hotel industry (including motels) - manager/proprietor (10 or more full-time employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 437 ,
            'title'    : 'Hotel industry (including motels) manager/proprietor (under 10 full-time employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 438 ,
            'title'    : 'Hotel industry (including motels) staff - bar' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 439 ,
            'title'    : 'Hotel industry (including motels) staff - bouncer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 440 ,
            'title'    : 'Hotel industry (including motels) staff - chef' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 943 ,
            'title'    : 'Hotel industry (including motels) staff - cleaner' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 441 ,
            'title'    : 'Hotel industry (including motels) staff - driveway attendant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1016 ,
            'title'    : 'Hotel industry (including motels) staff - kitchen hand (less than 2 years experience)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 944 ,
            'title'    : 'Hotel industry (including motels) staff - kitchen hand (minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 442 ,
            'title'    : 'Hotel industry (including motels) staff - office/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 945 ,
            'title'    : 'Hotel industry (including motels) staff - waiter' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 445 ,
            'title'    : 'Housekeeper' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 946 ,
            'title'    : 'Houseperson' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 446 ,
            'title'    : 'Human resources/personnel' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 447 ,
            'title'    : 'Hypnotherapist (degree qualified, not working from home)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1067 ,
            'title'    : 'Hypnotherapist (not degree qualified)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 448 ,
            'title'    : 'Importer/exporter (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1017 ,
            'title'    : 'Importer/exporter (some light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 449 ,
            'title'    : 'Inspector - electrical industry' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1018 ,
            'title'    : 'Inspector - insurance' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 450 ,
            'title'    : 'Inspector - meat industry' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 451 ,
            'title'    : 'Instrument maker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 452 ,
            'title'    : 'Insulation installer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 453 ,
            'title'    : 'Interpreter' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 454 ,
            'title'    : 'Investigator/inquiry agent' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 455 ,
            'title'    : 'Investment adviser (licenced)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 457 ,
            'title'    : 'Investor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 458 ,
            'title'    : 'Jackaroo/jillaroo' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 459 ,
            'title'    : 'Janitor' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 461 ,
            'title'    : 'Jeweller - cutter/polisher/setter/engraver' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 460 ,
            'title'    : 'Jeweller - manufacture/repair' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 462 ,
            'title'    : 'Jeweller - sales only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 463 ,
            'title'    : 'Jockey' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 465 ,
            'title'    : 'Journalist (employee, no overseas assignments)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 466 ,
            'title'    : 'Journalist (employee, overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 464 ,
            'title'    : 'Journalist (freelance, no overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1068 ,
            'title'    : 'Journalist (freelance, overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1069 ,
            'title'    : 'Journalist Salaried (overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 467 ,
            'title'    : 'Juice vendor (more than 12 months established)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 468 ,
            'title'    : 'Key punch operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 469 ,
            'title'    : 'Knitter (mill worker)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 470 ,
            'title'    : 'Laboratory technician (not handling radioactive or toxic substances or chemicals)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 472 ,
            'title'    : 'Labourer (not under specified industry)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 473 ,
            'title'    : 'Landscape gardener (no horticultural degree/diploma, minimum 2 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 475 ,
            'title'    : 'Landscape gardener (other)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 474 ,
            'title'    : 'Landscape gardener qualified (with horticultural degree/diploma, less than 25% manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 476 ,
            'title'    : 'Lathe operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 477 ,
            'title'    : 'Laundry staff' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 955 ,
            'title'    : 'Lawnmowing contractor (less than 3 years experience)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 954 ,
            'title'    : 'Lawnmowing contractor (minimum 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 478 ,
            'title'    : 'Legal industry - administration/clerical (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 479 ,
            'title'    : 'Legal industry - article clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 480 ,
            'title'    : 'Legal industry - bailiff' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 481 ,
            'title'    : 'Legal industry - barrister' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 482 ,
            'title'    : 'Legal industry - judge' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 483 ,
            'title'    : 'Legal industry - lawyer/solicitor' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 484 ,
            'title'    : 'Legal industry - stenographer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 485 ,
            'title'    : 'Librarian (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 486 ,
            'title'    : 'Librarian (not degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 487 ,
            'title'    : 'Lifeguard (professional)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 488 ,
            'title'    : 'Lift installer/mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 489 ,
            'title'    : 'Linesperson - electrical industry (does not work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 490 ,
            'title'    : 'Linesperson - electrical industry (works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 491 ,
            'title'    : 'Linotyper/lithographer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1019 ,
            'title'    : 'Livestock buyer/dealer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 492 ,
            'title'    : 'Locksmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 493 ,
            'title'    : 'Machinery equipment - hire or service' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 494 ,
            'title'    : 'Machinist - clothing (not working at home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 495 ,
            'title'    : 'Machinist - clothing (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 496 ,
            'title'    : 'Machinist metal/wood (qualified)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 497 ,
            'title'    : 'Machinist operator factory' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 498 ,
            'title'    : 'Machinist sailmaking (qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 500 ,
            'title'    : 'Management consultant (degree qualified, 100% office)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1020 ,
            'title'    : 'Management director (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 501 ,
            'title'    : 'Management/clerical/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 502 ,
            'title'    : 'Manager - bar work (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 503 ,
            'title'    : 'Manager - bar work (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 504 ,
            'title'    : 'Manicurist (not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 505 ,
            'title'    : 'Manicurist (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 506 ,
            'title'    : 'Manufacturing - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 507 ,
            'title'    : 'Manufacturing - other (not handling toxic or hazardous substances)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 508 ,
            'title'    : 'Manufacturing - skilled tradespeople' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 509 ,
            'title'    : 'Manufacturing - supervising only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 510 ,
            'title'    : 'Market gardener' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 512 ,
            'title'    : 'Masseur/masseuse (qualified, minimun 3 years experience, working in practice not from home)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1089 ,
            'title'    : 'Masseur/Masseuse (working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1021 ,
            'title'    : 'Mathematician (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 513 ,
            'title'    : 'Meat packer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 514 ,
            'title'    : 'Mechanic (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 515 ,
            'title'    : 'Merchant banker' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 517 ,
            'title'    : 'Merchant other' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 516 ,
            'title'    : 'Merchant seaperson' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 518 ,
            'title'    : 'Metal industry - fitter and turner (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 519 ,
            'title'    : 'Metal industry - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 520 ,
            'title'    : 'Metal industry - metal supply/stocks' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 522 ,
            'title'    : 'Metal industry - other worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 523 ,
            'title'    : 'Metal industry - sheet metal worker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1022 ,
            'title'    : 'Metal industry - skilled supervisor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 521 ,
            'title'    : 'Metal industry - skilled worker' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 524 ,
            'title'    : 'Metallurgist (100% offfice/lab work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 525 ,
            'title'    : 'Metallurgist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 526 ,
            'title'    : 'Meteorologist (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 527 ,
            'title'    : 'Meter reader' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 528 ,
            'title'    : 'Milk delivery' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 529 ,
            'title'    : 'Milk vendor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1023 ,
            'title'    : 'Milkbar employee (no cooking)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1096 ,
            'title'    : 'Mining - assayer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1097 ,
            'title'    : 'Mining - boilermaker/welder (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1098 ,
            'title'    : 'Mining - boilermaker/welder (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1100 ,
            'title'    : 'Mining - carpenter (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1101 ,
            'title'    : 'Mining - carpenter (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1099 ,
            'title'    : 'Mining - carpenter (apprentice)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1102 ,
            'title'    : 'Mining - chemical engineer (office only)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1103 ,
            'title'    : 'Mining - chemical engineer/industrial chemist (non hazardous materials)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1104 ,
            'title'    : 'Mining - clerical' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1105 ,
            'title'    : 'Mining - dragline operator' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1106 ,
            'title'    : 'Mining - driver/operator - bogger' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1107 ,
            'title'    : 'Mining - driver/operator - crane' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1108 ,
            'title'    : 'Mining - driver/operator - dump truck' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1109 ,
            'title'    : 'Mining - driver/operator - excavator' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1110 ,
            'title'    : 'Mining - driver/operator - jumbo' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1111 ,
            'title'    : 'Mining - driver/operator - mill' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1112 ,
            'title'    : 'Mining - driver/operator - truck' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1114 ,
            'title'    : 'Mining - electrician (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1115 ,
            'title'    : 'Mining - electrician (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1113 ,
            'title'    : 'Mining - electrician (apprentice)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1116 ,
            'title'    : 'Mining - electronic technician (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1117 ,
            'title'    : 'Mining - electronic technician (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1119 ,
            'title'    : 'Mining - engineer (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1120 ,
            'title'    : 'Mining - engineer (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1118 ,
            'title'    : 'Mining - engineer (office only)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1121 ,
            'title'    : 'Mining - explosives handler - hard rock' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1122 ,
            'title'    : 'Mining - explosives handler - soft rock open cut (explosives exclusion to apply)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1124 ,
            'title'    : 'Mining - fitter/turner (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1125 ,
            'title'    : 'Mining - fitter/turner (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1123 ,
            'title'    : 'Mining - fitter/turner (apprentice)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1126 ,
            'title'    : 'Mining - foreman (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1191 ,
            'title'    : 'Mining - foreman (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1128 ,
            'title'    : 'Mining - geologist (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1129 ,
            'title'    : 'Mining - geologist (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1127 ,
            'title'    : 'Mining - geologist (office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1130 ,
            'title'    : 'Mining - instrument technician (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1131 ,
            'title'    : 'Mining - instrument technician (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1133 ,
            'title'    : 'Mining - longwall co-ordinator (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1192 ,
            'title'    : 'Mining - longwall co-ordinator (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1134 ,
            'title'    : 'Mining - maintenance supervisor (no manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1135 ,
            'title'    : 'Mining - maintenance worker' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1137 ,
            'title'    : 'Mining - mechanic (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1138 ,
            'title'    : 'Mining - mechanic (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1136 ,
            'title'    : 'Mining - mechanic (apprentice)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1139 ,
            'title'    : 'Mining - metallurgist (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1140 ,
            'title'    : 'Mining - metallurgist (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1141 ,
            'title'    : 'Mining - mill superintendent (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1193 ,
            'title'    : 'Mining - mill superintendent (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1143 ,
            'title'    : 'Mining - mine deputy (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1144 ,
            'title'    : 'Mining - mine deputy (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1142 ,
            'title'    : 'Mining - mine deputy (office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1146 ,
            'title'    : 'Mining - mine manager (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1147 ,
            'title'    : 'Mining - mine manager (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1145 ,
            'title'    : 'Mining - mine manager (office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1132 ,
            'title'    : 'Mining - miner/driller' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1148 ,
            'title'    : 'Mining - O.H. and S. manager (degree qualified, office only)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1150 ,
            'title'    : 'Mining - O.H. and S. manager (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1151 ,
            'title'    : 'Mining - O.H. and S. manager (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1149 ,
            'title'    : 'Mining - O.H. and S. manager (not degree qualified, office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1152 ,
            'title'    : 'Mining - pit technician' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1153 ,
            'title'    : 'Mining - plant operator' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1155 ,
            'title'    : 'Mining - plumber (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1156 ,
            'title'    : 'Mining - plumber (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1154 ,
            'title'    : 'Mining - plumber (apprentice)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1160 ,
            'title'    : 'Mining - rescue /recovery team (fire)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1161 ,
            'title'    : 'Mining - safety officer (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1162 ,
            'title'    : 'Mining - safety officer (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1163 ,
            'title'    : 'Mining - sandblaster' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1164 ,
            'title'    : 'Mining - shotfirer - hard rock' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1165 ,
            'title'    : 'Mining - shotfirer - soft rock open cut (explosives exclusion to apply)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1194 ,
            'title'    : 'Mining - soft rock underground - driver/operator - dump truck' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1195 ,
            'title'    : 'Mining - soft rock underground - carpenter' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1196 ,
            'title'    : 'Mining - soft rock underground - dragline operator' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1197 ,
            'title'    : 'Mining - soft rock underground - driver/operator - bogger' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1198 ,
            'title'    : 'Mining - soft rock underground - driver/operator - crane' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1199 ,
            'title'    : 'Mining - soft rock underground - driver/operator - excavator' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1200 ,
            'title'    : 'Mining - soft rock underground - driver/operator - jumbo' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1201 ,
            'title'    : 'Mining - soft rock underground - driver/operator - mill' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1202 ,
            'title'    : 'Mining - soft rock underground - driver/operator - truck' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1203 ,
            'title'    : 'Mining - soft rock underground - electrician' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1204 ,
            'title'    : 'Mining - soft rock underground - explosives handler (explosives exclusion to apply)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1205 ,
            'title'    : 'Mining - soft rock underground - fitter/turner' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1206 ,
            'title'    : 'Mining - soft rock underground - foreman' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1208 ,
            'title'    : 'Mining - soft rock underground - longwall co-ordinator (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1209 ,
            'title'    : 'Mining - soft rock underground - maintenance worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1210 ,
            'title'    : 'Mining - soft rock underground - mechanic' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1211 ,
            'title'    : 'Mining - soft rock underground - mill superintendent' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1249 ,
            'title'    : 'Mining - soft rock underground - mine deputy (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1207 ,
            'title'    : 'Mining - soft rock underground - miner/driller' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1212 ,
            'title'    : 'Mining - soft rock underground - pit technician' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1213 ,
            'title'    : 'Mining - soft rock underground - plant operator' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1214 ,
            'title'    : 'Mining - soft rock underground - plumber' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1215 ,
            'title'    : 'Mining - soft rock underground - sandblaster' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1216 ,
            'title'    : 'Mining - soft rock underground - shotfirer (explosives exclusion to apply)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1217 ,
            'title'    : 'Mining - soft rock underground - supervisor (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1218 ,
            'title'    : 'Mining - soft rock underground - train driver' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1167 ,
            'title'    : 'Mining - supervisor (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1219 ,
            'title'    : 'Mining - supervisor (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1166 ,
            'title'    : 'Mining - supervisor (office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1169 ,
            'title'    : 'Mining - surveyor (field work) (<5yrs mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1170 ,
            'title'    : 'Mining - surveyor (field work) (5yrs or more mining exp)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1168 ,
            'title'    : 'Mining - surveyor (office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1171 ,
            'title'    : 'Mining - train driver' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 535 ,
            'title'    : 'Minister of religion (sole occupation)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 536 ,
            'title'    : 'Model' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 537 ,
            'title'    : 'Motor vehicle industry - assembly/production line worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 538 ,
            'title'    : 'Motor vehicle industry - dealer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 539 ,
            'title'    : 'Motor vehicle industry - detailer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 540 ,
            'title'    : 'Motor vehicle industry - mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 541 ,
            'title'    : 'Motor vehicle industry - parts retailer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 542 ,
            'title'    : 'Motor vehicle industry - sales' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 543 ,
            'title'    : 'Motor vehicle industry - wrecker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 544 ,
            'title'    : 'Musician - orchestral' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 546 ,
            'title'    : 'Musician - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 545 ,
            'title'    : 'Musician - teacher (full-time, not working from home)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1090 ,
            'title'    : 'Mustering (excluding aerial)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 547 ,
            'title'    : 'Naturopath (government registered, not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 548 ,
            'title'    : 'Naturopath (other)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 549 ,
            'title'    : 'Navy personnel (all ranks)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 550 ,
            'title'    : 'Neurologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1073 ,
            'title'    : 'Not currently employed' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 551 ,
            'title'    : 'Nurse - aide' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 552 ,
            'title'    : 'Nurse - dental' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 553 ,
            'title'    : 'Nurse - general (enrolled)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 554 ,
            'title'    : 'Nurse - general (registered)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 555 ,
            'title'    : 'Nurse - geriatric' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 556 ,
            'title'    : 'Nurse - midwife' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 558 ,
            'title'    : 'Nurse - primarily engaged in administration (eg. director of nursing/matron)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 557 ,
            'title'    : 'Nurse - psychiatric' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 559 ,
            'title'    : 'Nurse - veterinary' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 560 ,
            'title'    : 'Obstetrician (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 561 ,
            'title'    : 'Occupational therapist (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1220 ,
            'title'    : 'Oil and gas - offshore - hazardous duties e.g. working with explosives or diving' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1221 ,
            'title'    : 'Oil and gas - offshore - professional' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1222 ,
            'title'    : 'Oil and gas - offshore - rig personnel, drillers (non-hazardous duties)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1174 ,
            'title'    : 'Oil and gas - onshore - administration/clerical' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 562 ,
            'title'    : 'Oil and gas - onshore - distributor (no delivery work involved)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 564 ,
            'title'    : 'Oil and gas - onshore - driller (no explosives)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1187 ,
            'title'    : 'Oil and gas - onshore - engineer (degree qualified, office only)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1189 ,
            'title'    : 'Oil and gas - onshore - geologist (degree qualified, office only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 566 ,
            'title'    : 'Oil and gas - onshore - management' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 574 ,
            'title'    : 'Oil and gas - onshore - other (working with explosives, drilling, rigs, underground work or diving)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 569 ,
            'title'    : 'Oil and gas - onshore - pipeline worker (skilled, trade qualified, surface work only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 570 ,
            'title'    : 'Oil and gas - onshore - pipeline worker (unskilled, surface work only)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1190 ,
            'title'    : 'Oil and gas - onshore - professional (degree qualified, office only)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 567 ,
            'title'    : 'Oil and gas - onshore - refinery worker (skilled, trade qualified, no rigging involved)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 568 ,
            'title'    : 'Oil and gas - onshore - refinery worker (unskilled, no rigging involved)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 571 ,
            'title'    : 'Oil and gas - onshore - rig personnel' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 572 ,
            'title'    : 'Oil and gas - onshore - tanker driver (local)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 573 ,
            'title'    : 'Oil and gas - onshore - tanker driver (long distance)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 575 ,
            'title'    : 'Opthalmic surgeon (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 576 ,
            'title'    : 'Opthalmologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 577 ,
            'title'    : 'Optician' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 578 ,
            'title'    : 'Optometrist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 579 ,
            'title'    : 'Orchardist' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 580 ,
            'title'    : 'Orthodontist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 581 ,
            'title'    : 'Orthopaedist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 582 ,
            'title'    : 'Osteopath (registered)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 584 ,
            'title'    : 'Oyster farmer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 585 ,
            'title'    : 'Paediatrician (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 586 ,
            'title'    : 'Painter (with trade qualification, does not work above 10 metres)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 587 ,
            'title'    : 'Painter (with trade qualification, works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 588 ,
            'title'    : 'Painter (without trade qualification, does not work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 589 ,
            'title'    : 'Painter (without trade qualification, works above 10 metres)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 590 ,
            'title'    : 'Panel beater (with trade qualification)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 591 ,
            'title'    : 'Park ranger' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 593 ,
            'title'    : 'Parking inspector' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 592 ,
            'title'    : 'Parking station attendant' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 594 ,
            'title'    : 'Pastry cook' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 595 ,
            'title'    : 'Pathologist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1024 ,
            'title'    : 'Pathology analyst' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1091 ,
            'title'    : 'Patio erector/installer (trade qualified/licensed)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 597 ,
            'title'    : 'Paver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1026 ,
            'title'    : 'Personal care attendant (works in client homes)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1025 ,
            'title'    : 'Personal care attendant (works in hospitals/aged care facilities)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1092 ,
            'title'    : 'Personal trainer (other)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 947 ,
            'title'    : 'Personal trainer (qualified, minimum 3 years experience, working in practice/sports club only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 598 ,
            'title'    : 'Pest controller' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 599 ,
            'title'    : 'Pharmacist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 600 ,
            'title'    : 'Photoengraver' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 601 ,
            'title'    : 'Photographer - local (more than 25% studio work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 604 ,
            'title'    : 'Photographer - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 605 ,
            'title'    : 'Physician - specialist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1027 ,
            'title'    : 'Physicist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 606 ,
            'title'    : 'Physiotherapist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 607 ,
            'title'    : 'Piano tuner' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 608 ,
            'title'    : 'Picture framer (not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 609 ,
            'title'    : 'Plasterer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 610 ,
            'title'    : 'Plastic surgeon (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1071 ,
            'title'    : 'Plumber (4th year apprentice)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 612 ,
            'title'    : 'Plumber (roof)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 611 ,
            'title'    : 'Plumber (trade qualified/domestic only)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 613 ,
            'title'    : 'Podiatrist/chiropodist (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 617 ,
            'title'    : 'Police - general duties' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 615 ,
            'title'    : 'Police - motorcyclist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 616 ,
            'title'    : 'Police - non motorcyclist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 618 ,
            'title'    : 'Police - rescue and tactics' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 619 ,
            'title'    : 'Police - special weapons' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 620 ,
            'title'    : 'Police - superintendent, senior officer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 621 ,
            'title'    : 'Porter (minimum 2 years experience)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 622 ,
            'title'    : 'Post office - agent (sole business)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 948 ,
            'title'    : 'Post office - australia post employee - post delivery (motorcycle)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 623 ,
            'title'    : 'Post office - australia post employee - post delivery (not motorcycle)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 624 ,
            'title'    : 'Post office - australia post employee - sorter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 625 ,
            'title'    : 'Post office - australia post employee - supervisor/clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 949 ,
            'title'    : 'Post office - australia post shop employee' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 626 ,
            'title'    : 'Pottery and ceramics - potter (more than 2 years established, not working from home)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 627 ,
            'title'    : 'Printer/publisher (no manual work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 628 ,
            'title'    : 'Printer/publisher (skilled manual work, e.g. engraver/linotype operator)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 630 ,
            'title'    : 'Prisons - administration only' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 631 ,
            'title'    : 'Prisons - guard, other workers' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 632 ,
            'title'    : 'Private detective (armed/unarmed)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 633 ,
            'title'    : 'Process worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 634 ,
            'title'    : 'Production line worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 635 ,
            'title'    : 'Professional sports person' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 636 ,
            'title'    : 'Property consultant' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 638 ,
            'title'    : 'Property developer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 637 ,
            'title'    : 'Property investor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 639 ,
            'title'    : 'Psychiatrist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 640 ,
            'title'    : 'Psychologist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1029 ,
            'title'    : 'Public relations (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 641 ,
            'title'    : 'Public servant (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 643 ,
            'title'    : 'Purchasing officer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 645 ,
            'title'    : 'Quantity surveyor' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 646 ,
            'title'    : 'Quarry worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 647 ,
            'title'    : 'Radio operators - airports' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 648 ,
            'title'    : 'Radio/television/film industry - actor/actress' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 649 ,
            'title'    : 'Radio/television/film industry - administration (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 650 ,
            'title'    : 'Radio/television/film industry - announcer (employee)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 652 ,
            'title'    : 'Radio/television/film industry - camera operator (on location, no overseas work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 651 ,
            'title'    : 'Radio/television/film industry - camera operator (studio only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 654 ,
            'title'    : 'Radio/television/film industry - choreographer/dancer/instructor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 655 ,
            'title'    : 'Radio/television/film industry - director/producer (employee)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 656 ,
            'title'    : 'Radio/television/film industry - editor (employee)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 657 ,
            'title'    : 'Radio/television/film industry - engineer (employee)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 658 ,
            'title'    : 'Radio/television/film industry - make up artist (employee)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 659 ,
            'title'    : 'Radio/television/film industry - projectionist (employee)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 660 ,
            'title'    : 'Radio/television/film industry - reporter (employee, no overseas work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 661 ,
            'title'    : 'Radio/television/film industry - tv/radio technician/repairer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 662 ,
            'title'    : 'Radiographer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 663 ,
            'title'    : 'Radiologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1248 ,
            'title'    : 'Railway worker - customer service' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 664 ,
            'title'    : 'Railway worker - driver' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 665 ,
            'title'    : 'Railway worker - fireperson' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 666 ,
            'title'    : 'Railway worker - guard (not security)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 667 ,
            'title'    : 'Railway worker - inspector (tickets only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 668 ,
            'title'    : 'Railway worker - labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 669 ,
            'title'    : 'Railway worker - maintenance' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 670 ,
            'title'    : 'Railway worker - porter' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 671 ,
            'title'    : 'Railway worker - shunter' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 672 ,
            'title'    : 'Railway worker - signal person' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 674 ,
            'title'    : 'Railway worker - station assistant' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 673 ,
            'title'    : 'Railway worker - station master' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 675 ,
            'title'    : 'Railway worker - ticket collector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 676 ,
            'title'    : 'Railway worker - track laying' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 677 ,
            'title'    : 'Real estate - administration/clerical (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 678 ,
            'title'    : 'Real estate - agent' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 679 ,
            'title'    : 'Real estate - auctioneer (minimum 3 years experience)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 680 ,
            'title'    : 'Real estate - developer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 681 ,
            'title'    : 'Real estate - valuer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 682 ,
            'title'    : 'Receptionist' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 683 ,
            'title'    : 'Refrigeration mechanic/repairer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 684 ,
            'title'    : 'Registrar/manager' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 688 ,
            'title'    : 'Repairer/service technician - heavy manual' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 687 ,
            'title'    : 'Repairer/service technician - light manual (eg. office machines)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 689 ,
            'title'    : 'Reporter - radio/television (employee, no overseas work)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 690 ,
            'title'    : 'Restaurant owner/proprietor - chef/cook (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 691 ,
            'title'    : 'Restaurant owner/proprietor - proprietor/manager (5 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 692 ,
            'title'    : 'Restaurant owner/proprietor - proprietor/manager (less than 5 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1074 ,
            'title'    : 'Retired' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 694 ,
            'title'    : 'Riding instructor' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 696 ,
            'title'    : 'Rigger' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 697 ,
            'title'    : 'Roadmaker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 698 ,
            'title'    : 'Rock driller' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 699 ,
            'title'    : 'Roof plumber' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 700 ,
            'title'    : 'Salesperson - delivery' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 701 ,
            'title'    : 'Salesperson - non delivery' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 702 ,
            'title'    : 'Sand blaster' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 703 ,
            'title'    : 'Schools - administration staff (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 704 ,
            'title'    : 'Schools - inspector' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 707 ,
            'title'    : 'Schools - principal' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 709 ,
            'title'    : 'Schools - teacher - manual subjects' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 710 ,
            'title'    : 'Schools - teacher - music' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 711 ,
            'title'    : 'Schools - teacher - non manual subjects' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 705 ,
            'title'    : 'Schools - teacher - physical (eg. physical education, dancing)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 706 ,
            'title'    : 'Schools - teacher - pre school' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 708 ,
            'title'    : 'Schools - teacher - trade (eg. agriculture, technical college)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 712 ,
            'title'    : 'Scrap dealer - metal industry' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1031 ,
            'title'    : 'Search/rescue worker - not volunteer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 950 ,
            'title'    : 'Seasonal workers' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 713 ,
            'title'    : 'Secretary/stenographer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 714 ,
            'title'    : 'Security guard (armed)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 715 ,
            'title'    : 'Security guard (unarmed)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 717 ,
            'title'    : 'Security installation' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 720 ,
            'title'    : 'Service station/garage - attendant/worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 721 ,
            'title'    : 'Service station/garage - console operator (no driveway work)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 722 ,
            'title'    : 'Service station/garage - mechanic (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 723 ,
            'title'    : 'Service station/garage - proprietor/manager (no mechanical work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 724 ,
            'title'    : 'Shearer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 725 ,
            'title'    : 'Shipping/maritime industry seagoing personnel - crew' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 727 ,
            'title'    : 'Shipping/maritime industry seagoing personnel - engineer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 726 ,
            'title'    : 'Shipping/maritime industry seagoing personnel - officer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 728 ,
            'title'    : 'Shipping/maritime industry shore personnel - administration only (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 729 ,
            'title'    : 'Shipping/maritime industry shore personnel - dock worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 730 ,
            'title'    : 'Shipping/maritime industry shore personnel - shipyard worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 731 ,
            'title'    : 'Shipwright' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 951 ,
            'title'    : 'Shopfitter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 732 ,
            'title'    : 'Shopkeeper/proprietor - antiques (restoration)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 733 ,
            'title'    : 'Shopkeeper/proprietor - antiques (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 734 ,
            'title'    : 'Shopkeeper/proprietor - aquarium' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 735 ,
            'title'    : 'Shopkeeper/proprietor - art supplies' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 736 ,
            'title'    : 'Shopkeeper/proprietor - bedding' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 737 ,
            'title'    : 'Shopkeeper/proprietor - bicycles' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 738 ,
            'title'    : 'Shopkeeper/proprietor - books/stationery/cards' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 740 ,
            'title'    : 'Shopkeeper/proprietor - bread/cake (no baking)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 741 ,
            'title'    : 'Shopkeeper/proprietor - cane' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 742 ,
            'title'    : 'Shopkeeper/proprietor - carpets/floorcoverings' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 743 ,
            'title'    : 'Shopkeeper/proprietor - chemist/pharmacy sales' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 744 ,
            'title'    : 'Shopkeeper/proprietor - china/glass' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 745 ,
            'title'    : 'Shopkeeper/proprietor - clothing' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 746 ,
            'title'    : 'Shopkeeper/proprietor - coffee/cafe/lounge - employee' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 747 ,
            'title'    : 'Shopkeeper/proprietor - coffee/cafe/lounge - proprietor (admin only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 748 ,
            'title'    : 'Shopkeeper/proprietor - computer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 749 ,
            'title'    : 'Shopkeeper/proprietor - confection (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 750 ,
            'title'    : 'Shopkeeper/proprietor - curtain (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 751 ,
            'title'    : 'Shopkeeper/proprietor - delicatessen' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 752 ,
            'title'    : 'Shopkeeper/proprietor - department store' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 753 ,
            'title'    : 'Shopkeeper/proprietor - disposal' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 755 ,
            'title'    : 'Shopkeeper/proprietor - dry cleaning - employee' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 754 ,
            'title'    : 'Shopkeeper/proprietor - dry cleaning - owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 756 ,
            'title'    : 'Shopkeeper/proprietor - duty free' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 757 ,
            'title'    : 'Shopkeeper/proprietor - electrical/radio sales' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 758 ,
            'title'    : 'Shopkeeper/proprietor - fast food' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 759 ,
            'title'    : 'Shopkeeper/proprietor - fish and chips' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 760 ,
            'title'    : 'Shopkeeper/proprietor - fishmonger' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 761 ,
            'title'    : 'Shopkeeper/proprietor - florist - administration/sales' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 762 ,
            'title'    : 'Shopkeeper/proprietor - florist - deliveries' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 763 ,
            'title'    : 'Shopkeeper/proprietor - furniture (deliveries)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 764 ,
            'title'    : 'Shopkeeper/proprietor - furniture (light manual)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 765 ,
            'title'    : 'Shopkeeper/proprietor - furniture (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 766 ,
            'title'    : 'Shopkeeper/proprietor - furrier' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 767 ,
            'title'    : 'Shopkeeper/proprietor - general store' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 768 ,
            'title'    : 'Shopkeeper/proprietor - gift' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 769 ,
            'title'    : 'Shopkeeper/proprietor - glass (plate glass etc)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 770 ,
            'title'    : 'Shopkeeper/proprietor - greengrocer/fruiterer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 771 ,
            'title'    : 'Shopkeeper/proprietor - grocer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 772 ,
            'title'    : 'Shopkeeper/proprietor - gunsmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 773 ,
            'title'    : 'Shopkeeper/proprietor - haberdashery/drapery' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 774 ,
            'title'    : 'Shopkeeper/proprietor - health foods' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 775 ,
            'title'    : 'Shopkeeper/proprietor - ice cream' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 776 ,
            'title'    : 'Shopkeeper/proprietor - jeweller (retail only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 777 ,
            'title'    : 'Shopkeeper/proprietor - lawn mower (sales and service)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 778 ,
            'title'    : 'Shopkeeper/proprietor - light fittings' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 779 ,
            'title'    : 'Shopkeeper/proprietor - lingerie' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 780 ,
            'title'    : 'Shopkeeper/proprietor - liquor store manager' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 781 ,
            'title'    : 'Shopkeeper/proprietor - locksmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 782 ,
            'title'    : 'Shopkeeper/proprietor - milkbar' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 783 ,
            'title'    : 'Shopkeeper/proprietor - milliner (retail only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 784 ,
            'title'    : 'Shopkeeper/proprietor - mobile (eg. ice cream, donuts)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 785 ,
            'title'    : 'Shopkeeper/proprietor - motor spares' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 786 ,
            'title'    : 'Shopkeeper/proprietor - musical equipment (sales)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 787 ,
            'title'    : 'Shopkeeper/proprietor - newsagent (shop sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1033 ,
            'title'    : 'Shopkeeper/proprietor - not otherwise rated - heavy goods (eg. machinery)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1032 ,
            'title'    : 'Shopkeeper/proprietor - not otherwise rated - light goods only (eg. clothes)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 789 ,
            'title'    : 'Shopkeeper/proprietor - nursery person (plants)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 791 ,
            'title'    : 'Shopkeeper/proprietor - office supplies' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 792 ,
            'title'    : 'Shopkeeper/proprietor - outdoor supplies' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 793 ,
            'title'    : 'Shopkeeper/proprietor - paint/wallpaper' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 794 ,
            'title'    : 'Shopkeeper/proprietor - pawnbroker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 795 ,
            'title'    : 'Shopkeeper/proprietor - pet shop' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 796 ,
            'title'    : 'Shopkeeper/proprietor - photographic (sales)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 797 ,
            'title'    : 'Shopkeeper/proprietor - photographic (service and parts)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 798 ,
            'title'    : 'Shopkeeper/proprietor - produce merchant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 799 ,
            'title'    : 'Shopkeeper/proprietor - record' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 800 ,
            'title'    : 'Shopkeeper/proprietor - second hand' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 801 ,
            'title'    : 'Shopkeeper/proprietor - shoe store (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 802 ,
            'title'    : 'Shopkeeper/proprietor - skin/hide/leather' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 803 ,
            'title'    : 'Shopkeeper/proprietor - sporting' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 805 ,
            'title'    : 'Shopkeeper/proprietor - supermarket - deliveries' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 806 ,
            'title'    : 'Shopkeeper/proprietor - supermarket - other employee' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 804 ,
            'title'    : 'Shopkeeper/proprietor - supermarket - store manager (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1072 ,
            'title'    : 'Shopkeeper/proprietor - supermarket - store manager (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 807 ,
            'title'    : 'Shopkeeper/proprietor - swimming pool (sales only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 808 ,
            'title'    : 'Shopkeeper/proprietor - tobacco' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 809 ,
            'title'    : 'Shopkeeper/proprietor - toys' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 810 ,
            'title'    : 'Shopkeeper/proprietor - video shop' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 811 ,
            'title'    : 'Sign erector' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 812 ,
            'title'    : 'Signwriter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 813 ,
            'title'    : 'Skipper' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 814 ,
            'title'    : 'Slaughterer - meat industry' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 815 ,
            'title'    : 'Social worker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 816 ,
            'title'    : 'Soft drink manufacturer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 952 ,
            'title'    : 'Solicitor' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1076 ,
            'title'    : 'Sonographer (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 817 ,
            'title'    : 'Specialist physician (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 818 ,
            'title'    : 'Speech therapist (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1034 ,
            'title'    : 'Sporting/fitness club coach' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 819 ,
            'title'    : 'Sports centre - proprietor/manager - admin only (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 820 ,
            'title'    : 'Sports centre - worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 821 ,
            'title'    : 'Spray painter (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 822 ,
            'title'    : 'Squash court proprietor (full-time, non professional playing)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 823 ,
            'title'    : 'Stage manager - film/theatre (no manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1035 ,
            'title'    : 'Statistician (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 824 ,
            'title'    : 'Steel erector/fixer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 695 ,
            'title'    : 'Steel fixer/ scaffolder' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 825 ,
            'title'    : 'Stevedore' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 826 ,
            'title'    : 'Stock and station agent' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 827 ,
            'title'    : 'Stockbroker' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 828 ,
            'title'    : 'Stockyard worker/drover' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 829 ,
            'title'    : 'Stonemason' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 830 ,
            'title'    : 'Storeperson (light manual)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 831 ,
            'title'    : 'Storeperson and packer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 832 ,
            'title'    : 'Student' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 833 ,
            'title'    : 'Student pilot' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 834 ,
            'title'    : 'Stuntperson - film/theatre' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 835 ,
            'title'    : 'Stuntperson - television/films' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 836 ,
            'title'    : 'Substation operator - electrical industry' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 837 ,
            'title'    : 'Surface worker (explosives use - exclusion to apply)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 838 ,
            'title'    : 'Surface worker (qualified, no explosives use)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 839 ,
            'title'    : 'Surgeon (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 840 ,
            'title'    : 'Surveyor - aviation' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 841 ,
            'title'    : 'Surveyor - consulting' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 842 ,
            'title'    : 'Surveyor - explosives' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 843 ,
            'title'    : 'Surveyor - field' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 846 ,
            'title'    : 'Surveyor - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 847 ,
            'title'    : 'Surveyor - other (qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 844 ,
            'title'    : 'Surveyor marine' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 850 ,
            'title'    : 'Swimming instructor (full-time, not seasonal)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 851 ,
            'title'    : 'Swimming pool - attendant' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 848 ,
            'title'    : 'Swimming pool - builder' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 849 ,
            'title'    : 'Swimming pool - proprietor/manager' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 852 ,
            'title'    : 'Switch (operator, repairer) - electrical industry' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 37 ,
            'title'    : 'Tab - totalisator (full-time, sole occupation)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 853 ,
            'title'    : 'Tailor (not working from home' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 854 ,
            'title'    : 'Tailor (working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 855 ,
            'title'    : 'Tanner' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1093 ,
            'title'    : 'Tattooist (minimum 5 years experience, shop only)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 856 ,
            'title'    : 'Tax consultant' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 857 ,
            'title'    : 'Technician - electronic' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 861 ,
            'title'    : 'Technician - engineer - film/theatre' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 858 ,
            'title'    : 'Technician - radio/television' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 859 ,
            'title'    : 'Technician - stage hand (roadie)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 860 ,
            'title'    : 'Technician - stage hand technician' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 862 ,
            'title'    : 'Telecommunications/telephone - engineer (degree qualified, 100% office work)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 863 ,
            'title'    : 'Telecommunications/telephone - engineer (not degree qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 865 ,
            'title'    : 'Telecommunications/telephone - lines installer or line repairer - others' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 864 ,
            'title'    : 'Telecommunications/telephone - lines installer or line repairer - tower' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 866 ,
            'title'    : 'Telephonist' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 867 ,
            'title'    : 'Tennis coach (full-time, minimum 3 years experience, not touring or professional player)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 869 ,
            'title'    : 'Test pilot' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 868 ,
            'title'    : 'Textile workers' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 870 ,
            'title'    : 'Theatre/cinema industry - actor/actress (full-time)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 871 ,
            'title'    : 'Theatre/cinema industry - director/producer (full-time)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 872 ,
            'title'    : 'Theatre/cinema industry - make up artist (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 873 ,
            'title'    : 'Theatre/cinema industry - management (full-time, 100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 874 ,
            'title'    : 'Theatre/cinema industry - projectionist (full-time)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 875 ,
            'title'    : 'Theatre/cinema industry - ticket seller/usher (full-time)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 877 ,
            'title'    : 'Tiler - floor/wall' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 878 ,
            'title'    : 'Tiler - roof' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1036 ,
            'title'    : 'Timber - cutter/getter/feller/logger' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1037 ,
            'title'    : 'Timber - sawmill - milling/log work' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1038 ,
            'title'    : 'Timber - sawmill - stacking and similar duties' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1039 ,
            'title'    : 'Timber - using explosives' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 880 ,
            'title'    : 'Timber merchant (manual work)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 879 ,
            'title'    : 'Timber merchant (no manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 881 ,
            'title'    : 'Toll collector' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 882 ,
            'title'    : 'Toolmaker (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 883 ,
            'title'    : 'Tour guides' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 885 ,
            'title'    : 'Town planner' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 886 ,
            'title'    : 'Toxicologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 887 ,
            'title'    : 'Trades/technical - lecturer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 888 ,
            'title'    : 'Tramway workers - tram conductor' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 889 ,
            'title'    : 'Tramway workers - tram driver' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1094 ,
            'title'    : 'Transit guard (bus/train) - armed' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1095 ,
            'title'    : 'Transit guard (bus/train) - unarmed' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 890 ,
            'title'    : 'Travel agent/consultant' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 891 ,
            'title'    : 'Tree lopper' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 892 ,
            'title'    : 'Tree surgeon (fully qualified, more than 2 years established, no heights)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 893 ,
            'title'    : 'Trench digger' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 894 ,
            'title'    : 'Trimmer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 895 ,
            'title'    : 'Trotting driver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 896 ,
            'title'    : 'Tug boat crew (not deep sea)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 897 ,
            'title'    : 'Tunneller/shaft worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 899 ,
            'title'    : 'Typist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 900 ,
            'title'    : 'Tyre fitter' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1075 ,
            'title'    : 'Unemployed' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 904 ,
            'title'    : 'University - lecturer/professor/dean (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 901 ,
            'title'    : 'University - office administration staff (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 903 ,
            'title'    : 'University - tutor (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 905 ,
            'title'    : 'Upholsterer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 906 ,
            'title'    : 'Urologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 907 ,
            'title'    : 'Valuer (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 908 ,
            'title'    : 'Vending machine serviceman' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 909 ,
            'title'    : 'Veterinarian - domestic pets (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 910 ,
            'title'    : 'Veterinarian - other' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 911 ,
            'title'    : 'Veterinary surgeon - city practice (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 912 ,
            'title'    : 'Veterinary surgeon - country practice' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 913 ,
            'title'    : 'Vigneron/winemaker (minimal manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 914 ,
            'title'    : 'Waiter/waitress - bar duties incuded' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 915 ,
            'title'    : 'Waiter/waitress - table service only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 916 ,
            'title'    : 'Wardrobe - film/theatre' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 917 ,
            'title'    : 'Wardrobe - radio/television' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 918 ,
            'title'    : 'Washing machine mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 919 ,
            'title'    : 'Watchmaker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 921 ,
            'title'    : 'Welder (with trade qualification)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 920 ,
            'title'    : 'Welder (without trade qualification)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 922 ,
            'title'    : 'White water rafting - guide/instructor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 923 ,
            'title'    : 'Window dresser' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1040 ,
            'title'    : 'Window framers/fitters' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 924 ,
            'title'    : 'Windscreen fitter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 925 ,
            'title'    : 'Wine/spirit merchant' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 926 ,
            'title'    : 'Wool buyer/classer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 927 ,
            'title'    : 'Word processing operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 928 ,
            'title'    : 'Wrecker (building) - supervisor/manager/overseer' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 929 ,
            'title'    : 'Wrecker/demolisher - foreperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 930 ,
            'title'    : 'Wrecker/demolisher - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 931 ,
            'title'    : 'X-ray technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 932 ,
            'title'    : 'Yard worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 933 ,
            'title'    : 'Youth worker/welfare officer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 934 ,
            'title'    : 'Youth worker/welfare officer (other)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 935 ,
            'title'    : 'Zoo keeper/wildlife attendant' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 953 ,
            'title'    : 'Zoologist (degree qualified, field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 936 ,
            'title'    : 'Zoologist (degree qualified, lab only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        }
    ];
    public site : string                  = 'AMP DDC';
            version : string;
            components : IComponentMeta[] = [];

    constructor ( public navigation : NavigationService ,
                  public router : Router ,
                  private _components : ComponentsService ) {
        this._components.getComponents()
            .then( ( comps ) => {
                console.log( 'comps' , comps );
                this.components = comps;
            } );
    }
}
