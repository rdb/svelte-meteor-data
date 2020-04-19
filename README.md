# `svelte-meteor-data`

This package integrates the [Svelte](https://svelte.dev) UI framework with
Meteor's Tracker system.  It makes it easy to write Svelte components which
react automatically to changes in Meteor's data layer.

This package is still experimental.  Use at your peril.

## Installation

To add Svelte to your Meteor app, run:

```bash
meteor add svelte:compiler rdb:svelte-meteor-data
meteor npm install --save svelte@3.16.4
```

## Usage

Unlike in Blaze, Svelte does not automatically become aware of changes to Meteor
state, even inside `$:` blocks.  This package provides some features that enable
Svelte to become aware of such changes.

### Reactive computations with `useTracker`

The `useTracker()` function can be used to expose any reactive computation as a
Svelte store.  You need only pass a callable, which will be run the first time
it is used and then every time the computed value changes.  The changed value is
automatically made available to Svelte.

For example, this makes the current Meteor user available in a component, and
causes Svelte to update the appropriate element automatically when the current
user changes:

```svelte
<script>
  const currentUser = useTracker(() => Meteor.user());
</script>

<h1>Welcome {$currentUser.username}!</h1>
```

You can even mix Meteor reactivity with Svelte reactivity:

```svelte
<script>
  let selectedUserId;

  $: selectedUser = useTracker(() => selectedUserId);
</script>

<p>Selected {$selectedUser.username}</p>
```

### Cursors

While it's possible to use queries with `useTracker(() => query.fetch())`, this
package supports a more convenient method, directly treating the cursor as a
Svelte store:

```svelte
<script>
  export let fruitColor = 'blue';

  $: fruits = Fruits.find({color: fruitColor});
</script>

<p>Showing {$fruits.length} {fruitColor}-colored fruits:</p>
<ul>
  {#each $fruits as fruit}
    <li>{fruit.name}</li>
  {/each}
</ul>
```

### Subscriptions

You can safely use `Meteor.subscribe` in your components without worrying about
clean-up.  The subscription will be stopped automatically when the component is
destroyed.

As an added feature, you can use a subscription handle in an `{#await}` block:

```svelte
{#await Meteor.subscribe('todos')}
  <p>Loading todos…</p>
{:else}
  <TodoList />
{/if}
```

### `Tracker.autorun`

It is possible to use `Tracker.autorun()` to have code automatically be re-run
when its Meteor dependencies change.  It will stop running when the component is
destroyed.  This will work fine for top-level computations that do not depend on
any dynamic Svelte state, such as this example:

```svelte
<script>
  let currentUser;

  Tracker.autorun(() => {
    currentUser = Meteor.user();
  });
</script>
```

However, it will not automatically detect changes to Svelte state, nor can I
guarantee that it will work well with `$:`, so I highly recommend the use of
`useTracker` instead.

### ReactiveVar

A Meteor ReactiveVar will work seamlessly as a Svelte store, and can be accessed
and bound like any writable store using the `$` operator:

```svelte
<script>
  import { ReactiveVar } from 'meteor/reactive-var';

  const store = new ReactiveVar("initial");
</script>

<input type="text" bind:value={$store} />

<p>Value is {$store}</p>
```
