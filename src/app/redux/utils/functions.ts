export function getIn ( _fdn : string[] , _state : any ) : any {
    for ( let i = 0 ; i < (_fdn.length - 1) ; i ++ ) {
        _state = _state[ _fdn[ i ] ];
    }
    return _state;
}
export function clone ( _obj : any ) : any {
    return JSON.parse( JSON.stringify( _obj ) );
}