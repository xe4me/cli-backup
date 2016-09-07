import { FormUtils } from '../util/form-utils';
export class RequiredValidator {
    public static requiredValidation ( isRequired ) {
        return ( c ) => {
            if ( isRequired ) {
                if ( ! c.value || c.value.length === 0 ) {
                    return {
                        required : true
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
                    mdMaxLength : true
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
                    mdMinLength : true
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
                    mdPattern : true
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
                    mdMaxDate : true
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
                    mdInvalidDate : true
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
                    mdMinDate : true
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
                        let replaceValue = newVal.replace( /[^0-9\.]+/g , "" );
                        if ( replaceValue > valMaxFloat ) {
                            return {
                                mdMaxFloat : true
                            };
                        }
                    }
                }
            }
            return null;
        };
    }
}
