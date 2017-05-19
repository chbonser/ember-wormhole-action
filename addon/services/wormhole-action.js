import Ember from 'ember';

const { assert } = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this._actions = {};
  },
  _actions: null,
  register(actionName, action, context) {
    if(this._actions[actionName]) {
      assert(`[service:wormhole-action] An action named, ${actionName}, was already registered`);
    }

    this._actions[actionName] = {action: action, context: context};
  },
  unregister(actionName) {
    assert(`[service:wormhole-action#unregister] An action named, ${actionName}, could not be found`, this._actions[actionName]);
    delete this._actions[actionName];
  },
  sendAction(actionName) {
    let action = this._actions[actionName];
    assert(`[service:wormhole-action#sendAction] An action named, ${actionName}, could not be found`, action);
    return action;
  }
});
