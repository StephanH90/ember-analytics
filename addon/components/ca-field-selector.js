import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

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
  @tracked alias;
  @tracked showInOutput = true;

  @action
  select(selector, newVal) {
    const s = this.selectors.find((s) => s.slug === selector.slug);
    s.selected = s.options.find((o) => o.value === newVal.value);

    this.removeTrailingSelectors(s);

    const options = this.optionsForPath(this.path);

    if (options.length > 0) {
      // we have not arrived at the end of the tree so we need to add another selector
      this.selectors.pushObject({
        options: this.optionsForPath(this.path),
        selected: {},
        slug: this.path,
      });
    }
  }

  removeTrailingSelectors(selector) {
    this.selectors = A(
      this.selectors.slice(0, this.selectors.indexOf(selector) + 1)
    );
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

  @action
  setShowInOutput(event) {
    // Todo: This returns "false" or "true" not booleans
    this.showInOutput = event.target.value;
  }
}
