import Ember from 'ember';

const { assert, inject, isPresent } = Ember;

export default Ember.Mixin.create({
  wormholeAction: inject.service(),

  // Override in mixed in class
  wormholeActionableActions: [],

  init() {
    this._super(...arguments);
    this.get('wormholeActionableActions').forEach( actionable => {
      let action = this.get(`actions.${actionable.action}`);
      assert(`An action named, ${actionable.action}, could not be found in ${this.toString()}`, isPresent(action));

      let actionClosure = (...params) => {
        return action.apply(this, params);
      };
      this.get('wormholeAction').register(actionable.name, actionClosure, this);
    });
  },

  willDestroyElement() {
    this.get('wormholeActionableActions').forEach( actionable => {
      this.get('wormholeAction').unregister(actionable.name);
    });
    this._super(...arguments);
  },
});
