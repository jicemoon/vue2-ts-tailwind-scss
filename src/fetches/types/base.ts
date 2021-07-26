// import { ILoadingOptions } from 'element';

export interface IBaseResponse<T = any> {
  code: number;
  status: boolean;
  info: string;
  data: T;
}
export interface IFetchOptions {
  /**
   * 失败时 - 是否弹出返回消息, 默认为true
   */
  showError?: boolean;
  /**
   * 成功时 - 是否弹出返回消息, 默认为false
   */
  showSuccess?: boolean;
  /**
   * 请求前弹出loading,默认false
   */
  loading?: boolean;
  /**
   * 加载中提示语
   */
  loadingTip?: string;
  /**
   * loading遮罩背景透明度, 默认为0
   */
  // loadingMaskOpacity?: 0 | 10 | 30 | 50 | 80;
  /**
   * loading参数, 参考element组件 ElLoading.service 中的参数
   */
  // loadingOptions?: ILoadingOptions;
}
