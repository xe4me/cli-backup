import { Component,
         OnInit,
         ChangeDetectorRef,
         Input,
         ViewChild } from '@angular/core';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { Http,
         Response } from '@angular/http';
import { AmpButton } from '../../components/amp-button/amp-button.component';
import { AmpLinearProgressBarComponent } from '../../components/amp-linear-progress-bar/amp-linear-progress-bar.component';

@Component({
    selector    : 'amp-file-upload',
    template    : require('./amp-file-upload.component.html'),
    styles      : [ require( './amp-file-upload.component.scss' ).toString() ] ,
    directives  : [ UPLOAD_DIRECTIVES, AmpButton, AmpLinearProgressBarComponent ]
})
export class AmpFileUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    @Input() uploadUrl : string;
    @Input() tokenUrl : string;
    @Input() formName : string;
    @Input() formId : string;
    @Input() enableVirusScan : string;

    public token : string;
    private basicOptions : Object;
    private progress : number = 0;
    private fileName : string;
    private fileSize : string;
    private speed : string;
    private uploaded : string;
    private showProgress : boolean = false;
    private backendError : boolean = false;
    private error : boolean = false;
    private uploadUrlWithToken : string = '';
    private sizes : string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    constructor ( protected _cd : ChangeDetectorRef,
                  private http : Http ) {
    }

    ngOnInit() {
        this.basicOptions = {
            calculateSpeed: true
        };
    }

    private displayProgress ( ) : void {
        this.error = this.backendError;
        this.showProgress = !this.error;
    }

    private showProgressBar ( ) : boolean {
        return this.progress < 1 ? true : false;
    }

    private handleUpload ( response : any ) : void {
        this._cd.detectChanges();
        this.fileName = response.originalName;
        this.fileSize = this.humanizeBytes( response.size);
        this.speed = response.speedAverageHumanized ? response.speedAverageHumanized : response.progress.speedHumanized;
        this.uploaded = this.humanizeBytes(((response.size * response.progress.percent) / 100));
        this.progress = response.progress.percent / 100;
    }

    private humanizeBytes ( bytes : number ) : string {
        if ( bytes === 0 ) {
            return '0 Byte';
        }
        let base = 1024;
        let exponent : number = Math.floor( Math.log( bytes ) / Math.log( base ) );
        return parseFloat( ( bytes / Math.pow( base, exponent ) ).toFixed( 2 ) ) + ' ' + this.sizes[exponent];
    }

    private updateToken () : void {
        this.fileInput.nativeElement.value = null;
        this.error = false;
        this.http.get( this.tokenUrl )
            .map( ( res : Response ) => res.json() )
            .subscribe(
                ( res : any ) => {
                    this.token = res.payload.token;
                    this.uploadUrl += `?formName= ${ this.formName } &objectId=  ${this.formId} &enableVirusScan=
                                        ${this.enableVirusScan}`;
                    this.uploadUrlWithToken = this.uploadUrl + '&token=' + this.token;
                    this.basicOptions = {
                        url: this.uploadUrlWithToken
                    };
                    this.backendError = false;
                },
                ( error ) => {
                    this.backendError = true;
                }
            );
    }
}
