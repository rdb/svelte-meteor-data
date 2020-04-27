# Changelog

## 0.2.2
- Support `Tracker.autorun()` inside `onMount()`

## 0.2.1
- Fix bug with nested `Tracker.autorun()` inside `Tracker.nonreactive()`

## 0.2.0
- Support for using `Tracker.autorun()` inside a Svelte `$:` computation
- `useTracker()` is wrapped inside a `Tracker.nonreactive()`

## 0.1.0
- Added `useSession()` for tracking Meteor Session variables

## 0.0.1
- Initial release
