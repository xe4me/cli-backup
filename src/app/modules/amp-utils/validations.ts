import { FormUtils } from './form-utils';
import * as moment from 'moment';
export class RequiredValidator {
    public static requiredValidation ( required , booleanValue = false , isCheckbox = false ) {
        return ( c ) => {
            if ( required ) {
                if ( isCheckbox ) {
                    return c.value === true ? null : {
                        required : {
                            text : c._ampErrors && c._ampErrors.required ? c._ampErrors.required : 'This field is' +
                            ' required'
                        }
                    };
                } else if ( booleanValue ) {
                    return typeof c.value === 'boolean' ? null : {
                        required : {
                            text : c._ampErrors && c._ampErrors.required ? c._ampErrors.required : 'This field is' +
                            ' required'
                        }
                    };
                } else {
                    if ( (! c.value || ( typeof c.value === 'string' && !c.value.trim() ) || c.value.length === 0) && (c.value !== 0) ) {
                        return {
                            required : {
                                text : c._ampErrors && c._ampErrors.required ? c._ampErrors.required : 'This field is' +
                                    ' required'
                            }
                        };
                    }
                }
            }
            return null;
        };
    }
}
export class MaxLengthValidator {
    public static maxLengthValidation ( maxLength ) {
        return ( c ) => {
            if ( maxLength ) {
                if ( ! c.value || ( c.value.length || c.value.length ) <= maxLength ) {
                    return null;
                }
                return {
                    maxLength : {
                        text : c._ampErrors && c._ampErrors.maxLength ? c._ampErrors.maxLength : 'This field should' +
                        ' not' +
                        ' be more than' +
                        ' ' + maxLength + ' characters.'
                    }
                };
            }
            return null;
        };
    }
}
export class MinLengthValidator {
    public static minLengthValidation ( minLength ) {
        return ( c ) => {
            if ( minLength ) {
                if ( ! c.value ) {
                    return null;
                } else {
                    if ( ( c.value.length || c.value.length ) < minLength ) {
                        return {
                            minLength : {
                                text : c._ampErrors && c._ampErrors.minLength ? c._ampErrors.minLength : 'This field should' +
                                '  be' +
                                ' more than ' + minLength + ' characters.'
                            }
                        };
                    }
                }
            }
            return null;
        };
    }
}
export class PatterValidator {
    public static patternValidator ( pattern ) {
        return ( c ) => {
            if ( pattern ) {
                let flags = 'ig'; // to make sure we're not breaking the existing code.
                let parsedPattern = PatterValidator.parsePattern( pattern );
                if ( ! c.value || new RegExp( parsedPattern.regex , parsedPattern.flags || flags ).test( c.value ) ) {
                    return null;
                }
                return {
                    pattern : {
                        text : c._ampErrors && c._ampErrors.pattern ? c._ampErrors.pattern : 'This field is not valid.'
                    }
                };
            }
            return null;
        };
    }

    public static parsePattern ( pattern , needle = 'FLAGS:' ) {
        // if regex is like : ^[A-Za-z][A-Z|a-z|'| |-]*[a-z]$FLAGS:i
        // we can extract i from the end of the regex and use it as flags
        // the reason is I couldn't find any way to put a ignorecase flag inside the string to be constructed with new Regex
        let lastIndexOfSlash = pattern.lastIndexOf( needle );
        let regex = pattern;
        let flags;
        let tempFlags  = pattern.substring( lastIndexOfSlash + needle.length );
        if ( lastIndexOfSlash > -1 && tempFlags && tempFlags.match(/[img]{1,3}$/) ) {
            regex = pattern.substring( 0 , lastIndexOfSlash );
            flags = tempFlags;
        }
        return {
            regex,
            flags
        };
    }
}
export class DateValidator {
    public static dateValidator ( pattern , datePattern ) {
        return ( c ) => {
            if ( pattern !== undefined ) {
                let isValidDate = FormUtils.isValidDate( c.value );
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || isValidDate ) {
                    return null;
                }
                return {
                    invalidDate : {
                        text : c._ampErrors && c._ampErrors.invalidDate ? c._ampErrors.invalidDate : 'The date should be in the format DD/MM/YYYY.'
                    }
                };
            }
            return null;
        };
    }
}
export class MinDateValidator {
    public static minDateValidator ( minDate , datePattern ) {
        return ( c ) => {
            if ( minDate !== undefined ) {
                let diff = FormUtils.getAgeDays( c.value );
                if ( ! c.value ||
                    ! new RegExp( datePattern ).test( c.value ) ||
                    diff === null ||
                    diff === undefined ||
                    diff >= minDate ||
                    ! FormUtils.isValidDate( c.value ) ) {
                    return null;
                }
                return {
                    minDate : {
                        text : c._ampErrors && c._ampErrors.minDate ? c._ampErrors.minDate : `
                            This date should be later than ${moment().add((minDate - 1), 'days').format('DD/MM/YYYY')}.
                        `
                    }
                };
            }
            return null;
        };
    }
}
export class MaxDateValidator {
    public static maxDateValidator ( maxDate , datePattern ) {
        return ( c ) => {
            if ( maxDate !== undefined ) {
                let diff = FormUtils.getAgeDays( c.value );
                if ( ! c.value ||
                    ! new RegExp( datePattern ).test( c.value ) ||
                    ! diff ||
                    diff <= maxDate ||
                    ! FormUtils.isValidDate( c.value ) ) {
                    return null;
                }
                return {
                    maxDate : {
                        text : c._ampErrors && c._ampErrors.maxDate ? c._ampErrors.maxDate : `
                            This date should not be later than ${moment().add(maxDate, 'days').format('DD/MM/YYYY')}.
                        `
                    }
                };
            }
            return null;
        };
    }
}
export class MinFloatValidator {
    public static minFloatValidator ( minFloat ) {
        return ( c ) => {
            if ( minFloat ) {
                if ( ! c.value || c.value.length > 0 ) {
                    if ( c.value ) {
                        let newVal       = c.value;
                        let replaceValue = newVal.replace( /[^0-9\.]+/g , '' );
                        if ( replaceValue < minFloat ) {
                            return {
                                minFloat : {
                                    text : c._ampErrors && c._ampErrors.minFloat ? c._ampErrors.minFloat : `
                                        This amount should be more than or equal to ${minFloat}.
                                    `
                                }
                            };
                        }
                    }
                }
            }
            return null;
        };
    }
}
export class MaxFloatValidator {
    public static maxFloatValidator ( maxFloat ) {
        return ( c ) => {
            if ( maxFloat ) {
                if ( ! c.value || c.value.length > 0 ) {
                    if ( c.value ) {
                        let newVal       = c.value;
                        let replaceValue = newVal.replace( /[^0-9\.]+/g , '' );
                        if ( replaceValue > maxFloat ) {
                            return {
                                maxFloat : {
                                    text : c._ampErrors && c._ampErrors.maxFloat ? c._ampErrors.maxFloat : `
                                        This amount should be less than or equal to ${maxFloat}.
                                    `
                                }
                            };
                        }
                    }
                }
            }
            return null;
        };
    }
}
export class MinAgeValidator {
    public static minAgeValidator ( minAge , datePattern ) {
        return ( c ) => {
            if ( minAge !== undefined ) {
                let age = FormUtils.getAge( c.value );
                if ( ! c.value ||
                    ! new RegExp( datePattern ).test( c.value ) ||
                    age === null ||
                    age === undefined ||
                    age > minAge ||
                    ! FormUtils.isValidDate( c.value ) ) {
                    return null;
                }
                return {
                    minAge : {
                        text : c._ampErrors && c._ampErrors.minAge ? c._ampErrors.minAge : `
                            You must be older than ${minAge} years old.
                        `
                    }
                };
            }
            return null;
        };
    }
}
export class MaxAgeValidator {
    public static maxAgeValidator ( maxAge , datePattern ) {
        return ( c ) => {
            if ( maxAge !== undefined ) {
                let age = FormUtils.getAge( c.value );
                if ( ! c.value ||
                    ! new RegExp( datePattern ).test( c.value ) ||
                    age === null ||
                    age === undefined ||
                    age < maxAge ||
                    ! FormUtils.isValidDate( c.value ) ) {
                    return null;
                }
                return {
                    maxAge : {
                        text : c._ampErrors && c._ampErrors.maxAge ? c._ampErrors.maxAge : `
                            You must be younger than ${maxAge} years old.
                        `
                    }
                };
            }
            return null;
        };
    }
}
