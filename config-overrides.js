const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireMobX(config, env);
    config = rewireLess.withLoaderOptions({
        // modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);
    return config;
};