import { Component , ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { PdfService } from '../../../app/services/pdf/pdf.service';
@Component(
    {
        selector    : 'amp-pdf-basic-usage' ,
        templateUrl : 'src/styleguide/components/amp-pdf/basic_usage.html' ,
        styles      : [ require( './basic_usage.scss' ).toString() ]
    } )
export default class AmpPdfServiceBasicUsage {
    constructor ( private pdfService : PdfService , private  themeService : ThemeService ,
                  private _cd : ChangeDetectorRef ) {
    }

    generatePdf () {
        this.pdfService.download( '1576825577' );
    }
}
