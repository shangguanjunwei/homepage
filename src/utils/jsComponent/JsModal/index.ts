import { h } from 'vue';
import { Modal } from "@arco-design/web-vue";

const createFooter = (confirm: any, hideCancel: boolean, okText = '', cancelText = '') => {
  return h('div', { class: 'js-modal-footer' }, [
    !hideCancel && h('button', { class: 'arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal', onClick: () => confirm(false) }, cancelText || '取消'),
    h('button', { class: 'arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal', onClick: () => confirm(true) }, okText || '确定'),
  ]);
}
const defaultConfig = () => ({
  title: "提示",
  content: "",
  okText: "确定",
  cancelText: "取消",
  maskClosable: false,
  hideCancel: false,
  width: 240,
  titleAlign: 'center',
  renderToBody: true,
  modalStyle: {
    textAlign: 'center'
  }
});

const handleConfgStep1 = (config: any) => {
  const newConfig: any = {};
  if (typeof config === 'string') {
    Object.assign(newConfig, { content: config });
  } else if (config instanceof Object) {
    Object.assign(newConfig, config);
  }
  const confirm = (isOk: boolean) => {
    if (isOk) {
      newConfig.onOk && newConfig.onOk();
    } else {
      newConfig.onCancel && newConfig.onCancel();
    }
  }
  return { newConfig, confirm };
}
const modelType = ['info', 'success', 'warning', 'error'];
const createFinalModal = (config: any, key: typeof modelType[number]) => {
  const { newConfig, confirm } = handleConfgStep1(config);
  return new Promise(resolve => {
    const modal = Modal[key](
      Object.assign({}, defaultConfig(), newConfig, {
        footer: () => createFooter(
          (flag: boolean) => {
            modal.close();
            confirm(flag);
            resolve(flag);
          },
          newConfig.hideCancel,
          newConfig.okText,
          newConfig.cancelText
        )
      })
    );
  });
}
const createModal = () => {
  const models = {}
  modelType.forEach((key) => {
    Object.assign(models, { [key]: (config: any) => createFinalModal(config, key) });
  });
  return models as {
    info: any,
    success: any,
    warning: any,
    error: any
  };
}
const JsModal = createModal();
export default JsModal;