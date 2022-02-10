import type { JsonRpcSigner } from '@ethersproject/providers';

export type isLogin = boolean;
export type signer = JsonRpcSigner | null;
export type accountAddress = string;

export type UserState = {
  signer: signer;
  accountAddress: accountAddress;
};
