import { HydrationService } from './hydration.service';
import { FormBuilder } from '@angular/forms';
describe( 'HydrationService', () => {
    let service;
    beforeEach( () => {
        service = new HydrationService( new FormBuilder() );
    } );
    it( 'should return null if no value has been injected as argument', () => {
        let hydrated = service.hydrate();
        expect( hydrated ).toBe( null );
    } );
    it( 'should return the hydrated form group of the provided model', () => {
        let model    = {
            "Application" : {
                "Applicant2Section"     : {
                    "FinalQuestionsSection"  : {
                        "LastStep"        : {
                            "AcceptPrivacyDeclaration" : true,
                            "AcceptTandCs"             : true
                        },
                        "Residency"       : {
                            "TIN"                          : "22222222",
                            "SSN"                          : "222222",
                            "USTaxCitizen"                 : true,
                            "CountryOfCitizenshipDropdown" : {
                                "SelectedItem" : "AUS",
                                "Query"        : "Australia"
                            },
                            "CountryOfResidencyDropdown"   : {
                                "SelectedItem" : "AUS",
                                "Query"        : "Australia"
                            }
                        },
                        "SourceOfFunding" : {
                            "PrimarySourceOfWealthDropdown"   : {
                                "SelectedItem" : "WII",
                                "Query"        : "Investment income (e.g. rent, dividends, pension)"
                            },
                            "SourceOfFundsForAccountDropdown" : {
                                "SelectedItem" : "FII",
                                "Query"        : "Investment income (e.g. rent, dividends, pension)"
                            },
                            "ReasonForOpeningAccountDropdown" : {
                                "SelectedItem" : "BI",
                                "Query"        : "Business income e.g. regular deposits and withdrawals for expenses (mostly for non-individuals)"
                            }
                        },
                        "TaxFileNumber"   : {
                            "NoTaxFileNumberReasonDropdown" : {
                                "SelectedItem" : "AgedServiceInvalidPensioner",
                                "Query"        : "Aged, Service or Invalid Pensioner"
                            },
                            "HasTaxFileNumber"              : false
                        }
                    },
                    "IdentitySection"        : {
                        "IdCheck"                : {
                            "verificationStatus" : "in_progress",
                            "verificationToken"  : "75b7ad90aac03bb7295f67c1044de1040d365b34",
                            "verificationId"     : "1FDW6whT1",
                            "acknowledge"        : "yes"
                        },
                        "OnlineOrOfflineIdCheck" : {
                            "OnlineIDCheck" : "online"
                        }
                    },
                    "PersonalDetailsSection" : {
                        "ContactDetails" : {
                            "HomeNumber"   : "0222222222",
                            "MobileNumber" : "0444444444",
                            "EmailAddress" : "w@w.com"
                        },
                        "Address"        : {
                            "Address" : {
                                "postalAddress"               : {
                                    "search"        : {
                                        "selectedItem" : "nOAUSHAfgBwMCAQAAGwqogAAAAAAzMwBkAA",
                                        "query"        : "100 Henty Highway, BEULAH  VIC  3395"
                                    },
                                    "isItPoBox"     : false,
                                    "manualAddress" : {
                                        "buildingName"       : "",
                                        "unitNumber"         : "",
                                        "streetNumber"       : "1",
                                        "streetName"         : "33 alfred street",
                                        "streetTypeDropdown" : {
                                            "SelectedItem" : null,
                                            "Query"        : null
                                        },
                                        "poBox"              : null,
                                        "suburb"             : "Pymble",
                                        "postCode"           : "2798",
                                        "stateDropdown"      : {
                                            "SelectedItem" : "NSW",
                                            "Query"        : "NSW"
                                        }
                                    }
                                },
                                "postalAndResidentialAreSame" : false,
                                "residentialAddress"          : {
                                    "search"        : {
                                        "selectedItem" : "nOAUSHAfgBwMCAQAAGwqogAAAAAAzMwBkAA",
                                        "query"        : "33 Alfred Street, CESSNOCK  NSW  2325"
                                    },
                                    "isItPoBox"     : false,
                                    "manualAddress" : {
                                        "buildingName"       : "",
                                        "unitNumber"         : "",
                                        "streetNumber"       : "1",
                                        "streetName"         : "33 alfred street",
                                        "streetTypeDropdown" : {
                                            "SelectedItem" : null,
                                            "Query"        : null
                                        },
                                        "poBox"              : null,
                                        "suburb"             : "Pymble",
                                        "postCode"           : "2798",
                                        "stateDropdown"      : {
                                            "SelectedItem" : "NSW",
                                            "Query"        : "NSW"
                                        }
                                    }
                                }
                            }
                        },
                        "BasicInfo"      : {
                            "DateOfBirth"   : "10/10/1991",
                            "LastName"      : "Parker",
                            "MiddleName"    : null,
                            "FirstName"     : "Mary",
                            "TitleDropdown" : {
                                "SelectedItem" : "Mr",
                                "Query"        : "Mr"
                            }
                        }
                    }
                },
                "Applicant1Section"     : {
                    "FinalQuestionsSection"  : {
                        "LastStep"        : {
                            "AcceptPrivacyDeclaration" : true,
                            "AcceptTandCs"             : true
                        },
                        "Residency"       : {
                            "TIN"                          : "22222222",
                            "SSN"                          : "222222",
                            "USTaxCitizen"                 : true,
                            "CountryOfCitizenshipDropdown" : {
                                "SelectedItem" : "AUS",
                                "Query"        : "Australia"
                            },
                            "CountryOfResidencyDropdown"   : {
                                "SelectedItem" : "AUS",
                                "Query"        : "Australia"
                            }
                        },
                        "SourceOfFunding" : {
                            "PrimarySourceOfWealthDropdown"   : {
                                "SelectedItem" : "WII",
                                "Query"        : "Investment income (e.g. rent, dividends, pension)"
                            },
                            "SourceOfFundsForAccountDropdown" : {
                                "SelectedItem" : "FII",
                                "Query"        : "Investment income (e.g. rent, dividends, pension)"
                            },
                            "ReasonForOpeningAccountDropdown" : {
                                "SelectedItem" : "BI",
                                "Query"        : "Business income e.g. regular deposits and withdrawals for expenses (mostly for non-individuals)"
                            }
                        },
                        "TaxFileNumber"   : {
                            "NoTaxFileNumberReasonDropdown" : {
                                "SelectedItem" : "AgedServiceInvalidPensioner",
                                "Query"        : "Aged, Service or Invalid Pensioner"
                            },
                            "HasTaxFileNumber"              : false
                        }
                    },
                    "IdentitySection"        : {
                        "IdCheck"                : {
                            "verificationStatus" : "in_progress",
                            "verificationToken"  : "75b7ad90aac03bb7295f67c1044de1040d365b34",
                            "verificationId"     : "1FDW6whT1",
                            "acknowledge"        : "yes"
                        },
                        "OnlineOrOfflineIdCheck" : {
                            "OnlineIDCheck" : "online"
                        }
                    },
                    "PersonalDetailsSection" : {
                        "ContactDetails" : {
                            "HomeNumber"   : "0222222222",
                            "MobileNumber" : "0444444444",
                            "EmailAddress" : "ww@g.com"
                        },
                        "Address"        : {
                            "Address" : {
                                "postalAddress"               : {
                                    "search"        : {
                                        "selectedItem" : "nOAUSHAfgBwMCAQAAGwqogAAAAAAzMwBkAA",
                                        "query"        : "100 Henty Highway, BEULAH  VIC  3395"
                                    },
                                    "isItPoBox"     : false,
                                    "manualAddress" : {
                                        "buildingName"       : "",
                                        "unitNumber"         : "",
                                        "streetNumber"       : "1",
                                        "streetName"         : "33 alfred street",
                                        "streetTypeDropdown" : {
                                            "SelectedItem" : null,
                                            "Query"        : null
                                        },
                                        "poBox"              : null,
                                        "suburb"             : "Pymble",
                                        "postCode"           : "2798",
                                        "stateDropdown"      : {
                                            "SelectedItem" : "NSW",
                                            "Query"        : "NSW"
                                        }
                                    }
                                },
                                "postalAndResidentialAreSame" : false,
                                "residentialAddress"          : {
                                    "search"        : {
                                        "selectedItem" : "nOAUSHAfgBwMCAQAAGwqogAAAAAAzMwBkAA",
                                        "query"        : "33 Alfred Street, CESSNOCK  NSW  2325"
                                    },
                                    "isItPoBox"     : false,
                                    "manualAddress" : {
                                        "buildingName"       : "",
                                        "unitNumber"         : "",
                                        "streetNumber"       : "1",
                                        "streetName"         : "33 alfred street",
                                        "streetTypeDropdown" : {
                                            "SelectedItem" : null,
                                            "Query"        : null
                                        },
                                        "poBox"              : null,
                                        "suburb"             : "Pymble",
                                        "postCode"           : "2798",
                                        "stateDropdown"      : {
                                            "SelectedItem" : "NSW",
                                            "Query"        : "NSW"
                                        }
                                    }
                                }
                            }
                        },
                        "BasicInfo"      : {
                            "DateOfBirth"   : "10/12/1990",
                            "LastName"      : "Parker",
                            "MiddleName"    : null,
                            "FirstName"     : "Peter",
                            "TitleDropdown" : {
                                "SelectedItem" : "Mr",
                                "Query"        : "Mr"
                            }
                        }
                    }
                },
                "SingleOrJoint"         : {
                    "SingleOrJoint" : "JointApplicant"
                },
                "NewOrExistingCustomer" : {
                    "NewOrExistingCustomer" : "NewCustomer"
                },
                "Welcome"               : {}
            }
        };
        let hydrated = service.hydrate( model );
        expect( hydrated.value ).toEqual( model );
    } );
    it( 'should return the hydrated form group of the provided model which has arrays and groups and controls', () => {
        let model    = {
            "Application" : {
                "Welcome"            : {
                    "NewOrExisting" : "existing"
                },
                "Retrieve"           : {
                    "ApplicationID" : "1024065465"
                },
                "Identifier"         : "1024065465",
                "PracticeDetails"    : {
                    "ContactDetails"    : {
                        "FirstName"     : "Darron",
                        "LastName"      : "Smith",
                        "ContactNumber" : "02 4940 8999",
                        "Email"         : "graham@pinnaclefinancial.com.au"
                    },
                    "PracticePrincipal" : {
                        "Address" : {
                            "isManualSearch" : true,
                            "search"         : {
                                "selectedItem" : null,
                                "query"        : null
                            },
                            "manualAddress"  : {
                                "countryDropdown" : {
                                    "SelectedItem" : "AUS",
                                    "Query"        : "Australia"
                                },
                                "address"         : "100 George Street",
                                "suburb"          : "Sydney",
                                "stateDropdown"   : {
                                    "SelectedItem" : "NSW",
                                    "Query"        : "NSW"
                                },
                                "city"            : null,
                                "postCode"        : "2000"
                            }
                        }
                    },
                    "PracticeAddress"   : {
                        "Address" : {
                            "isManualSearch" : true,
                            "search"         : {
                                "selectedItem" : null,
                                "query"        : null
                            },
                            "manualAddress"  : {
                                "countryDropdown" : {
                                    "SelectedItem" : "AUS",
                                    "Query"        : "Australia"
                                },
                                "address"         : "kjhhkh",
                                "suburb"          : "kjhkjh",
                                "stateDropdown"   : {
                                    "SelectedItem" : "NSW",
                                    "Query"        : "NSW"
                                },
                                "city"            : null,
                                "postCode"        : "2093"
                            }
                        }
                    },
                    "PracticeType"      : {
                        "PracticeType" : "Company"
                    },
                    "EquityHolders"     : {
                        "HasEquityHolders" : "Yes",
                        "EquityHolders"    : [
                            {
                                "firstName"     : "Freddie",
                                "lastName"      : "Mercury",
                                "address"       : {
                                    "isManualSearch" : true,
                                    "search"         : {
                                        "selectedItem" : null,
                                        "query"        : null
                                    },
                                    "manualAddress"  : {
                                        "countryDropdown" : {
                                            "SelectedItem" : "AUS",
                                            "Query"        : "Australia"
                                        },
                                        "address"         : "10 Queen St",
                                        "suburb"          : "Woollahra",
                                        "stateDropdown"   : {
                                            "SelectedItem" : "NSW",
                                            "Query"        : "NSW"
                                        },
                                        "city"            : null,
                                        "postCode"        : "2025"
                                    }
                                },
                                "contactNumber" : "02 5555 1234",
                                "email"         : "freddie@queen.co.uk"
                            }
                        ]
                    }
                },
                "ApplicationDetails" : {
                    "PartnershipManager" : {
                        "FirstName" : "Jimi",
                        "LastName"  : "Hendrix",
                        "RequestID" : "123456789"
                    },
                    "ExerciseDate"       : {
                        "ExerciseDate" : "01/01/2019"
                    }
                },
                "ActionsRequired"    : {
                    "Mortgages"        : {
                        "PracticeMortgagesOption" : "No"
                    },
                    "Agreements"       : {
                        "PracticeAgreementsOption" : "No"
                    },
                    "MandatoryActions" : {
                        "PracticeMandatoryActionsConfirmation" : true
                    }
                },
                "FurtherTerms"       : {
                    "AmendedTerms" : {
                        "PracticeAmendedTermsOption" : "No"
                    }
                },
                "ReviewSection"      : {
                    "ReviewSummary"      : {},
                    "UploadSignedPages"  : {
                        "UploadSignedPages" : null
                    },
                    "ReviewSticky"       : {},
                    "UploadAmendedTerms" : {}
                }
            }
        };
        let hydrated = service.hydrate( model );
        expect( hydrated.value ).toEqual( model );
    } );
} );
