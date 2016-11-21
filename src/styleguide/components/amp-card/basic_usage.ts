import { Component } from '@angular/core';

@Component( {
    selector    : 'amp-card-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-card/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AMPCardComponentBasicUsage {

    private count = 0;

    public click () {
        console.log(`Card clicked ${++this.count} times!`);
    }

}