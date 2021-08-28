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

### Configuration Options

The task accepts the following `configuration` options:

| name | description | default | examples |
| ---- | ----------- | ------- | -------- |
| `debug` | if `true`, verbose logging is enabled | `false` | `true`, `false` |


## License
[Apache-2.0](LICENSE)

