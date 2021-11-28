# `@ahangl/ui5-task-babel`

> Transpile your code using babel with this custom task for the [ui5-builder](https://github.com/SAP/ui5-builder).

## Install
> Unfortunately, the task is only available via GitHub packages at the moment!

In the same directory as your `package.json` file, create or edit an `.npmrc` file to include a line specifying the GitHub packages URL:
```
@ahangl:registry=https://npm.pkg.github.com
```

Then you can install the task using `npm`:
```sh
npm install @ahangl/ui5-task-babel --save-dev
```

>Note: More information about using npm with GitHub packages can be found in the [GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## Usage

1. Define the dependency in `$yourapp/package.json`:
```json
"devDependencies": {
  // ...
  "@ahangl/ui5-task-babel": "*",
  // ...
},
"ui5": {
  "dependencies": [
    // ...
    "@ahangl/ui5-task-babel",
    // ...
  ]
}
```

> Note: devDependencies are not recognized by the UI5 tooling, hence they need to be listed in the `ui5 > dependencies` array. Once you use the `ui5 > dependencies` array, you need to list `all` UI5 tooling relevant dependencies there.


2. Configure `$yourapp/ui5.yaml`:
```yaml
builder:
  customTasks:
  - name: ui5-task-babel
    afterTask: replaceVersion
    configuration:
      # debug: true
```

## Configuration Options

The task accepts the following `configuration` options:

| name | description | default | examples |
| ---- | ----------- | ------- | -------- |
| `debug` | if `true`, verbose logging is enabled | `false` | `true`, `false` |
| `exclude` | array of paths inside `$yourapp/webapp/` to exclude from transpilation | `[]` | `["test/", "localService/"]` |
| `usePreset` | if `true`, the preset babel config is used | `true` | `true`, `false` |

### Preset Babel Config

The task uses the following babel config if `usePreset` is set to true:
```js
let babelConfig = {
    presets: [['@babel/preset-env', { targets: { browsers: "last 2 versions, ie 10-11" } }]],
    plugins: [['babel-plugin-transform-async-to-promises', { inlineHelpers: true }]]
};
```

### Custom Babel Config

> Note: when using the custom option you have to install and manage your configuration and presets within your project according to your needs!

In the same directory as your `package.json` file, create a babel config file, e.g. `babel.config.js`. You can learn more about babel config files [here](https://babeljs.io/docs/en/config-files).

As of Babel 7.4.0, [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) has been deprecated in favor of directly including:
- [core-js](https://github.com/zloirock/core-js) (to polyfill ECMAScript features)
- [regenerator-runtime/runtime](https://github.com/facebook/regenerator/tree/master/packages/runtime) (needed to use transpiled generator functions)

Use `npm` to install both packages as dependencies
```sh
npm install core-js-bundle regenerator-runtime
```

Then manually add the packages as ui5 dependencies in your project's `package.json`:
```json
{
  "dependencies": {
    // ...
    "core-js-bundle": "*",
    "regenerator-runtime": "*"
    // ...
  },
  "ui5": {
    "dependencies": [
    // ...
    "core-js-bundle",
    "regenerator-runtime"
    // ...
    ]
  }
}
```

Next both must be defined in `ui5.yaml` as a `project-shim` to be consumed:
```yml
# ui5.yaml app content
---
specVersion: '2.1'
kind: extension
type: project-shim
metadata:
    name: thirdparty
shims:
  configurations:
    core-js-bundle:
      specVersion: '2.1'
      type: module
      metadata:
        name: core-js-bundle
      resources:
        configuration:
          paths:
            /resources/core-js-bundle/: ''
    regenerator-runtime:
      specVersion: '2.1'
      type: module
      metadata:
        name: regenerator-runtime
      resources:
        configuration:
          paths:
            /resources/regenerator-runtime/: ''
```

Finally both must be included in `webapp/manifest.js` as `resources`:
```json
{
  "sap.ui5": {
    "resources": {
      "js": [
        {
          "uri": "/resources/core-js-bundle/minified.js"
        },
        {
          "uri": "/resources/regenerator-runtime/runtime.js"
        }
      ]
    }
  }
}
```

## License
[Apache-2.0](LICENSE)

