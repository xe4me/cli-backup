export  class FormDefinition {
    blockType : string;
    blockLayout : string;
    name? : string;
    page? : string; // Should be removed
    commonBlock : boolean;
    path : string;
    custom? : any;
    blocks? : FormDefinition[];
    optionalBlocks? : FormDefinition[];
}
