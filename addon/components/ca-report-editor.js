import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import FieldSelector from '../models/field-selector';

// ! For dev

// const optionsForPath = function (path) {
//   return dummyApi[path].fields.map((f) => {
//     return { label: f, value: f };
//   });
// };

// export class Selector {
//   @tracked options = A(optionsForPath(''));
//   @tracked selected = {};
//   @tracked slug = '';
//   @tracked fieldSelector;

//   init(fieldSelector) {
//     this.fieldSelector = fieldSelector;
//   }
// }
// export class FieldSelector {
//   @tracked selectors = A([new Selector()]);
//   @tracked showInOutput = true;
//   @tracked alias = '';
//   @tracked filters = A([]);
//   @tracked slug = '';

//   get path() {
//     return this.selectors
//       .map((s) => s.selected?.value?.toLowerCase())
//       .join('.');
//   }
// }

// const dummyApi = {
//   '': {
//     fields: ['Document'],
//     isEnd: false,
//   },
//   document: {
//     fields: ['Form', 'Answers'],
//     isEnd: false,
//   },
//   'document.answers': {
//     fields: ['total_price', 'supplier_name'],
//   },
//   'document.answers.total_price': { fields: [], isEnd: true },
//   'document.answers.supplier_name': { fields: [], isEnd: true },
//   'document.form': {
//     fields: [],
//     isEnd: true,
//   },
// };

export default class CaReportEditorComponent extends Component {
  @tracked fieldSelectors = A([]);

  @action
  addFieldSelector() {
    this.fieldSelectors = this.fieldSelectors.concat(new FieldSelector());
  }
}
