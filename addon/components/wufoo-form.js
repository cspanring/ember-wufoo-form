/*global WufooForm */

import layout from '../templates/components/wufoo-form';

import Component from '@ember/component';
import { get, set, getWithDefault } from '@ember/object';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default Component.extend({
  layout,

  classNames: ['wufoo-form'],

  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'wufoo-form',

  parentSelector: computed('target', {
    get() {
      return get(this, 'target') || `#${get(this, 'elementId')}`;
    }
  }),

  formTarget: computed('parentSelector', {
    get() {
      return `${get(this, 'parentSelector')} .wufoo-form-container`;
    }
  }),

  init() {
    this._super(...arguments);
    assert(
      '`formId` and `userName` attributes are required.',
      get(this, 'formId') && get(this, 'userName')
    );
  },

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'target')) {
      let target = get(this, 'target');
      // move content to optional target node
      this.$('.wufoo-form-container').appendTo(target);
    }

    // don't run wufoo iframe content in tests
    let config = getOwner(this).resolveRegistration('config:environment');
    if (config.environment !== 'test') {
      set(this, 'isLoading', true);
      this.appendWufooJs();
    }
  },

  appendWufooJs() {
    // loosely based on Wufoo's form embed code
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.onload = this.initWufooForm.bind(this);
    scriptTag.onerror = () => {
      set(this, 'isShowingFallback', true);
      set(this, 'isLoading', false);
    };

    let formContainer = document.querySelector(get(this, 'formTarget'));
    let parentNode = document.querySelector(get(this, 'parentSelector'));

    assert(
      'Wufoo form requires a valid DOM target node to be inserted into.',
      formContainer && parentNode
    );

    // add wufoo script to document
    document.head.appendChild(scriptTag);
    scriptTag.src = `${
      document.location.protocol
    }//www.wufoo.com/scripts/embed/form.js`;
  },

  initWufooForm() {
    let wufooForm = new WufooForm();

    let options = {
      // required
      userName: get(this, 'userName'),
      formHash: get(this, 'formId'),
      // optional
      autoResize: getWithDefault(this, 'autoResize', true),
      height: getWithDefault(this, 'height', '500'),
      header: getWithDefault(this, 'header', 'show'),
      ssl: getWithDefault(this, 'ssl', true),
      // static
      async: true,
      host: 'wufoo.com'
    };

    wufooForm.initialize(options);

    // override wufoo's method to inject the form into the component container
    let formTarget = get(this, 'formTarget');
    wufooForm.display = function() {
      if (this.async) {
        document.querySelector(
          formTarget
        ).innerHTML = this.generateFrameMarkup();
      } else {
        document.write(this.generateFrameMarkup());
      }

      window.postMessage ||
        this.addEvent(
          document.querySelector(formTarget),
          'load',
          this.bindMethod(this.addResizeScript, this)
        );
    };
    wufooForm.display();
    set(this, 'isLoading', false);
  }
});
