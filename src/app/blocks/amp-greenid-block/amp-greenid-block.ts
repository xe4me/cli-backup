import {
    Component ,
    trigger ,
    state ,
    style ,
    animate ,
    transition,
    OnInit
} from '@angular/core';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import arrayIsEqualTo = ts.arrayIsEqualTo;
@Component( {
    selector   : 'amp-greenid-block' ,
    host       : {
        '[@slideUp]' : 'slideUp'
    } ,
    providers: [AmpGreenIdServices],
    template   : `
                <div class='grid__container 1/1 palm-1/1'>
                    <div class='grid__item_floated utils__align&#45;&#45;left' >
                                <ng-content></ng-content>
                    </div>
                </div>
    ` ,
    styles     : [ require( './amp-greenid-block.component.scss' ).toString() ] ,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( { height : '0px' , opacity : '0' , display : 'none' } ) ) ,
                state( 'expanded' , style( { height : '*' , opacity : '1' , display : 'block' } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )
export class AmpGreenidBlockComponent {
    private loadAPI : Promise<any>;
    private scriptUrls : string[] =['//test2.edentiti.com/df/javascripts/greenidConfig.js','//test2.edentiti.com/df/javascripts/greenidui.min.js'];

    constructor ( private _AmpGreenIdServices : AmpGreenIdServices ) {

    }

    ngOnInit() : any {
        if (this.scriptUrls) {
            for (var stringUrl of this.scriptUrls) {
                this.loadAllScripts(stringUrl);
            }
        }
    }

    private loadAllScripts (stringUrl : string) {
        this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise...');
            this.loadScript(stringUrl);
        });
    }

    private loadScript(urlString : string) {
        console.log('preparing to load...', urlString);
        let node = document.createElement('script');
        node.src = urlString;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }


}
