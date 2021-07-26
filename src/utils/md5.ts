import { Md5 } from 'md5-typescript';

/**
 * md5加密
 * @param str
 * @returns
 */
export const md5 = (str: string) => {
  return Md5.init(str);
};
/**
 * md5加密登录密码(两次加密)
 * @param password 密码
 * @param validateCode 验证码
 * @returns
 */
export const md5Password = (password: string, validateCode: string = '') => {
  return md5(md5(password) + validateCode);
};
