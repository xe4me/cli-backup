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
                    if ( (! c.value || c.value.length === 0) && (c.value !== 0) ) {
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
                if ( ! c.value || ( c.value.length || c.value.toString().length ) <= maxLength ) {
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
                    if ( ( c.value.length || c.value.toString().length ) < minLength ) {
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
                if ( ! c.value || new RegExp( pattern , 'ig' ).test( c.value ) ) {
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
    public static minDateValidator ( pattern , datePattern ) {
        return ( c ) => {
            if ( pattern !== undefined ) {
                let diff = FormUtils.getAgeDays( c.value );
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || diff === null || diff === undefined || diff >= pattern || ! FormUtils.isValidDate( c.value ) ) {
                    return null;
                }
                return {
                    minDate : {
                        text : c._ampErrors && c._ampErrors.minDate ? c._ampErrors.minDate : 'This date should be' +
                        ' later than ' + moment().add((pattern - 1), 'days').format('DD/MM/YYYY') + '.'
                    }
                };
            }
            return null;
        };
    }
}
export class MaxDateValidator {
    public static maxDateValidator ( pattern , datePattern ) {
        return ( c ) => {
            if ( pattern !== undefined ) {
                let diff = FormUtils.getAgeDays( c.value );
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || ! diff || diff <= pattern || ! FormUtils.isValidDate( c.value )  ) {
                    return null;
                }
                return {
                    maxDate : {
                        text : c._ampErrors && c._ampErrors.maxDate ? c._ampErrors.maxDate : 'This date should not be' +
                        ' later than ' + moment().add(pattern, 'days').format('DD/MM/YYYY') + '.'
                    }
                };
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
                                    text : c._ampErrors && c._ampErrors.maxFloat ? c._ampErrors.maxFloat : 'This' +
                                    ' amount' +
                                    ' should be more' +
                                    ' than ' + maxFloat + ' .'
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
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || age === null || age === undefined || age > minAge || ! FormUtils.isValidDate( c.value )  ) {
                    return null;
                }
                return {
                    minAge : {
                        text : c._ampErrors && c._ampErrors.minAge ? c._ampErrors.minAge : 'You must be older than than ' +
                        minAge + ' years old.'
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
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || age === null || age === undefined || age < maxAge || ! FormUtils.isValidDate( c.value )  ) {
                    return null;
                }
                return {
                    maxAge : {
                        text : c._ampErrors && c._ampErrors.maxAge ? c._ampErrors.maxAge : 'You must be younger than than ' +
                        maxAge + ' years old.'
                    }
                };
            }
            return null;
        };
    }
}
