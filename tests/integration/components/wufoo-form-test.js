import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wufoo-form', 'Integration | Component | wufoo form', {
  integration: true
});

test('it shows fallback link', function(assert) {
  // load form with fallback content isShowing,
  // all other functionality depends on successful loading of 3rd party library
  this.render(
    hbs`{{wufoo-form formId='AbCd1234' userName='myaccount' isShowingFallback=true}}`
  );

  assert.equal(
    this.$()
      .text()
      .trim(),
    'Please fill out my online form.'
  );
  assert.ok(
    this.$()
      .find('a')
      .attr('href')
      .indexOf('AbCd1234') > -1
  );
});
