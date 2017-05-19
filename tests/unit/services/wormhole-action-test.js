import { moduleFor, test } from 'ember-qunit';

moduleFor('service:wormhole-action', 'Unit | Service | wormhole action');

test('register a new action', function(assert) {
  let service = this.subject();
  let action = () => {};
  service.register('justDoIt', action, this);
  assert.ok(service._actions['justDoIt'], 'action is registered');
  assert.equal(service._actions['justDoIt'].action, action, 'function is stored');
  assert.equal(service._actions['justDoIt'].context, this, 'context is stored');
});

test('register a duplicate action throws an error', function(assert) {
  let service = this.subject();
  let action = () => {};
  service.register('justDoIt', action, this);
  assert.ok(service);
  assert.throws(() => { service.register('justDoIt', action, this); });
});

test('unregister an action', function(assert) {
  let service = this.subject();
  service.register('justDoIt', () => {}, this);
  service.unregister('justDoIt');
  assert.deepEqual(service._actions, {}, 'action is unregistered');
});

test('unregister an unknown action throws an error', function(assert) {
  let service = this.subject();
  assert.throws(() => { service.unregister('justDoIt'); });
});

test('sendAction returns the expected object', function(assert) {
  let service = this.subject();
  let action = () => {};
  service.register('justDoIt', action, this);
  assert.deepEqual(service.sendAction('justDoIt'), {action: action, context: this});
});

test('sendAction for an unknown action throws an error', function(assert) {
  let service = this.subject();
  assert.throws(() => { service.sendAction('justDoIt'); });
});
