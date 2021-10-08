import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CaFieldSelectorFieldComponent extends Component {
  @tracked selectedOption;

  @action
  onSelect(newVal) {
    this.selectedOption = this.args.selector.options.find(
      (s) => s.value === newVal.value
    );
    this.args.onSelect(this.args.selector, newVal);
  }
}
