import { FormUtils } from '../util/form-utils';
export class RequiredValidator {
    public static requiredValidation ( isRequired ) {
        return ( c ) => {
            if ( isRequired ) {
                if ( ! c.value || c.value.length === 0 ) {
                    return {
                        required : {
                            text : c._ampErrors.required ? c._ampErrors.required : 'This field is required'
                        }
                    };
                }
            }
            return null;
        };
    }
}
export class MaxLengthValidator {
    public static maxLengthValidation ( valMaxLength ) {
        return ( c ) => {
            if ( valMaxLength ) {
                if ( ! c.value || c.value.length <= valMaxLength ) {
                    return null;
                }
                return {
                    maxLength : {
                        text : c._ampErrors.maxLength ? c._ampErrors.maxLength : 'This field should not be more than' +
                        ' ' + valMaxLength + ' characters.'
                    }
                };
            }
            return null;
        };
    }
}
export class MinLengthValidator {
    public static minLengthValidation ( valMinLength ) {
        return ( c ) => {
            if ( valMinLength ) {
                if ( ! c.value || c.value.length >= valMinLength ) {
                    return null;
                }
                return {
                    minLength : {
                        text : c._ampErrors.minLength ? c._ampErrors.minLength : 'This field should  be more than ' + valMinLength + ' characters.'
                    }
                };
            }
            return null;
        };
    }
}
export class PatterValidator {
    public static patternValidator ( pattern ) {
        return ( c ) => {
            if ( pattern ) {
                if ( ! c.value || new RegExp( pattern ).test( c.value ) ) {
                    return null;
                }
                return {
                    mdPattern : {
                        text : c._ampErrors.pattern ? c._ampErrors.pattern : 'This field is not valid.'
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
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || ! diff || diff <= pattern ) {
                    return null;
                }
                return {
                    maxDate : {
                        text : c._ampErrors.maxDate ? c._ampErrors.maxDate : 'This date should not be greater' +
                        ' than ' + pattern + ' .'
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
                        text : c._ampErrors.invalidDate ? c._ampErrors.invalidDate : 'This date is not valid.'
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
                if ( ! c.value || ! new RegExp( datePattern ).test( c.value ) || diff === null || diff === undefined || diff >= pattern ) {
                    return null;
                }
                return {
                    minDate : {
                        text : c._ampErrors.minDate ? c._ampErrors.minDate : 'This date should be greater' +
                        ' than ' + pattern + ' .'
                    }
                };
            }
            return null;
        };
    }
}
export class MaxFloatValidator {
    public static maxFloatValidator ( valMaxFloat ) {
        return ( c ) => {
            if ( valMaxFloat ) {
                if ( ! c.value || c.value.length > 0 ) {
                    if ( c.value ) {
                        let newVal       = c.value;
                        let replaceValue = newVal.replace( /[^0-9\.]+/g , '' );
                        if ( replaceValue > valMaxFloat ) {
                            return {
                                maxFloat : {
                                    text : c._ampErrors.maxFloat ? c._ampErrors.maxFloat : 'This amount should be more' +
                                    ' than ' + valMaxFloat + ' .'
                                }
                            }
                        }
                    }
                }
            }
            return null;
        };
    }
}

