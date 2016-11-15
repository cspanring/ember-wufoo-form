/*jshint -W030 */
/*global WufooForm */

import Ember from 'ember';
import layout from '../templates/components/wufoo-form';

const {
  get,
  computed,
} = Ember;

export default Ember.Component.extend({
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

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'target')) {
      let target = get(this, 'target');
      // move content to optional target node
      this.$('.wufoo-form-container').appendTo(target);
    }

    // don't run wufoo iframe content in tests
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    if (config.environment !== 'test') {
      this.initWufoo();
    }
  },

  initWufoo() {
    // loosely based on Wufoo's form embed code
    let t = 'script';
    let s = document.createElement(t);
    s.src = `${document.location.protocol}//www.wufoo.com/scripts/embed/form.js`;

    let formId = get(this, 'formId');
    let formTarget = get(this, 'formTarget');
    s.onload = s.onreadystatechange = function() {
      let rs = this.readyState;

      if (rs) {
        if (rs !== 'complete') {
          if (rs !== 'loaded') {
            return;
          }
        }
      }

      let wufooForm = new WufooForm();

      let options = {
        'userName':'courbanize',
        'formHash':formId,
        'autoResize':true,
        'height':'443',
        'async':true,
        'host':'wufoo.com',
        'header':'show',
        'ssl':true
      };

      wufooForm.initialize(options);

      // override wufoo's method to inject the form into the component container
      wufooForm.display = function() {
        if (this.async) {
          document.querySelector(formTarget).innerHTML = this.generateFrameMarkup();
        }
        else {
          document.write(this.generateFrameMarkup());
        }

        window.postMessage || this.addEvent(document.querySelector(formTarget), "load", this.bindMethod(this.addResizeScript, this));
      };

      wufooForm.display();
    };

    let formContainer = document.querySelector(get(this, 'formTarget'));
    let parentNode = document.querySelector(get(this, 'parentSelector'));

    Ember.assert('Wufoo form requires a valid DOM target node to be inserted into.', formContainer && parentNode);

    if (formContainer && parentNode) {
      parentNode.insertBefore(s, formContainer);
    }
  }
});
