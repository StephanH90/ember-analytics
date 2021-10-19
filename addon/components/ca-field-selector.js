import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Selector from '../models/selector';

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
  // @tracked selectors = A([
  //   { options: this.optionsForPath(''), selected: {}, slug: '' },
  // ]);
  // @tracked alias;
  // @tracked showInOutput = true;

  @action
  select(selector, newVal) {
    debugger;

    const s = this.args.fieldSelector.selectors.find(
      (s) => s.slug === selector.slug
    );
    s.selected = s.options.find((o) => o.value === newVal.value);
    this.removeTrailingSelectors(s);
    const options = this.optionsForPath(this.path);
    if (options.length > 0) {
      debugger;
      // we have not arrived at the end of the tree so we need to add another selector
      // this.args.fieldSelector.selectors =
      // this.args.fieldSelector.selectors.concat({
      //   options: this.optionsForPath(this.path),
      //   selected: {},
      //   slug: this.path,
      // });
      this.args.fieldSelector.addSelector(new Selector());

      console.log('🔫', 'test');
    }
    // this.args.updateFieldSelector(this.selectors);
    // this.args.fieldSelector.selectors = this.selectors;
  }

  removeTrailingSelectors(selector) {
    this.args.fieldSelector.selectors = A(
      this.args.fieldSelector.selectors.slice(
        0,
        this.args.fieldSelector.selectors.indexOf(selector) + 1
      )
    );
  }

  get path() {
    return this.args.fieldSelector.selectors
      .map((s) => s.selected?.value?.toLowerCase())
      .join('.');
  }

  optionsForPath(path) {
    return dummyApi[path].fields.map((f) => {
      return { label: f, value: f };
    });
  }

  // ? TODO: REMOVE THIS?
  @action
  setShowInOutput(event) {
    // Todo: This returns "false" or "true" not booleans
    // this.showInOutput = event.target.value;
    const val = event.target.value === 'true';
    if (val !== this.args.fieldSelector.showInOutput) {
      this.args.fieldSelector.showInOutput = val;
    }
  }
}
