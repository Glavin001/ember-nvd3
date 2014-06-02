[Ember-NVD3](https://github.com/Glavin001/ember-nvd3)
==========

> A [reusable chart library for D3.js](http://nvd3.org/) as [Ember components](http://emberjs.com/guides/components/).

**Live demo**: http://glavin001.github.io/ember-nvd3/dist/

-----

## Usage

```bash
bower install --save ember-nvd3
```

### Include D3 amd NVD3 styles and scripts

```html
<!-- NVD3 Styles -->
<link rel="stylesheet" href="bower_components/nvd3/nv.d3.min.css">
<!-- D3 Script -->
<script src="bower_components/d3/d3.min.js"></script>
<!-- NVD3 Script -->
<script src="bower_components/nvd3/nv.d3.min.js"></script>
```

### Include Ember-NVD3 styles and scripts

```html
<!-- Ember NVD3 Script -->
<script src="bower_components/ember-nvd3/build/ember-nvd3.js"></script>
```

## Developing

After cloning repository, install library dependencies.

```bash
npm install
bower install
```

Then build with `grunt`.

```bash
grunt serve
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.  
Clone this JS Bin from http://jsbin.com/kawur/1/edit and submit it with your bug reports.

### Documentation

Uses [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) to create documentation. To create simple run
```bash
grunt docs
```
