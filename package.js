Package.describe({
  name: 'rdb:svelte-meteor-data',
  version: '0.0.1',
  summary: 'Reactively track Meteor data inside Svelt components',
  git: 'https://github.com/rdb/svelte-meteor-data',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8');
  api.use('ecmascript');
  api.use('tracker');
  api.use('svelte:compiler@3.16.4_1');
  api.use('reactive-var', {weak: true});
  api.use('mongo', {weak: true});
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('rdb:svelte-meteor-data');
  api.use('reactive-var');
  api.mainModule('reactive-var.tests.js');
});
