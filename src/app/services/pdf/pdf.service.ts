import { Injectable } from '@angular/core';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { RequestOptions, Headers } from '@angular/http';
import { DeviceService } from '../device/device.service';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PdfService {
    public static BASE_URL = Environments.property.ApiCallsBaseUrl;
    public static EXPERIENCE_NAME = Environments.property.experienceName;
    public static PDF_URL = PdfService.BASE_URL + PdfService.EXPERIENCE_NAME + '/pdf';
    private id = null;
    private error = null;
    private headers = new Headers( {
        'Content-Type' : 'application/json',
        'caller' : 'components-pdf-service'
    } );
    private fileName = 'MyLife';

    constructor( private http : AmpHttpService ) {
    }

    public download( id, format = 'base64', fileName = 'MyLife' ) {
        this.fileName = fileName;
        this._download( id, format )
            .subscribe( ( data ) => {
                // Technical challenge: PDF reside in a APIGW protected URL that requires header "apiKey Bearer blahblah"
                // Data URI will work for most browsers http://caniuse.com/#feat=datauri, except for the dreaded IE11
                if ( DeviceService.isIE() ) {
                    window.navigator.msSaveBlob( this.b64toBlob( data.payload, 'application/pdf' ), this.getFilename() );
                } else if ( DeviceService.isFirefox() ) {
                    window.open( this.wrapInDataURI( data.payload ), '_blank' );
                } else {
                    let link : any = document.createElement( 'a' );
                    link.download = this.getFilename();
                    link.target = '_blank';
                    link.href = this.wrapInDataURI( data.payload );
                    link.click();
                }
            } );
    }

    protected _download( id, format ) {
        let headers : Headers = this.headers;
        let options = new RequestOptions( { body : '', headers : headers } );
        const pdfUrl : string = PdfService.PDF_URL + '?id=' + id + '&format=' + format;
        return this.http
            .get( pdfUrl, headers )
            .map( ( res ) => res.json() );
    }

    private getFilename() : string {
        let d = new Date();
        let date = [
            d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
            d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
            d.getFullYear()
        ];
        return this.fileName + date.join( '' ) + '.pdf';
    }

    private b64toBlob( b64Data, contentType ) {
        contentType = contentType || '';
        let sliceSize = 512;
        b64Data = b64Data.replace( /^[^,]+,/, '' );
        b64Data = b64Data.replace( /\s/g, '' );
        let byteCharacters = window.atob( b64Data );
        let byteArrays = [];
        for ( let offset = 0; offset < byteCharacters.length; offset += sliceSize ) {
            let slice = byteCharacters.slice( offset, offset + sliceSize );
            let byteNumbers = new Array( slice.length );
            for ( let i = 0; i < slice.length; i++ ) {
                byteNumbers[ i ] = slice.charCodeAt( i );
            }
            let byteArray = new Uint8Array( byteNumbers );
            byteArrays.push( byteArray );
        }
        let blob = new Blob( byteArrays, { type : contentType } );
        return blob;
    }

    private wrapInDataURI( base64Data ) : string {
        return 'data:application/pdf;base64,' + base64Data;
    }
}
