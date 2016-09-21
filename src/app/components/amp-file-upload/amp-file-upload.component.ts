import {Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { AmpButton } from '../../components/amp-button/amp-button.component';
import { AmpLinearProgressBarComponent } from '../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    directives  : [ UPLOAD_DIRECTIVES, AmpButton, AmpLinearProgressBarComponent ]
})
export class AmpFileUploadComponent implements OnInit {

    @Input() uploadUrl : string;
    @Input() tokenUrl : string;

    public token : string;
    private basicOptions : Object;
    private progress : number = 0;
    private fileName : string;
    private fileSize : string;
    private speed : string;
    private uploaded : string;
    private showProgress : boolean = false;
    private uploadUrlWithToken : string = '';

    constructor ( protected _cd : ChangeDetectorRef ) {}

    ngOnInit() {
        this.updateToken();
    }

    private displayProgress() : void {
        this.showProgress = true;
        this.updateToken();
    }

    private showProgressBar() : boolean {
        return this.progress < 1 ? true : false;
    }

    private handleUpload(response: any): void {
        this._cd.detectChanges();
        this.fileName = response.originalName;
        this.fileSize = this.humanizeBytes( response.size);
        this.speed = response.speedAverageHumanized ? response.speedAverageHumanized : response.progress.speedHumanized;
        this.uploaded = this.humanizeBytes(((response.size * response.progress.percent) / 100));
        this.progress = response.progress.percent / 100;
    }

    private humanizeBytes(bytes : number) : string {
        if (bytes === 0) {
            return '0 Byte';
        }
        let k = 1024;
        const sizes : string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let i : number = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private updateToken () : void {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( 'GET', this.tokenUrl, false );
        xmlHttp.send( null );
        this.token = JSON.parse(xmlHttp.responseText).payload.token;
        this.uploadUrlWithToken = this.uploadUrl + this.token;
        this.basicOptions = {
            url: this.uploadUrlWithToken,
            calculateSpeed: true
        };
    }
}
