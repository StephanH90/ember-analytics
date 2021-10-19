import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

import Selector from './selector';

const dummyApi = {
  '': {
    fields: ['Document'],
    isEnd: false,
  },
  document: {
    fields: ['Form', 'Answers'],
    isEnd: false,
  },
  'document.answers': {
    fields: ['total_price', 'supplier_name'],
  },
  'document.answers.total_price': { fields: [], isEnd: true },
  'document.answers.supplier_name': { fields: [], isEnd: true },
  'document.form': {
    fields: [],
    isEnd: true,
  },
};

export default class FieldSelector {
  @tracked selectors = A([new Selector(this)]);
  @tracked showInOutput = true;
  @tracked alias = '';
  @tracked filters = A([]);
  @tracked slug = '';

  get path() {
    return this.selectors
      .map((s) => s.selected?.value?.toLowerCase())
      .join('.');
  }

  get optionsForPath() {
    return dummyApi[this.path].fields.map((f) => {
      return { label: f, value: f };
    });
  }

  addSelector(newSelector) {
    this.selectors.pushObject(newSelector);
  }
}
