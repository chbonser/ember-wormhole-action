import Ember from 'ember';
import WormholeActionableMixin from 'ember-wormhole-action/mixins/wormhole-actionable';
import { module, test } from 'qunit';

module('Unit | Mixin | wormhole actionable', {
  needs: ['service:wormhole-action']
});

test('it does nothing when wormholeActionableActions is not specified', function(assert) {
  let WormholeActionableObject = Ember.Object.extend(WormholeActionableMixin);
  let subject = WormholeActionableObject.create();
  assert.ok(subject);
});


test('it registers action with the service', function(assert) {
  // Stub the service injection for testing
  WormholeActionableMixin.reopen({
    wormholeAction: {
      register: function(name) {
        assert.equal('openObject', name, 'registers the correct action name');
      }
    }
  });

  let WormholeActionableObject = Ember.Object.extend(WormholeActionableMixin, {
    wormholeActionableActions: [
      {action: 'open', name: 'openObject'}
    ],
    actions: {
      open() {
      }
    }
  });
  let subject = WormholeActionableObject.create();
  assert.ok(subject);
});

test('asserts an error if action is not found on the component', function(assert) {
  let WormholeActionableObject = Ember.Object.extend(WormholeActionableMixin, {
    wormholeActionableActions: [
      {action: 'open', name: 'openObject'}
    ]
  });
  assert.throws(() => { WormholeActionableObject.create(); });
});
