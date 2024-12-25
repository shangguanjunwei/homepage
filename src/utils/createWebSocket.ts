import { cloneDeep } from 'lodash';

// 约束 heartbeat 对象
interface HeartbeatOptions {
  interval: number;
  message: string;
}

// 定义接口来约束 options 对象
interface WebSocketOptions {
  protocol?: string; // 协议
  maxReconnectCount?: number; // 最大重连次数
  onopen?: () => void;
  onmessage?: (msg: MessageEvent) => void;
  onclose?: (closeEvent?: CloseEvent) => void;
  onerror?: (error: { reconnectCount: number; maxReconnectCount: number; message: string }) => void;
  heartbeat?: boolean | HeartbeatOptions; // 心跳配置
}

const createSingleWebSocket = (url: string, options: WebSocketOptions): any => {
  const {
    protocol,
    maxReconnectCount = 3,
    onopen,
    onmessage,
    onclose,
    onerror,
    heartbeat,
  } = options;

  let reconnectCount = 0;
  let ws: WebSocket | null = null;
  let worker: Worker | null = null;

  const init = (): void => {
    ws = protocol ? new WebSocket(url, protocol) : new WebSocket(url);

    // 如果有心跳，需要新建一个 webworker 设置一个定时器，定时向主进程发送心跳消息
    if (heartbeat) {
      // 默认心跳消息发送
      const { interval, message } = typeof heartbeat === 'boolean' ?
        { interval: 5000, message: '' } :
        heartbeat;
      worker = new Worker(URL.createObjectURL(new Blob([`
        setInterval(() => {
          postMessage('${message}');
        }, ${interval});
      `])));
      worker.onmessage = ({ data }) => {
        if (ws && ws?.readyState !== ws?.CLOSED && ws?.readyState !== ws?.CLOSING) {
          ws?.send(data);
        }
      };
    }

    ws.onopen = () => {
      onopen && onopen();
    };

    ws.onmessage = (msg: MessageEvent) => {
      onmessage && onmessage(msg);
    };

    ws.onclose = (closeEvent: CloseEvent) => {
      worker?.terminate();
      ws = null;
      onclose && onclose(closeEvent);
    };

    ws.onerror = () => {
      worker?.terminate();
      const errorMsg = `连接websocket失败,地址：${url}， \n第${reconnectCount + 1}次重连，\n最大重连接次数${maxReconnectCount}次`;
      console.error(errorMsg);
      if (onerror) {
        onerror({
          reconnectCount: reconnectCount + 1,
          maxReconnectCount,
          message: errorMsg,
        });
      }
      ws && ws.close();
      reconnect();
    };
  };

  const reconnect = (): void => {
    reconnectCount++;
    if (reconnectCount < maxReconnectCount) {
      setTimeout(() => {
        init();
      }, 5 * 1000);
    } else {
      console.error(`重连websocket次数超过最大重连次数${maxReconnectCount}，已停止重连`);
    }
  };

  init();
  const getWs = () => ws
  return {
    getWs
  };
};

export interface WsOption {
  send: (msg: string | ArrayBuffer | Blob | ArrayBufferView) => void;
  close: () => void;
}

const createWebSocket = (url: string, options: WebSocketOptions): WsOption => {
  const { getWs } = createSingleWebSocket(url, cloneDeep(options));

  const send = (msg: string | ArrayBuffer | Blob | ArrayBufferView): void => {
    const ws = getWs();
    ws && ws.send(msg);
  };

  const close = (): void => {
    const ws = getWs();
    ws && ws.close();
  };

  return { send, close };
};

export default createWebSocket;