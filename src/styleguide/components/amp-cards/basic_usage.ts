import { Component } from '@angular/core';

@Component( {
    selector    : 'amp-cards-basic-usage',
    templateUrl : './basic_usage.html',
    styles      : [ require( './basic_usage.scss' )]
} )

export default class AMPCardsComponentBasicUsage {

    private cards = [
        {
            image : '/assets/images/ready-to-apply.jpg',
            text  : 'Ready to apply',
            click : () => {
                alert( '"Ready to apply" card clicked!' );
            }
        },
        {
            image : '/assets/images/another-action.jpg',
            text  : 'Another action here',
            click : () => {
                alert( '"Another action here" card clicked!' );
            }
        }
    ];
}
