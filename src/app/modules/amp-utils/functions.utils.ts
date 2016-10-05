export function isPresent ( _thing ) {
    return _thing && _thing !== null;
}
export function isTrue ( value ) {
    return isPresent( value ) && (value === true || value === 'true' || false);
}
export function arrayJoinByDash ( _array ) {
    return _array.join( '-' );
}
export function getIn ( _fdn : (number|string)[] , _state : any ) : any {
    for ( let i = 0 ; i < (_fdn.length - 1) ; i ++ ) {
        _state = _state[ _fdn[ i ] ];
    }
    return _state;
}
export function clone ( _obj : any ) : any {
    return JSON.parse( JSON.stringify( _obj ) );
}

export function stringTemplate ( _string : string , _data : any = {} ) {
    return _string.replace(/\{([0-9a-zA-Z_]+)\}/g, (match, key) => {
        return _data.hasOwnProperty(key) ? _data[key] : match;
    });
}
