/**
 * Makes Tracker.autorun() computations automatically stop when the component is
 * destroyed.
 */

import { Tracker } from 'meteor/tracker';
import { current_component } from 'svelte/internal';

_autorun = Tracker.autorun;
Tracker.autorun = function autorun() {
  const computation = _autorun.apply(this, arguments);
  if (current_component) {
    current_component.$$.on_destroy.push(computation.stop.bind(computation));
  }
  return computation;
};
