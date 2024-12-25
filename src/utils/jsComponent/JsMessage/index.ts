import { Message, MessageConfig } from '@arco-design/web-vue';
import { AppContext } from 'vue';

const baseMessageConfig: () => MessageConfig = () => {
  return {
    content: '',
    duration: 5000, // 持续时间
    resetOnHover: true, // 鼠标悬浮时是否不关闭
  };
}

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'normal';

const createTypeMessage = (type: MessageType) => {
  return (config: string | MessageConfig, appContext?: AppContext) => {
    const messageConfig: MessageConfig = baseMessageConfig();
    if (typeof config === 'string') {
      Object.assign(messageConfig, { content: config });
    } else {
      Object.assign(messageConfig, config);
    }
    Message[type](messageConfig, appContext);
  }
}

const createJsMessage = () => ({
  info: createTypeMessage('info'),
  success: createTypeMessage('success'),
  warning: createTypeMessage('warning'),
  error: createTypeMessage('error'),
  loading: createTypeMessage('loading'),
  normal: createTypeMessage('normal'),
});

const JsMessage = createJsMessage();
export default JsMessage;