import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component( {
    selector    : 'amp-tabs-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' )]
} )

export default class AMPTabsComponentBasicUsage {
    controlGroup1 : FormGroup = new FormGroup( {} );
    controlGroup2 : FormGroup = new FormGroup( {} );
    controlGroup3 : FormGroup = new FormGroup( {} );
    controlGroup4 : FormGroup = new FormGroup( {} );
    controlGroup5 : FormGroup = new FormGroup( {} );

    private disabled = false;
    private disabled2 = false;
    private required = true;
    private title1 = 'Car';
    private id1 = 'car1';

    private tabs = [
        {
            id: 'Cat',
            title: 'Cat',
            content: '<p>Cats are awesome!</p>'
        },
        {
            id: 'Dog',
            title: 'Dog',
            content: '<p>Dogs are terrible..</p>'
        },
        {
            id: 'Hamster',
            title: 'Hamster',
            content: '<p>Tiny little furball</p>'
        }
    ];

    private tabs2 = [
        {
            id: 'Cat2',
            title: 'Cat',
            content: '<p>Cats are awesome!</p>'
        },
        {
            id: 'Dog2',
            title: 'Dog',
            content: '<p>Dogs are terrible..</p>',
            active: true
        },
        {
            id: 'Hamster2',
            title: 'Hamster',
            content: '<p>Tiny little furball</p>'
        }
    ];

    private tabs3 = [
        {
            id: 'Cat3',
            title: 'Cat3',
            content: '<p>Cats are awesome!</p>'
        },
        {
            id: 'Dog3',
            title: 'Dog3',
            content: '<p>Dogs are terrible..</p>',
            active: true
        },
        {
            id: 'Hamster3',
            title: 'Hamster3',
            content: '<p>Tiny little furball</p>'
        }
    ];

    private toggleDisable() {
        this.disabled = !this.disabled;
    }

    private toggleDisable2() {
        this.disabled2 = !this.disabled2;
    }
}
