export function isPresent ( _thing ) {
    return _thing && _thing !== null;
}
export function isTrue ( value ) {
    return isPresent( value ) && (value === true || value === 'true' || false);
}
export function arrayJoinByDash ( _array ) {
    return _array.join( '-' );
}