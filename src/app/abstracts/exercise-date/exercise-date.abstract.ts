export abstract class ExerciseDateAbstract {
    public static exerciseDateRadios = {
        buttons : {
            DEA_AMPFP : {
                at_least_fifteen : [
                    {
                        id : 'six_months',
                        value : 'six_months',
                        label : 'At least six months from today’s date.',
                        text : 'The practice has been with AMP Financial Planning for at least 15 years. The requested exercise date is at least six months from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                at_least_four_years_but_fewer_than_15_years : [
                    {
                        id : 'twelve_months',
                        value : 'twelve_months',
                        label : 'At least 12 months from today’s date.',
                        text : 'The practice has been with AMP Financial Planning for less than 15 years. The' +
                        ' requested exercise date is at least 12 months from today\'s date.'
                    },
                    {
                        id : 'six_months',
                        value : 'six_months',
                        label : 'At least six months from today’s date and I am willing to receive a discounted' +
                        ' Buyer of last resort payment.',
                        text : 'The practice has been with AMP Financial Planning for less than 15 years. The' +
                        ' requested exercise date is at least six months from today\'s date and the practice principal is willing to receive a discounted Buyer of last resort payment.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                fewer_than_four_years : [
                    {
                        id : 'ninety_days',
                        value : 'ninety_days',
                        label : 'At least 90 days from today’s date. Buyer of last resort will only apply to' +
                        ' policies held by clients who were named on the practice start-up offer (PSO) Register.',
                        text : 'The practice has been with AMP Financial Planning for less than four years and the' +
                        ' requested Buyer of last resort payment will only be calculated on the policies held by clients who were named on the practice start-up offer (PSO) Register. The requested exercise date is at least 90 days from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ]
            },
            DEA_ASSURED : {
                at_least_fifteen : [
                    {
                        id : 'six_months',
                        value : 'six_months',
                        label : 'At least six months from today’s date.',
                        text : 'The practice has been with AMP Financial Planning for at least 15 years. The requested exercise date is at least six months from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                at_least_four_years_but_fewer_than_15_years : [
                    {
                        id : 'twelve_months',
                        value : 'twelve_months',
                        label : 'At least 12 months from today’s date.',
                        text : 'The practice has been with AMP Financial Planning for less than 15 years. The' +
                        ' requested exercise date is at least 12 months from today\'s date.'
                    },
                    {
                        id : 'six_months',
                        value : 'six_months',
                        label : 'At least six months from today’s date and I am willing to receive a discounted' +
                        ' Buyer of last resort payment.',
                        text : 'The practice has been with AMP Financial Planning for less than 15 years. The' +
                        ' requested exercise date is at least six months from today\'s date and the practice principal is willing to receive a discounted Buyer of last resort payment.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                fewer_than_four_years : [
                    {
                        id : 'ninety_days',
                        value : 'ninety_days',
                        label : 'At least 90 days from today’s date. Buyer of last resort will only apply to' +
                        ' policies held by clients who were named on the practice start-up offer (PSO) Register.',
                        text : 'The practice has been with AMP Financial Planning for less than four years and the' +
                        ' requested Buyer of last resort payment will only be calculated on the policies held by clients who were named on the practice start-up offer (PSO) Register. The requested exercise date is at least 90 days from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ]
            },
            DEA_HILLROSS : {
                at_least_five_years : [
                    {
                        id : 'eighteen_month',
                        value : 'eighteen_month',
                        label : 'At least 18 months from today’s date.',
                        text : 'The practice has been with Hillross for at least five years. The requested exercise' +
                        ' date is at least 18 months from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                fewer_than_five_years : [
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ]
            },
            DEA_CHARTER : {
                at_least_five_years : [
                    {
                        id : 'six_months',
                        value : 'six_months',
                        label : 'At least six months from today’s date.',
                        text : 'The practice has been with Charter for at least five years. The requested exercise' +
                        ' date is at least six months from today\'s date.'
                    },
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ],
                fewer_than_five_years : [
                    {
                        id : 'later_than',
                        value : 'later_than',
                        label : 'Subject to exceptional circumstances.',
                        text : 'Exceptional circumstances'
                    }
                ]
            }
        },
        groupName : 'exerciseDate',
        textFieldName : 'exceptionalCircumstances',
        getButtons : ( licensee ) => {
            return ExerciseDateAbstract.exerciseDateRadios.buttons[ licensee ] || {};
        },
        getButtonOptions : ( licensee, optionGroupName ) => {
            return ExerciseDateAbstract.exerciseDateRadios.getButtons( licensee )[ optionGroupName ] || [];
        }
    };

    public static getOptionsByLicensee ( licensee : string, optionGroupName ) {
        return this.exerciseDateRadios.getButtonOptions( licensee, optionGroupName );
    }

    public static get groupName () {
        return this.exerciseDateRadios.groupName;
    }

    public static get textFieldName () {
        return this.exerciseDateRadios.textFieldName;
    }

    public static  getLabel ( value, options ) {
        for ( const option of options ) {
            if ( option.value === value ) {
                return option.label;
            }
        }
        return '';
    }

    public static  getText ( value, options ) {
        for ( const option of options ) {
            if ( option.value === value ) {
                return option.text;
            }
        }
        return '';
    }
}
