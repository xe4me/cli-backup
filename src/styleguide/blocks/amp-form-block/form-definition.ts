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
                                    name        : 'anotherSampleExperienceBlock' ,
                                    blockType   : 'AnotherSampleExperienceBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/another-sample-experience-block' ,
                                    custom      : {
                                        id         : 'FullOrPartial' ,
                                        blockTitle : 'Which one , full or partial ? ' ,
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
                                        blockTitle : 'Let\'s get your name, shall we ?' ,
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
                                } ,
                                {
                                    name        : 'sampleArrayExperienceBlock' ,
                                    blockType   : 'SampleArrayExperienceBlock' ,
                                    blockLayout : 'INLINE' ,
                                    commonBlock : false ,
                                    path        : 'blocks/amp-form-block/sample-array-experience-block' ,
                                    custom      : {
                                        blockTitle : 'This block has a repeating group !' ,
                                        age        : {
                                            title : "What about your age?" ,
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
(()=> {
    console.log( 'Inside nodejs...................' );
})();