import Ember from 'ember';

const { Helper, inject } = Ember;

export default Helper.extend({
  wormholeActionService: inject.service('wormhole-action'),
  compute([actionName, ...params]) {
    let action = this.get('wormholeActionService').sendAction(actionName);
    return () => {
      action.action(...params);
    };
  }
});
