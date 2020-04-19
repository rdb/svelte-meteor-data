/**
 * This function wraps a reactive Meteor computation as a Svelte store.
 */

export default function useTracker(reactiveFn) {
  return {
    subscribe(set) {
      const computation = Tracker.autorun(() => set(reactiveFn()));
      return computation.stop.bind(computation);
    },
  };
};
