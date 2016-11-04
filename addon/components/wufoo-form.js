/*jshint -W030 */
/*global WufooForm */

import Ember from 'ember';
import layout from '../templates/components/wufoo-form';

const { get } = Ember;

export default Ember.Component.extend({
  layout,

  classNames: ['wufoo-form'],

  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'wufoo-form',

  didInsertElement() {
    this._super(...arguments);

    // don't run wufoo iframe content in tests, causing problems
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    if (config.environment !== 'test') {
      this.initWufoo();
    }
  },

  initWufoo() {
    let formId = get(this, 'formId');

    // based on Wufoo form embed code
    let d = document;
    let t = 'script';
    let s = d.createElement(t);
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

    s.src = `${d.location.protocol}//www.wufoo.com/scripts/embed/form.js`;

    let elementId = get(this, 'elementId');
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

      wufooForm.initialize(options);

      // override wufoo's method to inject the form into the component container
      wufooForm.display = function() {

        if (this.async) {
          document.getElementById(elementId).innerHTML = this.generateFrameMarkup();
        }
        else {
          document.write(this.generateFrameMarkup());
        }

        window.postMessage || this.addEvent(document.getElementById(elementId), "load", this.bindMethod(this.addResizeScript, this));
      };

      wufooForm.display();
    };

    let scr = d.getElementsByTagName(t)[0];
    let par = scr.parentNode;
    par.insertBefore(s, scr);
  },

});
