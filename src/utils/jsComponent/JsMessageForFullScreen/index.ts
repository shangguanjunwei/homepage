import { h, render } from 'vue';
import type { MessageConfig } from '@arco-design/web-vue';
import {
  IconInfoCircleFill,
  IconCheckCircleFill,
  IconExclamationCircleFill,
  IconCloseCircleFill,
  IconLoading,
  IconClose,
} from '@arco-design/web-vue/es/icon';
import JsFullScreen from '../JsFullScreen';
import { nanoid } from 'nanoid';
import JsMessage from '../JsMessage';
type MessagePosition = 'top' | 'bottom' | undefined;

interface JsMessageConfig extends MessageConfig {
  popupContainer?: HTMLElement | string;
}
type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'normal'

const iconRender = (type: MessageType) => {
  const iconEnum: any = {
    info: IconInfoCircleFill,
    success: IconCheckCircleFill,
    warning: IconExclamationCircleFill,
    error: IconCloseCircleFill,
    loading: IconLoading,
  }
  return h(iconEnum[type], { class: 'arco-message-icon' }) || undefined;
}

const getContainerElement = (popupContainer?: HTMLElement | string): HTMLElement => {
  // 获取挂载节点元素
  const container = (typeof popupContainer === 'string' ? document.querySelector(popupContainer) : popupContainer || document.body) as HTMLElement;
  // 如果挂载元素没有有position css 属性，设置为relative
  if (container && container instanceof HTMLElement && container.style.position === '') {
    container.style.position = 'relative';
  };
  return container;
}

const getMyArcoOverlayMessage = (element: HTMLElement, position: MessagePosition): HTMLElement => {
  const className = position && position === 'bottom' ? 'my-arco-overlay-message-bottom' : 'my-arco-overlay-message-top';
  let el: HTMLElement | null = element.querySelector(`.${className}`);
  if (!el) {
    const styleObj = {
      position: 'absolute',
      left: '0',
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: (position && position === 'bottom') ? 'flex-end' : 'flex-start',
      [position && position === 'bottom' ? 'bottom' : 'top']: '40px'
    };
    const vNode = h(
      'div',
      {
        style: styleObj,
        class: className, // 添加类名
      },
    );
    render(vNode, element);
    el = element.querySelector(`.${className}`);
  }
  return el!;
};

const createMessageItem = (type: MessageType, config: MessageConfig, targetEl: HTMLElement) => {
  let {
    content,
    id,
    icon,
    showIcon = true,
    closable,
    duration,
    onClose,
    resetOnHover
  } = config;
  id = id || `my-acro-message-${nanoid()}`;
  const el = document.createElement('div');
  const iconVNode: any = icon || iconRender(type);
  const messageVNode = h(
    'span',
    {
      class: `arco-message arco-message-${type}`,
      id,
      style: { pointerEvents: 'auto' },
    },
    [
      type !== 'normal' && showIcon && iconVNode,
      h('span', {}, content || ''),
      closable && h(IconClose, {
        class: 'arco-message-close-btn arco-icon-hover',
        onClick: () => {
          targetEl.removeChild(el);
          onClose && onClose(id as string);
        },
      }),
    ]);
  render(messageVNode, el);
  targetEl.appendChild(el);

  let timer: any = setTimeout(() => {
    targetEl.removeChild(el);
    clearTimeout(timer);
    timer = null;
  }, duration || 3000);

  if (!!resetOnHover) {
    el.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      timer = null;
    });
    el.addEventListener('mouseleave', () => {
      timer = setTimeout(() => {
        targetEl.removeChild(el);
        clearTimeout(timer);
        timer = null;
      }, duration || 3000);
    });
  }
}

const createJsMessage = (type: MessageType, config: JsMessageConfig | string) => {
  if (!JsFullScreen.isFullscreen.value) {
    // 如果是非全屏，使用 JsMessage
    JsMessage[type](config);
    return;
  }
  const configObj = typeof config === 'string' ? { content: config } : config;
  const { popupContainer, position, ...rest } = configObj;
  // 获取挂载节点元素
  const container = getContainerElement(popupContainer);
  // 给container节点上挂载一个消息提示容器，并返回这个容器
  const myArcoOverlayMessage = getMyArcoOverlayMessage(container, position);
  // 创建消息提示VNode节点并挂载到容器上
  createMessageItem(type, rest, myArcoOverlayMessage);
}

const JsMessageForFullScreen = {
  info: (config: JsMessageConfig | string) => createJsMessage('info', config),
  success: (config: JsMessageConfig | string) => createJsMessage('success', config),
  warning: (config: JsMessageConfig | string) => createJsMessage('warning', config),
  error: (config: JsMessageConfig | string) => createJsMessage('error', config),
  loading: (config: JsMessageConfig | string) => createJsMessage('loading', config),
  normal: (config: JsMessageConfig | string) => createJsMessage('normal', config),
}

export default JsMessageForFullScreen;