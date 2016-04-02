export class Action {
  constructor (public executeAction: Function, public params: Array<Object>) {}

  invoke() {
    return this.executeAction.apply(null, this.params);
  }
}
