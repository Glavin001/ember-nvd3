require('build/temp/template');

Ember.NVD3 = Ember.Namespace.create();
Ember.NVD3.VERSION = '0.0.1';

Ember.libraries.register('Ember NVD3', Ember.NVD3.VERSION);

require('lib/components/*');
