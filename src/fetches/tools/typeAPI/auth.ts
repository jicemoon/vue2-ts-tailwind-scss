import { IPostLoginRequest, IPostLoginResponse } from '@/fetches/types/auth/PostLogin';
import { IBaseResponse } from '@/fetches/types/base';
import { POST_LOGIN } from '../constants/auth';

export interface IAuthAPI {
  [POST_LOGIN]: [IPostLoginRequest, IBaseResponse<IPostLoginResponse>];
}
