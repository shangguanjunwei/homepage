const get_modules = require('./utils/get_modules.cjs')
const select_package = require('./utils/select_package.cjs')
const build = require('./utils/build.cjs')
const config = require('./config/index.cjs')
const git_push = require('./utils/git_push.cjs')

const init = async () => {
  try {
    const selected_module = await select_package({
      optionsList: get_modules(),
      prefix: config.package_name_prefix,
      tips: '第一步：请选择需要打包的组件'
    })
    const selected_version_changeMode = await select_package({
      optionsList: ['major', 'minor', 'patch'],
      tips: '第二步：请选择版本号变更方式'
    })
    // 构建并推送到npm 
    const version = await build(selected_module, selected_version_changeMode)
    // 处理git提交
    version && await git_push(version)
    console.log('流程执行结束')
  } catch (error) {
    console.log(error.message || '流程执行失败')
    process.exit(1)
  }
  process.exit(0)
}
init();
