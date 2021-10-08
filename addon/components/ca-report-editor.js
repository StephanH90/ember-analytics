import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

// ! For dev
const exampleFieldSelector = {
  fields: [],
  showInOutput: true,
  alias: '',
  filters: [],
};

// ! for dev
const calumaData = {
  fields: [
    {
      slug: 'form',
      isEnd: false,
    },
    {
      slug: 'workflow',
      isEnd: true,
    },
  ],
};

export default class CaReportEditorComponent extends Component {
  @tracked fieldSelectors = [];

  @action
  addFieldSelector() {
    // ? @Jimmy why does .push() not trigger the ember reactivity properly?
    const copyOfFieldSelector = { ...exampleFieldSelector };
    this.fieldSelectors = this.fieldSelectors.concat(copyOfFieldSelector);
  }

  get fields() {
    return calumaData.fields;
  }
}
