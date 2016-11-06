export interface FormDefinition {
    /*
     *
     * TODO : :
     * Check the comments bellow
     *
     * */
    blockType : string;
    blockLayout : string;
    name? : string;
    page? : string; // Should be removed
    prettyName? : string; // Ask Iain if he actually has used this ; otherwise remove from block loader and here
    reviewTemplate? : string; // Ask Iain if he actually has used this ; otherwise remove from block loader and here
    commonBlock : boolean;
    path : string;
    custom? : any;
    blocks? : FormDefinition[];
    __fdn? : (number|string)[]; // Ask Iain if he actually has used this ; otherwise remove from block loader and here
    optionalBlocks? : FormDefinition[];
}
