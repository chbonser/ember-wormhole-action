# Ember Wormhole Action

Nearly always state in an Ember application should be managed by following the 'data down,
actions up' paradigm.  However there are some rare cases where
it is reasonable to send actions sideways.  Ember wormhole
action provides provides a clean interface for doing so.

## Installation

`ember install ember-wormhole-action`

## Usage

1. Make a component wormhole actionable using `mixin:wormhole-actionable`
2. Use `helper:wormhole-action` to send an action sideways

### `mixin:wormhole-actionable`

To make an action on a component wormhole actionable (1) mixin the
`wormhole-actionable` mixin and (2) define a `wormholeActionableActions`
property on the class.

`wormholeActionableActions` should be an array of POJO's each of which
defines `action` and `name` properties.
* `action` is the action defined in the component
* `name` is what becomes 'wormhole actionable' and should be less generically
  named than `action`

```javascript
import Ember from 'ember';
import WormholeActionable from 'ember-wormhole-action/mixins/wormhole-actionable';

export default Ember.Component.extend(WormholeActionable, {
  wormholeActionableActions: [
    {action: 'open', name: 'openDrawer'}
  ],

  actions: {
    open(item) {
      // ...
    }
  }
});
```

### `helper:wormhole-action`

Use the helper to call a wormhole actionable action.  Note that
`wormhole-action` will accept params to pass to the action.

```hbs
<button onClick={{wormhole-action 'openDrawer' item}}>Open</button>
```
