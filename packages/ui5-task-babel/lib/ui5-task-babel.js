
'use strict'

const babel = require('@babel/core')
const log = require('@ui5/logger').getLogger('builder:customtask:babel')

/**
 * Custom task for transpiling code using babel.
 *
 * @param {object} parameters Parameters
 * @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {module:@ui5/fs.AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.projectNamespace] Project namespace if available
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been written
 */
module.exports = async function ({ workspace, dependencies, options }) {
    let resources = await workspace.byGlob('/**/*.js')

    const babelConfig = {
        presets: [['@babel/preset-env', { targets: { browsers: "last 2 versions, ie 10-11" } }]],
        plugins: [['babel-plugin-transform-async-to-promises', { inlineHelpers: true }]]
    }

    const transformCode = async resource => {
        let source = await resource.getString()
        let { code } = babel.transformSync(source, babelConfig)
        resource.setString(code)
        return resource
    }

    const transformedResources = await Promise.all(resources.map(resource => transformCode(resource)))

    await Promise.all(transformedResources.map(resource => {
        return workspace.write(resource)
    }))
};
