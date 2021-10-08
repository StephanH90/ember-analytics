import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

// const selectors = [
//   {
//     options: ['Document'],
//     selected: 'Document',
//     slug: ''
//   },
//   {
//     options: dummyApi['document'],
//     selected: null,
//     slug: 'document'
//   }
// ]

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

export default class CaFieldSelectorComponent extends Component {
  @tracked selectors = A([
    { options: this.optionsForPath(''), selected: {}, slug: '' },
  ]);

  @action
  select(selector, newVal) {
    const s = this.selectors.find((s) => s.slug === selector.slug);
    s.selected = s.options.find((o) => o.value === newVal.value);
    const oldPath = this.path;
    this.selectors.pushObject({
      options: this.optionsForPath(this.path),
      selected: {},
      slug: oldPath,
    });
  }

  get path() {
    return this.selectors.map((s) => s.selected.value.toLowerCase()).join('.');
  }

  optionsForPath(path) {
    return dummyApi[path].fields.map((f) => {
      return { label: f, value: f };
    });
  }

  get isLastSelectorEndOfPath() {
    return this.selectors[this.selectors.length]?.selected?.isEnd;
  }
}
