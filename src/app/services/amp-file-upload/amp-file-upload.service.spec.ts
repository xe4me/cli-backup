import { AmpFileUploadService } from './amp-file-upload.service';

describe( 'Amp File Upload service' , ( ) => {
    let _fileUploadService;
    beforeEach( ( ) => {
        _fileUploadService = new AmpFileUploadService( null , null );
    } );

    it( 'Should return a valid token url' , ( ) => {
        expect( _fileUploadService.tokenUrl ).toContain( '/upload/token' );
        } );

    it( 'Should return a valid upload url' , ( ) => {
            expect( _fileUploadService.uploadUrl ).toContain( '/upload/upload' );
        } ) ;

} );
