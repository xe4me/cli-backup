import { Component } from '@angular/core';

@Component( {
    selector    : 'amp-tabs-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' )]
} )

export default class AMPTabsComponentBasicUsage {

    private tabs = [
        {
            title: 'Cat',
            content: '<p>Cats are awesome!</p>',
         // active: true
        },
        {
            title: 'Dog',
            content: '<p>Dogs are terrible..</p>'
        },
        {
            title: 'Hamster',
            content: '<p>Tiny little furball</p>'
        }
    ];
}
