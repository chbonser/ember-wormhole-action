import Ember from 'ember';
import WormholeActionableMixin from 'ember-wormhole-action/mixins/wormhole-actionable';
import { module, test } from 'qunit';

module('Unit | Mixin | wormhole actionable');

// Replace this with your real tests.
test('it works', function(assert) {
  let WormholeActionableObject = Ember.Object.extend(WormholeActionableMixin);
  let subject = WormholeActionableObject.create();
  assert.ok(subject);
});
