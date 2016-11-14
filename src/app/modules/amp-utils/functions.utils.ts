export function isPresent ( _thing ) {
    return _thing && _thing !== null;
}
export function isTrue ( value ) {
    return isPresent( value ) && (value === true || value === 'true' || false);
}
export function generateRandomString () {
    return Math.random().toString( 36 ).substr( 2 , 9 ) + (new Date()).getTime().toString( 32 );
}
export function arrayJoinByDash ( _array ) {
    return _array.join( '-' );
}
export function getIn ( _fdn : (number|string)[] , _state : any , _deep : number = 1 ) : any {
    for ( let i = 0 ; i < (_fdn.length - _deep) ; i ++ ) {
        _state = _state[ _fdn[ i ] ];
    }
    return _state;
}
export function clone ( _obj : any ) : any {
    return JSON.parse( JSON.stringify( _obj ) );
}
export function addDashOrNothing ( _thing ) : any {
    return _thing !== undefined ? ('_' + _thing) : '';
}
export function stringTemplate ( _string : string , _data : any = {} ) {
    return _string.replace( /\{([0-9a-zA-Z_]+)\}/g , ( match , key ) => {
        return _data.hasOwnProperty( key ) ? _data[ key ] : match;
    } );
}
export function humanizeBytes ( bytes : number ) : string {
    let sizes : string[] = [ 'Bytes' , 'KB' , 'MB' , 'GB' , 'TB' , 'PB' ];
    if ( bytes === 0 ) {
        return '0 Byte';
    }
    let base              = 1024;
    let exponent : number = Math.floor( Math.log( bytes ) / Math.log( base ) );
    return parseFloat( ( bytes / Math.pow( base , exponent ) ).toFixed( 2 ) ) + ' ' + sizes[ exponent ];
}
export function applyCss ( property , element , transformValue ) {
    element.style[ property ] = transformValue.trim();
}
export function getQueryParam ( paramName : string ) : string {
    let query = decodeURIComponent(window.location.search.substring(1));
    let params = query.split('&');
    let value = '';

    for (let i = 0; i < params.length; i++) {
        let pair = params[i].split('=');

        if (pair[0] === paramName) {
            value = pair[1];
            break;
        }
    }

    return value;
}
