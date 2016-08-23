import { FormBlock } from './formBlock';

export abstract class ChangeableFormBlock extends FormBlock {

  ngAfterViewInit () : any {
    this.subscribeToScrollService();
  }

  public change() {
    this.hasClickedOnOkButton = false;
    this.isInSummaryState = false;
  }

  private subscribeToScrollService() {
    this.scrollService.$scrolled.subscribe( ( changes ) => {
      if ( changes === this.getHtmlId('') ) {
        this.change();
      }
    });
    return undefined;
  }
}
