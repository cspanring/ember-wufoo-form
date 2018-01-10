import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wufoo-form', 'Integration | Component | wufoo form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wufoo-form formId='AbCd1234' userName='myaccount'}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'Fill out my online form.'
  );
  assert.ok(
    this.$()
      .find('a')
      .attr('href')
      .indexOf('AbCd1234') > -1
  );
});
