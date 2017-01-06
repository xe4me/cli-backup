import {
    Component,
    animate,
    state,
    style,
    transition,
    trigger,
    AfterContentInit,
    ViewChild
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme';
import { Observable } from 'rxjs';
import { isPresent } from '../../../app/modules/amp-utils/functions.utils';
@Component( {
    selector   : 'left-navigation',
    template   : `
    <div class='left-navigation'>
            <amp-input #queryFilter class='grid__item 1/1 mt-' [showOptional]="false" placeholder='Search here ...'></amp-input>
            <div class="option-group" (click)="navigate(['Index']);toggleAccordion(-1)" [class.option-group--active]='activeAccordion===INDEX_ID'>
                <span class="icon icon--faqs "></span> Get started
            </div>
            <div [@openClose]='activeAccordion===INDEX_ID?"expanded":"collapsed"' class="options" *ngIf='!queryFilter.control?.value'>
                <div class="option" *ngFor="let content of contentTable"
                     (click)="scrollService.scrollToComponentSelector(content.link)"
                     [class.option--active]='activeComponentId===content.link'>
                    {{ content.title }}
                </div>
            </div>
        <div class="theme grid">
            <div *ngFor="let theme of themeService.themes ; let i = index" class="grid__item 1/2">
                <div (click)="changeTheme(theme)" class="theme__item"
                 [class.active]="theme.attr===themeService.theme.attr"
                [ngStyle]="{'background-color':theme.color}">{{ theme.name }}
                </div>
            </div>
        </div>
        <div *ngFor="let cpmGroup of doFilterGroups(componentsGrouped , queryFilter.control?.value) ; let i =index">
            <button type="button" class="option-group" (click)="toggleAccordion(i)" [class.option-group--active]='activeAccordion===i'>
                <span [ngClass]="{'icon--chevron-down':activeAccordion===i,'icon--chevron-right':activeAccordion!==i}" class="icon "></span>{{ cpmGroup.type }}
            </button>
            <div [@openClose]='openCloseDropdown(i,filteredGroup.length)' class="options">
                <a href="javascript:void(0);" class="option" *ngFor="let cmp of doFilter(cpmGroup.components , queryFilter.control?.value); let
                i =
                index "
                     (click)="navigate(['component', cmp.id])"
                     [class.option--active]='activeComponentId===cmp.id'>
                    {{ cmp.name }}
                </a>
            </div>
        </div>

    </div>
`,
    inputs     : [ 'filter', 'components', 'componentsGrouped', 'contentTable' ],
    styles     : [ require( './left-navigation.component.scss' ) ],
    animations : [
        trigger(
            'openClose',
            [
                state( 'collapsed, void', style( { height : '0px', opacity : '0', display : 'none' } ) ),
                state( 'expanded', style( { height : '*', opacity : '1', overflow : 'hidden', display : 'block' } ) ),
                transition( 'collapsed <=> expanded', [ animate( '250ms linear' ) ] )
            ] )
    ]
} )
export class LeftNavigationComponent implements AfterContentInit {
    @ViewChild( 'queryFilter' ) queryFilter;
    private activeComponentId = null;
    private INDEX_ID          = -1;
    private activeAccordion   = this.INDEX_ID;
    private filteredGroup     = [];

    constructor ( private  themeService : ThemeService,
                  public router : Router,
                  private location : Location ) {
    }

    public ngAfterContentInit () : any {
        this.activeComponentId = this.location.path().split( '/' )[ 2 ];
        if ( this.activeComponentId ) {
            this.activeAccordion = this.activeComponentId.toLowerCase().indexOf( 'block' ) > -1 ? 1 : 0;
        }
        return undefined;
    }

    public openCloseDropdown ( i, length ) {
        return this.activeAccordion === i || length === 1 ? 'expanded' : 'collapsed';
    }

    public navigate ( to : any ) {
        this.router.navigate( to );
        if ( to[ 1 ] ) {
            this.activeComponentId = to[ 1 ].id;
        } else {
            this.activeComponentId = this.activeAccordion = this.INDEX_ID;
        }
    }

    public toggleAccordion ( index ) {
        this.activeAccordion = this.activeAccordion === index ? this.INDEX_ID : index;
    }

    public changeTheme ( theme : Theme ) {
        this.themeService.theme = theme;
    }

    public doFilter ( items, query ) : Observable<any> {
        return isPresent( query ) ? items.filter(
                ( item ) => {
                    return item[ 'name' ] && item[ 'name' ].toLowerCase().indexOf( query.toLowerCase() ) !== -1;
                }
            ) : items;
    }

    public doFilterGroups ( items, query ) : Observable<any> {
        return this.filteredGroup = isPresent( query ) ? items.filter(
                ( item ) => {
                    let filtered = item.components.filter( ( component ) => {
                        return component[ 'name' ] && component[ 'name' ].toLowerCase().indexOf( query.toLowerCase() ) !== -1;
                    } );
                    return filtered && filtered.length > 0 ? filtered : false;
                }
            ) : items;
    }

}
export interface Theme {
    name : string;
    color : string;
    attr : string;
}
