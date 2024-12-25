const fs = require('fs')
const path = require('path')

const get_modules = () => {
  // 读取 src/components/ayun 目录下的一级目录，让用户选择可以准备打包的组件
  const componentsDir = path.resolve(__dirname, '../../src/components/ayun');
  const components = fs.readdirSync(componentsDir);
  // 要选择的选项列表
  const options = components.map(item => `${item}`);
  return options;
}

module.exports = get_modules;