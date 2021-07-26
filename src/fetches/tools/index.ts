import { Fetch } from './Fetch';
export * from './const';

const fetch = new Fetch();
fetch.baseURL = process.env.NODE_ENV === 'production' ? '/' : '/api';
export const get = fetch.get;
export const post = fetch.post;
export { fetch };
