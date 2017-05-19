import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('wormhole-action', 'Integration | Helper | wormhole-action', {
  integration: true
});

test('it calls the registered action', function(assert) {
  // Create a stripped down implemenation for testing
  const MockService = Ember.Service.extend({
    sendAction(actionName) {
      assert.equal('doIt', actionName, 'passes action name to the service');
      return {
        action: function(a, b, c) {
          assert.equal(1, a, 'passes expected argument to the action');
          assert.equal(2, b, 'passes expected argument to the action');
          assert.equal(3, c, 'passes expected argument to the action');
        }
      };
    }
  });

  this.register('service:wormhole-action', MockService);

  this.render(hbs`<button onClick={{wormhole-action 'doIt' 1 2 3}}>button</button>`);

  this.$('button').click();
});

