import { ControlGroup } from '@angular/common';
import * as moment from 'moment';
export class FormUtils {
    public static getControlByName ( _parentGroup : ControlGroup , _controlName : string ) : any {
        return _parentGroup.controls[ _controlName ];
    }

    public static getSelectorNameOfClassName ( className ) {
        let split = this.splitStringByCapital( className );
        split.pop();
        return split.join( '-' ).toLowerCase();
    }

    public static splitStringByCapital ( str : string ) {
        return str.split( /(?=[A-Z])/ );
    }

    public static stringToDate ( _date , _format , _delimiter ) {
        if ( _date === null ) {
            return null;
        }
        let formatLowerCase = _format.toLowerCase();
        let formatItems     = formatLowerCase.split( _delimiter );
        let dateItems       = _date.split( _delimiter );
        if ( dateItems.length < 3 ) {
            return null;
        }
        for ( let i = 0 ; i < dateItems.length ; i ++ ) {
            if ( isNaN( dateItems[ i ] ) ) {
                return null;
            }
        }
        let monthIndex = formatItems.indexOf( 'mm' );
        let dayIndex   = formatItems.indexOf( 'dd' );
        let yearIndex  = formatItems.indexOf( 'yyyy' );
        let month      = parseInt( dateItems[ monthIndex ], 10 ) - 1;
        return new Date( dateItems[ yearIndex ] , month , dateItems[ dayIndex ] );
    };

    public static getDatesDiff ( fromDate , toDate ) {
        let date1    = this.stringToDate( fromDate , 'dd/MM/yyyy' , '/' );
        let date2    = this.stringToDate( toDate , 'dd/MM/yyyy' , '/' );
        let timeDiff = Math.abs( date2.getTime() - date1.getTime() );
        return Math.ceil( timeDiff / (1000 * 3600 * 24) );
    };

    public static getAge ( birthday ) {
        const birthdayDate = moment( birthday , 'DD/MM/YYYY' );
        const age = moment().diff( birthdayDate , 'years' );
        return age;
    }

    public static getAgeDays ( _todate ) {
        let date1 = new Date();
        let date2 = this.stringToDate( _todate , 'dd/MM/yyyy' , '/' );
        if ( ! date2 ) {
            return null;
        }
        let timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil( timeDiff / (1000 * 3600 * 24) );
    }

    public static isValidDate ( _date : string ) {
        return moment( _date , 'DD/MM/YYYY' ).isValid();
    }
}