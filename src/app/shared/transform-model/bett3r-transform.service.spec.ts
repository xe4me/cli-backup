//tslint:disable
import { Bett3rTransformService } from './bett3r-transform.service';
describe( 'Transform service ', () => {
    let service = new Bett3rTransformService();
    it( 'should transform DropDowns', () => {

        let oldModel    = {
            'Application' : {
                'Welcome'               : {},
                'NewOrExistingCustomer' : {
                    'NewOrExistingCustomer' : 'NewCustomer'
                },
                'SingleOrJoint'         : {
                    'SingleOrJoint' : 'JointApplicant'
                },
                'Applicant1Section'     : {
                    'PersonalDetailsSection' : {
                        'BasicInfo'      : {
                            'TitleDropdown' : {
                                'SelectedItem' : 'Mr',
                                'Query'        : 'Mr'
                            },
                            'FirstName'     : 'test',
                            'MiddleName'    : 'test',
                            'LastName'      : 'test',
                            'DateOfBirth'   : '10/10/1987'
                        },
                        'Address'        : {
                            'Address' : {
                                'residentialAddress'          : {
                                    'isManualSearch' : false,
                                    'search'         : {
                                        'selectedItem' : 'askjdg',
                                        'query'        : '79-81 Merrivale Drive, WARRNAMBOOL  VIC  3280'
                                    },
                                    'manualAddress'  : {
                                        'buildingName'       : '',
                                        'unitNumber'         : '',
                                        'streetNumber'       : '79-81',
                                        'streetName'         : 'Merrivale',
                                        'streetTypeDropdown' : {
                                            'SelectedItem' : 'DR',
                                            'Query'        : 'Drive'
                                        },
                                        'poBox'              : null,
                                        'suburb'             : 'WARRNAMBOOL',
                                        'postCode'           : '3280',
                                        'stateDropdown'      : {
                                            'SelectedItem' : 'VIC',
                                            'Query'        : 'VIC'
                                        }
                                    },
                                    'isItPoBox'      : false
                                },
                                'postalAndResidentialAreSame' : true
                            }
                        },
                        'ContactDetails' : {
                            'EmailAddress' : 'test@test.com',
                            'MobileNumber' : '0402095299',
                            'HomeNumber'   : null
                        },
                        'NotARobot'      : {
                            'amp-google-recaptcha-check' : {
                                'verificationStatus' : 'verified',
                                'verificationToken'  : 'sdljhfkjsdh'
                            }
                        },
                        'BetterChoice'   : {}
                    },
                    'IdentitySection'        : {
                        'OnlineOrOfflineIdCheck' : {
                            'OnlineIDCheck' : 'online'
                        },
                        'IdCheck'                : {
                            'greenIdIdentityCheck' : {
                                'verificationId'     : 'RpGfkNMB',
                                'verificationStatus' : null
                            }
                        }
                    },
                    'FinalQuestionsSection'  : {
                        'TaxFileNumber'   : {
                            'HasTaxFileNumber' : true,
                            'TaxFileNumber'    : '000000000'
                        },
                        'SourceOfFunding' : {
                            'PrimarySourceOfWealthDropdown'   : {
                                'SelectedItem' : 'WII',
                                'Query'        : 'Investment income (e.g. rent, dividends, pension)'
                            },
                            'SourceOfFundsForAccountDropdown' : {
                                'SelectedItem' : 'FGB',
                                'Query'        : 'Government benefits (e.g. childcare rebate, family tax benefit)'
                            },
                            'ReasonForOpeningAccountDropdown' : {
                                'SelectedItem' : 'BI',
                                'Query'        : 'Business income (e.g. regular deposits and withdrawals for expenses (mostly for non-individuals))'
                            }
                        },
                        'Residency'       : {
                            'CountryOfCitizenshipDropdown' : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'CountryOfResidencyDropdown'   : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'USTaxCitizen'                 : false
                        },
                        'LastStep'        : {
                            'AcceptPrivacyDeclaration' : true,
                            'AcceptTandCs'             : true
                        }
                    }
                },
                'referenceId'           : '9925105476',
                'Applicant2Section'     : {
                    'PersonalDetailsSection' : {
                        'BasicInfo'      : {
                            'TitleDropdown' : {
                                'SelectedItem' : 'Miss',
                                'Query'        : 'Miss'
                            },
                            'FirstName'     : 'test',
                            'MiddleName'    : 'test',
                            'LastName'      : 'test',
                            'DateOfBirth'   : '10/10/1987'
                        },
                        'Address'        : {
                            'Address' : {
                                'residentialAddress'          : {
                                    'isManualSearch' : false,
                                    'search'         : {
                                        'selectedItem' : 'AUS|ce08321c-8d9f-4bf3-99e7-867b2d10c20e|0xOAUSHArgBwAAAAAIAwEAAAAABkE_gAAAAAAAADEAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAADEgc21pdGgA',
                                        'query'        : '1 Smith Avenue, ALBION PARK  NSW  2527'
                                    },
                                    'manualAddress'  : {
                                        'buildingName'       : '',
                                        'unitNumber'         : '',
                                        'streetNumber'       : '1',
                                        'streetName'         : 'Smith',
                                        'streetTypeDropdown' : {
                                            'SelectedItem' : 'AVE',
                                            'Query'        : 'Avenue'
                                        },
                                        'poBox'              : null,
                                        'suburb'             : 'ALBION PARK',
                                        'postCode'           : '2527',
                                        'stateDropdown'      : {
                                            'SelectedItem' : 'NSW',
                                            'Query'        : 'NSW'
                                        }
                                    },
                                    'isItPoBox'      : false
                                },
                                'postalAndResidentialAreSame' : true
                            }
                        },
                        'ContactDetails' : {
                            'EmailAddress' : 'test@gmai.com',
                            'MobileNumber' : '0409087654',
                            'HomeNumber'   : null
                        }
                    },
                    'IdentitySection'        : {
                        'OnlineOrOfflineIdCheck' : {
                            'OnlineIDCheck' : 'online'
                        },
                        'IdCheck'                : {
                            'greenIdIdentityCheck' : {
                                'verificationId'     : '5Af47kma',
                                'verificationStatus' : null
                            }
                        }
                    },
                    'FinalQuestionsSection'  : {
                        'TaxFileNumber'   : {
                            'HasTaxFileNumber'              : false,
                            'NoTaxFileNumberReasonDropdown' : {
                                'SelectedItem' : 'AgedServiceInvalidPensioner',
                                'Query'        : 'Aged, Service or Invalid Pensioner'
                            }
                        },
                        'SourceOfFunding' : {
                            'PrimarySourceOfWealthDropdown'   : {
                                'SelectedItem' : 'WII',
                                'Query'        : 'Investment income (e.g. rent, dividends, pension)'
                            },
                            'SourceOfFundsForAccountDropdown' : {
                                'SelectedItem' : 'FBI',
                                'Query'        : 'Business income'
                            },
                            'ReasonForOpeningAccountDropdown' : {
                                'SelectedItem' : 'BI',
                                'Query'        : 'Business income (e.g. regular deposits and withdrawals for expenses (mostly for non-individuals))'
                            }
                        },
                        'Residency'       : {
                            'CountryOfCitizenshipDropdown' : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'CountryOfResidencyDropdown'   : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'USTaxCitizen'                 : false
                        },
                        'LastStep'        : {
                            'AcceptPrivacyDeclaration' : true,
                            'AcceptTandCs'             : true
                        }
                    }
                }
            }
        };
        let newModel    = {
            'Application' : {
                'Welcome'               : {},
                'NewOrExistingCustomer' : {
                    'NewOrExistingCustomer' : 'NewCustomer'
                },
                'SingleOrJoint'         : {
                    'SingleOrJoint' : 'JointApplicant'
                },
                'Applicant1Section'     : {
                    'PersonalDetailsSection' : {
                        'BasicInfo'      : {
                            'Title'       : {
                                'SelectedItem' : 'Mr',
                                'Query'        : 'Mr'
                            },
                            'FirstName'   : 'test',
                            'MiddleName'  : 'test',
                            'LastName'    : 'test',
                            'DateOfBirth' : '10/10/1987'
                        },
                        'Address'        : {
                            'Address' : {
                                'residentialAddress'          : {
                                    'isManualSearch' : false,
                                    'search'         : {
                                        'selectedItem' : 'askjdg',
                                        'query'        : '79-81 Merrivale Drive, WARRNAMBOOL  VIC  3280'
                                    },
                                    'manualAddress'  : {
                                        'buildingName' : '',
                                        'unitNumber'   : '',
                                        'streetNumber' : '79-81',
                                        'streetName'   : 'Merrivale',
                                        'streetType'   : {
                                            'SelectedItem' : 'DR',
                                            'Query'        : 'Drive'
                                        },
                                        'poBox'        : null,
                                        'suburb'       : 'WARRNAMBOOL',
                                        'postCode'     : '3280',
                                        'state'        : {
                                            'SelectedItem' : 'VIC',
                                            'Query'        : 'VIC'
                                        }
                                    },
                                    'isItPoBox'      : false
                                },
                                'postalAndResidentialAreSame' : true
                            }
                        },
                        'ContactDetails' : {
                            'EmailAddress' : 'test@test.com',
                            'MobileNumber' : '0402095299',
                            'HomeNumber'   : null
                        },
                        'NotARobot'      : {
                            'amp-google-recaptcha-check' : {
                                'verificationStatus' : 'verified',
                                'verificationToken'  : 'sdljhfkjsdh'
                            }
                        },
                        'BetterChoice'   : {}
                    },
                    'IdentitySection'        : {
                        'IdCheck' : {
                            'greenIdIdentityCheck' : {
                                'verificationId'     : 'RpGfkNMB',
                                'verificationStatus' : null
                            }
                        }
                    },
                    'FinalQuestionsSection'  : {
                        'TaxFileNumber'   : {
                            'HasTaxFileNumber' : true,
                            'TaxFileNumber'    : '000000000'
                        },
                        'SourceOfFunding' : {
                            'PrimarySourceOfWealth'   : {
                                'SelectedItem' : 'WII',
                                'Query'        : 'Investment income (e.g. rent, dividends, pension)'
                            },
                            'SourceOfFundsForAccount' : {
                                'SelectedItem' : 'FGB',
                                'Query'        : 'Government benefits (e.g. childcare rebate, family tax benefit)'
                            },
                            'ReasonForOpeningAccount' : {
                                'SelectedItem' : 'BI',
                                'Query'        : 'Business income (e.g. regular deposits and withdrawals for expenses (mostly for non-individuals))'
                            }
                        },
                        'Residency'       : {
                            'CountryOfCitizenship' : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'CountryOfResidency'   : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'USTaxCitizen'         : false
                        },
                        'LastStep'        : {
                            'AcceptPrivacyDeclaration' : true,
                            'AcceptTandCs'             : true
                        }
                    }
                },
                'referenceId'           : '9925105476',
                'Applicant2Section'     : {
                    'PersonalDetailsSection' : {
                        'BasicInfo'      : {
                            'Title'       : {
                                'SelectedItem' : 'Miss',
                                'Query'        : 'Miss'
                            },
                            'FirstName'   : 'test',
                            'MiddleName'  : 'test',
                            'LastName'    : 'test',
                            'DateOfBirth' : '10/10/1987'
                        },
                        'Address'        : {
                            'Address' : {
                                'residentialAddress'          : {
                                    'isManualSearch' : false,
                                    'search'         : {
                                        'selectedItem' : 'AUS|ce08321c-8d9f-4bf3-99e7-867b2d10c20e|0xOAUSHArgBwAAAAAIAwEAAAAABkE_gAAAAAAAADEAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAADEgc21pdGgA',
                                        'query'        : '1 Smith Avenue, ALBION PARK  NSW  2527'
                                    },
                                    'manualAddress'  : {
                                        'buildingName' : '',
                                        'unitNumber'   : '',
                                        'streetNumber' : '1',
                                        'streetName'   : 'Smith',
                                        'streetType'   : {
                                            'SelectedItem' : 'AVE',
                                            'Query'        : 'Avenue'
                                        },
                                        'poBox'        : null,
                                        'suburb'       : 'ALBION PARK',
                                        'postCode'     : '2527',
                                        'state'        : {
                                            'SelectedItem' : 'NSW',
                                            'Query'        : 'NSW'
                                        }
                                    },
                                    'isItPoBox'      : false
                                },
                                'postalAndResidentialAreSame' : true
                            }
                        },
                        'ContactDetails' : {
                            'EmailAddress' : 'test@gmai.com',
                            'MobileNumber' : '0409087654',
                            'HomeNumber'   : null
                        }
                    },
                    'IdentitySection'        : {

                        'IdCheck'                : {
                            'greenIdIdentityCheck' : {
                                'verificationId'     : '5Af47kma',
                                'verificationStatus' : null
                            }
                        }
                    },
                    'FinalQuestionsSection'  : {
                        'TaxFileNumber'   : {
                            'HasTaxFileNumber'      : false,
                            'NoTaxFileNumberReason' : {
                                'SelectedItem' : 'AgedServiceInvalidPensioner',
                                'Query'        : 'Aged, Service or Invalid Pensioner'
                            }
                        },
                        'SourceOfFunding' : {
                            'PrimarySourceOfWealth'   : {
                                'SelectedItem' : 'WII',
                                'Query'        : 'Investment income (e.g. rent, dividends, pension)'
                            },
                            'SourceOfFundsForAccount' : {
                                'SelectedItem' : 'FBI',
                                'Query'        : 'Business income'
                            },
                            'ReasonForOpeningAccount' : {
                                'SelectedItem' : 'BI',
                                'Query'        : 'Business income (e.g. regular deposits and withdrawals for expenses (mostly for non-individuals))'
                            }
                        },
                        'Residency'       : {
                            'CountryOfCitizenship' : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'CountryOfResidency'   : {
                                'SelectedItem' : 'AUS',
                                'Query'        : 'Australia'
                            },
                            'USTaxCitizen'         : false
                        },
                        'LastStep'        : {
                            'AcceptPrivacyDeclaration' : true,
                            'AcceptTandCs'             : true
                        }
                    }
                }
            }
        };
        let transformed = service.toFrontendModel( oldModel );
        expect( transformed ).toEqual( newModel );
    } );
} );
//tslint:disable
