const readline = require('readline');

const select_package = ({
   optionsList,
   prefix = '',
   tips = ''
}) => {
   return new Promise((resolve, reject) => {
      let selected = 0; // 当前选中的选项索引
      // 创建 readline 接口
      const rl = readline.createInterface({
         input: process.stdin,
         output: process.stdout
      });
      // 隐藏光标
      readline.cursorTo(process.stdout, 0, 0);
      readline.emitKeypressEvents(process.stdin);
      process.stdin.setRawMode(true);
      // 函数：渲染选项列表
      const renderOptions = () => {
         console.clear(); // 清屏
         // 蓝色文字提示 ===== 请选择需要打包的组件：=======
         console.log('\x1b[36m%s\x1b[0m', `\n\n===== ${tips}：=======\n`);
         optionsList.forEach((option, index) => {
            if (index === selected) {
               console.log(`\x1b[32m * ${prefix}${option}\x1b[0m`); // 绿色高亮显示选中的选项
            } else {
               console.log(`   ${option}`);
            }
         });
      }
      // 初次渲染选项
      renderOptions();
      // 捕获键盘输入
      process.stdin.on('keypress', (str, key) => {
         if (key.name === 'up') {
            // 向上移动
            selected = (selected - 1 + optionsList.length) % optionsList.length;
         } else if (key.name === 'down') {
            // 向下移动
            selected = (selected + 1) % optionsList.length;
         } else if (key.name === 'return') {
            // 按下回车键，选择完成
            console.clear();
            resolve(`${optionsList[selected]}`)
            rl.close();
         } else if (key.name === 'escape' || key.ctrl && key.name === 'c') {
            // 按下 Esc 或 Ctrl+C，退出
            console.clear();
            rl.close();
            reject()
            process.exit(0);
         }
         renderOptions(); // 更新显示
      });
   })
}

module.exports = select_package;