import { cookie } from './cookie';
export const local = window.localStorage;
export const session = window.sessionStorage;

const KEY_IS_LOGIN = 'KEY_IS_LOGIN';
export const setIsLogin = () => {
  cookie.setItem(KEY_IS_LOGIN, 1);
};
export const logout = () => {
  cookie.removeItem(KEY_IS_LOGIN);
  location.href = '/login';
};
export const getIsLogin = () => !!cookie.getItem(KEY_IS_LOGIN);

export { cookie };
