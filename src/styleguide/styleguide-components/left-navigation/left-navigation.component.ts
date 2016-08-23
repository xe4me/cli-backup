import {
    Component ,
    animate ,
    state ,
    style ,
    transition ,
    trigger
} from '@angular/core';
import { Location } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Router } from '@angular/router-deprecated';
import { AfterContentInit } from "../../../../../experience-nio/node_modules/@angular/core/src/metadata/lifecycle_hooks";
@Component( {
    selector   : 'left-navigation' ,
    template   : `
    <div class='left-navigation'>
            <div class="option-group" (click)="navigate(['Index']);toggleAccordion(-1)" [class.option-group--active]='activeAccordion===INDEX_ID'>
                <span class="icon icon--faqs "></span> Get started
            </div>
            <div @openClose='activeAccordion===INDEX_ID?"expanded":"collapsed"' class="options">
                <div class="option" *ngFor="let content of contentTable" 
                     (click)="scrollService.scrollToComponentSelector(content.link)" 
                     [class.option--active]='activeComponentId===content.link'>
                    {{ content.title }}
                </div>
            </div>
        <div *ngFor="let cpmGroup of componentsGrouped ; let i =index">
                <div class="option-group" (click)="toggleAccordion(i)" [class.option-group--active]='activeAccordion===i'>
                    <span [ngClass]="{'icon--chevron-down':activeAccordion===i,'icon--chevron-right':activeAccordion!==i}" class="icon "></span>{{ cpmGroup.type }}
                </div>
                <div @openClose='activeAccordion===i?"expanded":"collapsed"' class="options">
                    <div class="option" *ngFor="let cmp of cpmGroup.components" 
                         (click)="navigate(['Component', {id: cmp.id}])" 
                         [class.option--active]='activeComponentId===cmp.id'>
                        {{ cmp.name }}
                    </div>
                </div>
        </div>
    </div>
` ,
    inputs     : [ 'components' , 'componentsGrouped' , 'contentTable' ] ,
    styles     : [ require( './left-navigation.component.scss' ).toString() ] ,
    animations : [
        trigger(
            'openClose' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , overflow : 'hidden' , display : 'block' } ) ) ,
                transition( 'collapsed <=> expanded' , [ animate( '250ms linear' ) ] )
            ] )
    ]
} )
export class LeftNavigationComponent implements AfterContentInit {
    private activeComponentId = null;
    private INDEX_ID          = - 1;
    private activeAccordion   = this.INDEX_ID;

    ngAfterContentInit () : any {
        this.activeComponentId = this.location.path().split( '/' )[ 2 ];
        if ( this.activeComponentId ) {
            this.activeAccordion = this.activeComponentId.toLowerCase().indexOf( 'block' ) > - 1 ? 1 : 0;
            console.log( 'this.activeComponentId' , this.activeComponentId );
        }
        return undefined;
    }

    constructor ( public router : Router , private location : Location ,private scrollService : ScrollService ) {
    }

    navigate ( to : any ) {
        this.router.navigate( to );
        if ( to[ 1 ] ) {
            this.activeComponentId = to[ 1 ].id;
        } else {
            this.activeComponentId = this.activeAccordion = this.INDEX_ID;
        }
    }

    private toggleAccordion ( index ) {
        this.activeAccordion = this.activeAccordion === index ? this.INDEX_ID : index;
    }
}