# ember-wufoo-form


[![Build Status](https://travis-ci.org/cspanring/ember-wufoo-form.svg?branch=master)](https://travis-ci.org/cspanring/ember-wufoo-form)
[![Ember Observer Score](https://emberobserver.com/badges/ember-wufoo-form.svg)](https://emberobserver.com/addons/ember-wufoo-form)

A thin wrapper around [Wufoo Forms](http://www.wufoo.com), to make integration in Ember Apps easier.

## Installation

Install this addon with Ember CLI:

    ember install ember-wufoo-form

## Usage and Configuration

Add the component to one of your templates:

    {{wufoo-form
      formId="FORM_ID"
      target="FORM_TARGET_SELECTOR"
    }}

It will inject a script tag to load Wufoo's JavaScript library, which will add an iframe to display the form.

The required `formId` can be found on the "Share a link to your form" page in the Wufoo form admin.

If an (optional) `target` attribute is provided, the form will render into given selector on the page.

## Collaboration

### Installation

* `git clone <repository-url>` this repository
* `cd ember-wufoo-form`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
