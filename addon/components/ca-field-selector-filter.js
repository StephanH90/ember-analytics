// import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CaFieldSelectorFilterComponent extends Component {
  // @tracked filters = A(['test']);
  @tracked filters = [];
  @tracked newFilterValue = '';

  @action
  removeFilter(filter) {
    this.filters = this.filters.filter((f) => f !== filter);
  }

  @action
  addFilter(event) {
    event.preventDefault();
    this.filters = this.filters.concat(this.newFilterValue);
    this.newFilterValue = '';
  }
}
