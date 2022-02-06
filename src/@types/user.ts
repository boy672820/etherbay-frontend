import type { JsonRpcSigner } from '@ethersproject/providers';

export type isLogin = boolean;
export type signer = JsonRpcSigner;
export type accountAddress = string;

export type UserState = {
  isLogin: isLogin;
  signer: signer;
  accountAddress: accountAddress;
};
