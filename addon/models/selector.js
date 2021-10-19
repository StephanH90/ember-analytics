import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class Selector {
  // @tracked options = A([]);
  @tracked selected = {};
  @tracked slug = '';
  @tracked fieldSelector;

  get options() {
    return this.fieldSelector.optionsForPath;
  }

  constructor(fieldSelector) {
    this.fieldSelector = fieldSelector;
  }
}
