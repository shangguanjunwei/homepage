import { computed, reactive, toRefs } from "vue";
import screenfull from 'screenfull';
import JsMessage from "../JsMessage";
import router from "@/routers";

type elementType = HTMLElement | undefined;

const fullScreenConfig = reactive<{ element: elementType; isFullscreen: boolean }>({
  element: undefined,
  isFullscreen: false, // 是否全屏状态
});

// 这里使用监听来改变 isFullscreen 的值，因为可能不是通过 toggle 来切换全屏的
screenfull.onchange(() => {
  fullScreenConfig.isFullscreen = screenfull.isFullscreen;
});

// 设置全屏配置
const toggle = (element?: elementType) => {
  if (screenfull.isEnabled) {
    if (element) {
      fullScreenConfig.element = element;
    }
    screenfull.toggle(fullScreenConfig.element || undefined);
  } else {
    JsMessage.error('当前浏览器不支持全屏');
  }
};

// 设置需要全屏的元素
const setFullScreenElement = (element: elementType) => {
  fullScreenConfig.element = element;
};

// 布局滚动高度，适配全屏
const layoutScrollHeight = computed(() => {
  const currentRoute = router.currentRoute.value;
  const { enable = false }: any = currentRoute.meta?.fullScreen || {};
  return (fullScreenConfig.isFullscreen && enable) ?
    'calc(100vh - 15px - 15px)' :
    'calc(100vh - 80px - 15px - 15px - 40px)';
});
const JsFullScreen: {
  toggle: (element?: elementType) => void;
  setFullScreenElement: (element: elementType) => void;
  isFullscreen: any;
  element: any;
  layoutScrollHeight: any;
} = {
  toggle, // 切换全屏
  setFullScreenElement, // 设置需要全屏的元素 默认为全屏的元素为body ,也就是 undefined
  // isFullscreen: toRef(() => fullScreenConfig.value.isFullscreen), // 是否全屏状态
  // element: toRef(() => fullScreenConfig.value.element), // 全屏元素
  layoutScrollHeight, // 布局滚动高度
  ...toRefs(fullScreenConfig)
}

export default JsFullScreen;