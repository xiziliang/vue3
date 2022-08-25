import type { InjectionKey } from 'vue';

export interface UserInfo {
  id: number;
  name: string;
}
// NOTE: provide和inject 类型安全问题
export const injectKeyUser: InjectionKey<UserInfo> = Symbol('user');
 