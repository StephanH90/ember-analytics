import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CaFieldSelectorFieldComponent extends Component {
  @tracked selectedOption;

  get selected() {
    return false;
    // debugger;
    // return this.args.options.find(
    //   (o) => o.value.toLowerCase() === this.args.selector
    // );
  }

  @action
  onSelect(newVal) {
    console.log('🦠 newVal:', newVal);
    this.selectedOption = this.args.selector.options.find(
      (s) => s.value === newVal.value
    );
    this.args.onSelect(this.args.selector, newVal);
  }
}
