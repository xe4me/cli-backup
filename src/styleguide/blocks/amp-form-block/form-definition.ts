export var formDef = {
    id      : 'ApplicationForm' ,
    version : '0.0.1' ,
    path    : '/application' ,
    status  : 'NEW' ,
    blocks  : [
        {
            blockType   : 'DetailsPage' ,
            name        : 'Application' ,
            blockLayout : 'PAGE' ,
            commonBlock : false ,
            path        : 'blocks/amp-form-block/pages/details-page' ,
            page        : {
                pageId     : null ,
                nextPageId : null ,
                prevPageId : null ,
                routeName  : 'ApplicationFormComponent'
            } ,
            blocks      : [
                {
                    name        : 'introBlockComponent' ,
                    blockType   : 'IntroBlockComponent' ,
                    blockLayout : 'INLINE' ,
                    commonBlock : false ,
                    path        : 'blocks/amp-form-block/intro/intro-block.component'
                } ,
                {
                    blockType   : 'MenuFrameApplicationBlockComponent' ,
                    blockLayout : 'INLINE' ,
                    commonBlock : false ,
                    path        : 'blocks/amp-form-block/menu-frame/menu-frame.application.component' ,
                    blocks      : [
                        {
                            name        : 'InsuranceDetailsSection' ,
                            blockType   : 'PageSectionComponent' ,
                            blockLayout : 'SECTION' ,
                            commonBlock : false ,
                            path        : 'sections/page-section.component' ,
                            custom      : { label : 'Beneficiaries' } ,

                            blocks      : [
                                {
                                    name        : 'samplefieldsblock' ,
                                    blockType   : 'SampleFieldsBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/sample-fields-block' ,
                                    custom      : {
                                        id         : 'FullOrPartial' ,
                                        blockTitle : 'Confirm or update your details ' ,
                                        buttons    : [
                                            {
                                                id    : 'fullId' ,
                                                value : 'full' ,
                                                label : 'Full sale'
                                            } ,
                                            {
                                                id    : 'partialId' ,
                                                value : 'partial' ,
                                                label : 'Partial sale'
                                            }
                                        ]
                                    }
                                },
                                {
                                    name        : 'samplefieldsblock2' ,
                                    blockType   : 'SampleFieldsBlock2' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/sample-fields-block2' ,
                                    custom      : {
                                        id         : 'FullOrPartial' ,
                                        blockTitle : 'Your region ' ,
                                        buttons    : [
                                            {
                                                id    : 'ACT' ,
                                                value : 'ACT' ,
                                                label : 'ACT'
                                            } ,
                                            {
                                                id    : 'NSW' ,
                                                value : 'NSW' ,
                                                label : 'NSW'
                                            },
                                            {
                                                id    : 'NT' ,
                                                value : 'NT' ,
                                                label : 'NT'
                                            },
                                            {
                                                id    : 'QLD' ,
                                                value : 'QLD' ,
                                                label : 'QLD'
                                            },
                                            {
                                                id    : 'SA' ,
                                                value : 'SA' ,
                                                label : 'SA'
                                            },
                                            {
                                                id    : 'TAS' ,
                                                value : 'TAS' ,
                                                label : 'TAS'
                                            },
                                            {
                                                id    : 'VIC' ,
                                                value : 'VIC' ,
                                                label : 'VIC'
                                            },
                                            {
                                                id    : 'WA' ,
                                                value : 'WA' ,
                                                label : 'WA'
                                            }
                                        ]
                                    }
                                },
                                {
                                    name        : 'anotherSampleExperienceBlock' ,
                                    blockType   : 'AnotherSampleExperienceBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/another-sample-experience-block' ,
                                    custom      : {
                                        id         : 'FullOrPartial' ,
                                        blockTitle : 'Block with full width label ' ,
                                        buttons    : [
                                            {
                                                id    : 'fullId' ,
                                                value : 'full' ,
                                                label : 'Full sale'
                                            } ,
                                            {
                                                id    : 'partialId' ,
                                                value : 'partial' ,
                                                label : 'Partial sale'
                                            }
                                        ]
                                    }
                                }
                                ,
                                {
                                    name        : 'sampleExperienceBlock' ,
                                    blockType   : 'SampleExperienceBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/sample-experience-block' ,
                                    custom      : {
                                        blockTitle : 'Block with 3 columns' ,
                                        firstname  : {
                                            title  : "What's your first name?" ,
                                            errors : {
                                                required : 'First name is a required thing :)'
                                            }
                                        } ,
                                        lastname   : {
                                            title  : "What's your last name?" ,
                                            errors : {
                                                required : 'Last name is a required thing :)'
                                            }
                                        } ,
                                        age        : {
                                            title    : "What about your age?" ,
                                            errors   : {
                                                required : 'Apparently even age is a required thing :) , what a wonderful time to be'
                                            } ,
                                            regex    : '^([0-9])*$' ,
                                            maxLengh : 3
                                        }
                                    }
                                }
                                ,
                                {
                                    name        : 'sampleArrayExperienceBlock' ,
                                    blockType   : 'SampleArrayExperienceBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/sample-array-experience-block' ,
                                    custom      : {
                                        blockTitle : 'This block has dynamic rows' ,
                                        mobilenumber        : {
                                            title    : "Mobile" ,
                                            regex    : '^([0-9])*$' ,
                                            maxLengh : 3
                                        }
                                    }
                               }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

