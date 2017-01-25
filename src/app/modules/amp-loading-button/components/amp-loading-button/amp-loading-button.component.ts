import {
    Component,
    Input
} from '@angular/core';
import {AmpLoadingService} from '../../services/amp-loading/amp-loading.service';
import Timer = NodeJS.Timer;

@Component({
    selector: 'amp-loading-button',
    host: {
        '(click)': 'onClick()'
    },
    template: require('./amp-loading-button.component.html'),
    styles: [require('./amp-loading-button.component.scss')]
})

export class AmpLoadingButtonComponent {
    private isListening: boolean = false;
    private listeningId: Timer;
    @Input('if-url-has') ifUrlHas;
    @Input('theme') theme: string;
    @Input('class') clasz: string;
    @Input('disabled') disabled: boolean;
    @Input('data-automation-id') dataAutomationId: string;

    constructor(private loadingService: AmpLoadingService) {

    }

    onClick() {
        this.isListening = true;
        clearTimeout(this.listeningId);
        this.listeningId = setTimeout(() => {
            this.isListening = false;
        }, 1000);
        //this.loadingService.ifUrlHas = this.ifUrlHas;
    }
}
