const { spawnSync } = require('child_process')
const select_package = require('./select_package.cjs')

const git_push = async (version) => {
  // 选择是否走自动 git 提交流程
  const isAutoHandleGit = await select_package({
    optionsList: ['yes', 'no'],
    tips: '是否处理 git ？'
  })
  if (isAutoHandleGit === 'no') return
  // 运行同步脚本 运行 git add . && git commit -m 'feat: build' && git push
  const pushProcess = spawnSync('git', ['add', '.'], { stdio: 'inherit' });
  if (pushProcess.error) {
    throw new Error(`git add 失败: ${pushProcess.error}`);
  } else if (pushProcess.status !== 0) {
    throw new Error(`git add 失败: ${pushProcess.status}`);
  }
  // 选择git提交原因
  const answer = await select_package({
    optionsList: [
      `${version}-feat：新功能`,
      `${version}-fix：修复bug`,
      `${version}-docs：文档修改`,
      `${version}-style：代码格式修改`,
      `${version}-refactor：代码重构`,
      `${version}-perf：性能优化`,
      `${version}-chore：构建过程或辅助工具的变动`,
      `${version}-revert：回滚`,
    ],
    tips: '请选择 git commit 内容'
  })
  const commitProcess = spawnSync('git', ['commit', '-m', answer], { stdio: 'inherit' });
  if (commitProcess.error) {
    throw new Error(`git commit 失败: ${commitProcess.error}`);
  } else if (commitProcess.status !== 0) {
    throw new Error(`git commit 失败: ${commitProcess.status}`);
  }
  console.log('请手动处理 git push')
  return;
  // const pushProcess2 = spawnSync('git', ['push'], { stdio: 'inherit' });
  // if (pushProcess2.error) {
  //   throw new Error(`git push 失败: ${pushProcess2.error}`);
  // } else if (pushProcess2.status !== 0) {
  //   throw new Error(`git push 失败: ${pushProcess2.status}`);
  // }
}

module.exports = git_push;