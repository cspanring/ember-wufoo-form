# ember-wufoo-form

A thin wrapper around [Wufoo Forms](http://www.wufoo.com), to make integration in Ember Apps easier.

## Installation

Install this addon with Ember CLI:

    ember install ember-wufoo-form

## Usage and Configuration

Add the component to one of your templates:

    {{wufoo-form formId="MY_FORM_ID"}}

It will inject a script tag to load Wufoo's JavaScript library and an iframe that will display the form.

The `formId` can be found on the "Share a link to your form" page in the Wufoo form admin.

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

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
