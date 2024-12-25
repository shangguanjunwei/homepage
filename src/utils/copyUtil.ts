import ClipboardJS from 'clipboard';

// 复制指定文本
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    // 创建一个 a 标签
    const btn = document.createElement('button');
    btn.style.display = 'none';
    document.body.appendChild(btn);
    const clipboard = new ClipboardJS(btn, { text: () => text });
    clipboard.on('success', (e) => {
      resolve(e);
      clipboard.destroy();
      document.body.removeChild(btn);
    });
    clipboard.on('error', (e) => {
      reject(e);
      clipboard.destroy();
      document.body.removeChild(btn);
    });
    btn.click();
  });
};