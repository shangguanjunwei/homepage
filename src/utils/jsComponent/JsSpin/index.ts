import { ref } from "vue";

type SpinConfig = {
  size?: number | undefined;
  dot?: boolean;
  tip?: string;
  loading?: boolean;
  hideIcon?: boolean;
};

// Spin配置
export const spinConfig = ref<SpinConfig>({
  size: undefined,
  dot: true,
  tip: "",
  loading: false,
  hideIcon: false,
});

// 设置Spin配置
const setSpin = (config: SpinConfig | boolean) => {
  if (typeof config === 'boolean') {
    spinConfig.value.loading = config;
  } else {
    spinConfig.value = {
      ...spinConfig.value,
      ...config,
    };
  }
};

const closeSpin = () => {
  spinConfig.value.loading = false;
}

const openSpin = (message?: string) => {
  spinConfig.value.loading = true;
  spinConfig.value.tip = message;
}

const JsSpin: {
  setSpin: (config: SpinConfig | boolean) => void;
  close: () => void;
  open: (message?: string) => void;
  show: (message?: string) => void;
} = {
  setSpin,
  close: closeSpin,
  open: openSpin,
  show: openSpin,
};
export default JsSpin;