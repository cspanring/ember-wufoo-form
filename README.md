# ember-wufoo-form

[![Build Status](https://travis-ci.org/cspanring/ember-wufoo-form.svg?branch=master)](https://travis-ci.org/cspanring/ember-wufoo-form)
[![Ember Observer Score](https://emberobserver.com/badges/ember-wufoo-form.svg)](https://emberobserver.com/addons/ember-wufoo-form)

A thin wrapper around [Wufoo Forms](http://www.wufoo.com), to make integration in Ember Apps easier.

## Installation

Install this addon with Ember CLI:

    ember install ember-wufoo-form

## Usage

The `wufoo-form` component accepts a set of required and optional attributes:

    {{wufoo-form
      // required
      formId="<wufoo form id>"
      userName="<wufoo username>"

      // optional
      target="<DOM selector where to render the form to"

      // optional parameters, proxied from wufoo embed library
      autoResize: <default true>,
      height: <default '500'>,
      header: <default 'show'>,
      ssl: <default true>,
    }}

The component will inject a script tag to load Wufoo's JavaScript embed library, which will add an iframe to display the form.

The required `formId` can be found on the "Share a link to your form" page in the Wufoo form admin.

## Collaboration

### Installation

* `git clone <repository-url>` this repository
* `cd ember-wufoo-form`
* `npm install`

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
