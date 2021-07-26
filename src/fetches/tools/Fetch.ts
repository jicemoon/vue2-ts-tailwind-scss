import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBaseResponse, IFetchOptions } from '../types/base';
import { ASP_ID, CANCEL_CODE, ERROR_CODE, LOGIN_SESSION_ID } from './const';
import { ICombineAPI } from './typeAPI';

type ExtendsFetchOptions = AxiosRequestConfig & { fetchOptions?: IFetchOptions };

export class Fetch {
  axiosInstance: AxiosInstance;
  tokenHeader?: { [ASP_ID]: string; [key: string]: string };

  defaultFetchOptions: IFetchOptions = {
    loading: true,
    showError: true,
    showSuccess: false,
  };
  private _baseURL: string = '';
  set baseURL(url: string) {
    this._baseURL = url;
    this.axiosInstance.defaults.baseURL = url;
  }
  get baseURL() {
    return this._baseURL;
  }
  /**
   * 设置请求头sessionID
   */
  set authHeader(val: string) {
    this.setHeader({ [LOGIN_SESSION_ID]: val });
  }

  constructor(options: ExtendsFetchOptions = {}) {
    const { fetchOptions, ...axiosOptions } = options;
    this.defaultFetchOptions = { ...this.defaultFetchOptions, ...fetchOptions };
    this.axiosInstance = axios.create({
      timeout: 30000,
      withCredentials: false,
      ...axiosOptions,
    });
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.responseIntercept();
  }
  setHeader(heads: any) {
    Object.assign(this.axiosInstance.defaults.headers.common, heads);
  }
  /**
   * 发送GET请求
   * @param url
   * @param json
   * @param options 如果是布尔值, 表示是否需要加载动画
   */
  async get<K extends keyof ICombineAPI, V extends ICombineAPI[K]>(
    url: K,
    json?: V[0],
    options: ExtendsFetchOptions | boolean = {},
  ): Promise<V[1]> {
    if (typeof options === 'boolean') {
      options = { fetchOptions: { loading: options } };
    }
    const { fetchOptions, ...axiosOptions } = options;
    const config: IFetchOptions = { ...this.defaultFetchOptions, ...{ showSuccess: false }, ...fetchOptions };
    if (json) {
      axiosOptions.params = { param: JSON.stringify(json), _: Date.now() };
    }
    this.addLoading(url, config);
    this.setAuthHeader();
    try {
      const res = await this.axiosInstance.get(url, axiosOptions);
      const json = res.data as IBaseResponse;
      this.removeLoading(url, json.status, json.info, json.code, config);
      if (typeof res.data.Data === 'string') {
        try {
          res.data.Data = JSON.parse(res.data.Data);
        } catch (e) {}
      }
      return res.data;
    } catch (err) {
      return this.catchError(url, config, err);
    }
  }
  /**
   * 发送POST请求
   * @param url
   * @param json
   * @param options
   */
  async post<K extends keyof ICombineAPI, V extends ICombineAPI[K]>(
    url: K,
    json?: V[0],
    options: ExtendsFetchOptions | boolean = {},
  ): Promise<V[1]> {
    if (typeof options === 'boolean') {
      options = { fetchOptions: { loading: options } };
    }
    const { fetchOptions, ...axiosOptions } = options;
    const config: IFetchOptions = { ...this.defaultFetchOptions, ...{ showSuccess: true }, ...fetchOptions };
    let data;
    if (json) {
      data = { param: JSON.stringify(json) };
    }
    this.addLoading(url, config);
    this.setAuthHeader();
    try {
      const res = await this.axiosInstance.post(url, data, axiosOptions);
      const json = res.data as IBaseResponse;
      this.removeLoading(url, json.status, json.info, json.code, config);
      return res.data;
    } catch (err) {
      return this.catchError(url, config, err);
    }
  }
  /**
   * response拦截
   */
  private responseIntercept() {
    this.axiosInstance.interceptors.response.use(res => {
      const json = res.data as IBaseResponse;
      // 异常处理
      return res;
    });
  }
  /**
   * 设置请求头sessionID
   */
  private setAuthHeader() {
    // if (store?.getters?.hasLogin) {
    //   this.authHeader = store.getters.sessionID;
    // }
  }
  /**
   * 添加Loading动画
   * @param url
   * @param config
   */
  private addLoading(url: string, config: IFetchOptions) {
    // if (!config.loading) return;
    // if (this.loadingMap.has(url)) return;
    // const opacity = config.loadingMaskOpacity || 0;
    // this.loadingMap.set(
    //   url,
    //   ElLoading.service({
    //     fullscreen: true,
    //     lock: true,
    //     text: config.loadingTip,
    //     body: true,
    //     customClass: `global-loading-custom bg-opacity-l${opacity}`,
    //     ...(config.loadingOptions || {}),
    //   }),
    // );
  }
  /**
   * 移除loading动画, 并弹出返回信息(如果需要)
   * @param url
   * @param status
   * @param message
   * @param config
   */
  private removeLoading(url: string, status: boolean, message: string, code: number, config: IFetchOptions) {
    // if (config.loading && this.loadingMap.has(url)) {
    //   try {
    //     this.loadingMap.get(url)?.close();
    //     this.loadingMap.delete(url);
    //   } catch (e) {
    //     console.warn(e);
    //   }
    // }
    // if (code !== INTERCEPT_CODE && config.showError && !status) {
    //   ElMessage.error(message);
    // }
    // if (code !== INTERCEPT_CODE && config.showSuccess && status) {
    //   ElMessage.success(message);
    // }
  }
  /**
   * 接口报错处理
   * @param url
   * @param config
   * @param err
   */
  private catchError(url: string, config: IFetchOptions, err: { message: string }): IBaseResponse<any> {
    let message = '';
    switch (true) {
      case /network\s*error/i.test(err.message):
        message += '请求出错，请检查网络';
        break;
      case /timeout\s*of/i.test(err.message):
        message += '请求超时，请刷新重试';
        break;
      default:
        message += err.message;
    }
    const isCancel = message === 'xhr_cancel';
    this.removeLoading(url, isCancel, message, ERROR_CODE, config);
    return {
      code: isCancel ? CANCEL_CODE : ERROR_CODE,
      status: false,
      info: message,
      data: {} as any,
    };
  }
}
