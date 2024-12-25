const fs = require('fs');
const path = require('path');
const config = require('../config/index.cjs');
const get_version = require('./get_version.cjs');
const { spawnSync } = require('child_process');
const select_package = require('./select_package.cjs');

const cache_dir = path.resolve(__dirname, `../.cache`);
const cache_orgin_package_json_file_url = `${cache_dir}/package.json`;
const orgin_read_me_file_url = path.resolve(__dirname, `../../README.md`);
const cache_update_module_package_json_file_url = `${cache_dir}/update_package_config.json`;

const reset = async () => {
  console.log('开始还原文件')
  if (fs.existsSync(cache_orgin_package_json_file_url)) {
    fs.renameSync(cache_orgin_package_json_file_url, path.resolve(__dirname, '../../package.json'));
  }
  if (fs.existsSync(`${cache_dir}/README.md`)) {
    fs.renameSync(`${cache_dir}/README.md`, orgin_read_me_file_url);
  }
  if (fs.existsSync(`${cache_dir}/is_build.json`)) {
    fs.unlinkSync(`${cache_dir}/is_build.json`);
  }
  if (fs.existsSync(`${cache_dir}/update_package_config.json`)) {
    fs.unlinkSync(`${cache_dir}/update_package_config.json`);
  }
  // 删除 cache 文件夹及其下的所有文件
  if (fs.existsSync(cache_dir)) {
    fs.rmdirSync(cache_dir, { recursive: true });
  }
  console.log('文件还原完成')
}

const npmPublish = async () => {
  const answer = await select_package({
    optionsList: ['yes', 'no'],
    tips: '是否发布到 npm'
  })
  if (answer === 'no') {
    console.log('取消发布任务')
    await reset();
    return false;
  }
  console.log('开始发布到 npm')
  const publishProcess = spawnSync('npm', ['publish'], { stdio: 'inherit' });
  if (publishProcess.error) {
    await reset();
    throw new Error(`发布到 npm 失败: ${publishProcess.error}`);
  } else if (publishProcess.status !== 0) {
    await reset();
    throw new Error(`发布到 npm 失败: ${publishProcess.status}`);
  }
  console.log('发布到 npm 完成')
  return true;
}

const build = async (package_url, selected_version_changeMode) => {
  console.log('准备打包文件...')
  const orgin_package_json_file_url = path.resolve(__dirname, '../../package.json');
  const module_package_json_file_url = path.resolve(__dirname, `../../src/components/ayun/${package_url}/publish_config/package_config.json`);
  // 验证文件地址是否存在
  if (!fs.existsSync(orgin_package_json_file_url)) {
    console.error('package.json 文件不存在');
    return;
  }
  if (!fs.existsSync(module_package_json_file_url)) {
    console.error('package_config.json 文件不存在');
    return;
  }

  // 移动文件,如果不存在则创建
  if (!fs.existsSync(cache_dir)) {
    fs.mkdirSync(cache_dir);
  }
  fs.renameSync(orgin_package_json_file_url, cache_orgin_package_json_file_url);
  // README 文件处理
  const module_read_me_file_url = path.resolve(__dirname, `../../src/components/ayun/${package_url}/publish_config/README.md`);
  if (fs.existsSync(orgin_read_me_file_url) && fs.existsSync(module_read_me_file_url)) {
    fs.renameSync(orgin_read_me_file_url, `${cache_dir}/README.md`);
    // 将 module_read_me_file_url 复制到 orgin_read_me_file_url
    fs.copyFileSync(module_read_me_file_url, orgin_read_me_file_url);
  } else {
    console.error('README.md 文件不存在，将继续执行打包操作');
  }
  // 读取 package.json 文件
  const orgin_package_json = JSON.parse(fs.readFileSync(cache_orgin_package_json_file_url, 'utf-8'));
  const module_package_json = JSON.parse(fs.readFileSync(module_package_json_file_url, 'utf-8'));

  const version = get_version(module_package_json.version, selected_version_changeMode);
  const update_module_package_content = { ...module_package_json, version }
  fs.writeFileSync(cache_update_module_package_json_file_url, JSON.stringify(update_module_package_content, null, 2));
  // 在 orgin_package_json_file_url 下创建新的 package.json 文件
  fs.writeFileSync(orgin_package_json_file_url, JSON.stringify({
    ...orgin_package_json,
    ...update_module_package_content,
    name: `${config.package_name_prefix}${package_url}`,
    main: `dist/${config.package_name_prefix}${package_url}.umd.js`,
    module: `dist/${config.package_name_prefix}${package_url}.es.js`,
    publishConfig: {
      access: "public"
    },
  }, null, 2));
  // 在 cache_dir 下新建一个 is_build.json 文件
  fs.writeFileSync(`${cache_dir}/is_build.json`, JSON.stringify({
    is_build: true,
    name: `${config.package_name_prefix}${package_url}`,
    entry: path.resolve(__dirname, `../../src/components/ayun/${package_url}/publish_config/index.ts`),
    package_name_prefix: config.package_name_prefix,
    package_url,
  }, null, 2));
  console.log('打包文件准备完成...')

  // 用一个新的线程执行命令 npm run build 并等待该线程执行完成，打印出222
  const buildProcess = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (buildProcess.error) {
    await reset();
    throw new Error(`构建项目失败: ${buildProcess.error}`);
  } else if (buildProcess.status !== 0) {
    await reset();
    throw new Error(`构建项目失败: ${buildProcess.status}`);
  }
  // 开始推送到 npm
  const flag = await npmPublish();
  if (flag) {
    // 推送成功后，将 cache_update_module_package_json_file_url 内容写入 module_package_json_file_url
    fs.writeFileSync(module_package_json_file_url, JSON.stringify(update_module_package_content, null, 2));
    // 清除数据
    await reset();
    return version;
  }
  return;
}
module.exports = build;