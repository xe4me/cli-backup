import {FormBlock} from "../blocks/formBlock";

// import {Observable}     from 'rxjs/Observable';

export class FormVersion {
  private _version: number[];   // For example 1.3.2

  // constructor (private major: number, private minor?: number, private patch?: number);
  constructor (private versionString: string) {
    this._version = versionString.split(".").map(Number);
  }

  get versionId () {
    return this._version.join(".");
  }

  // TODO: method to the compatibility of 2 FormVersion
}

export enum FormStatus {NEW, SAVED, SUBMITTED};
export enum BlockLayout {INLINE, PAGE};

export abstract class FormDefinition {
  public id: string;                   // Name of this form
  public version: FormVersion;         // Version of this FormDefinition like 1.5.1
  public path: string;                 // Xpath like location of this element
  public status: FormStatus;           // State of this form in regards to storage need
  public createdDate: Date;            // Date of creation
  public updatedDate: Date;            // Date of updated status.
  public blocks: Array<any>;           // Body of the form. The concrete FormBlock will be created only via DynamicComponentLoader due to DI

  constructor (formDef: any, pageId: string) {
    this.id = formDef.id;
    this.version = new FormVersion(formDef.version);
    this.path = formDef.path;
    this.status = (<any>FormStatus)[formDef.status];
    this.createdDate = new Date();

    // Construct the actual formBlock object from the formBlockDefinition JSON
    // Only construct the blocks with the corresponding page name
    // **31/03/2016: This pageId concept should not be here. It should be in the form instance, maybe in baseForm at dcl
    this.blocks = this.constructFormBlocks(formDef.blocks, pageId);
  }

  // Maps the FormDef's formBlocks[] JSON structure into actual FormBlock objects, including the formControls.
  constructFormBlocks(_formDefBlocks: Array<any>, pageId: string) : FormBlock[] {
    let formBlock = [];

    for (let i=0; _formDefBlocks && i<_formDefBlocks.length; i++) {
      let _blockDef = _formDefBlocks[i];

      // Only construct the matching BlockLayout.PAGE type block with the URL
      if (_blockDef.blockLayout === BlockLayout[BlockLayout.INLINE] ||
        (_blockDef.blockLayout === BlockLayout[BlockLayout.PAGE] && _blockDef.page.pageId === pageId )) {

        formBlock.push(_blockDef);
      }
    }

    return formBlock;
  }
}
