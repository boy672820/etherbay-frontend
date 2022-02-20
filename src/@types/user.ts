import type { JsonRpcSigner } from '@ethersproject/providers';

export type isLogin = boolean;
export type signer = JsonRpcSigner;
export type accountAddress = string;

export type UserState = {
  signer: signer;
  accountAddress: accountAddress;
};

export type LocalSign = {
  username: string;
  password: string;
};

export interface ConnectedMetamask {
  signer: signer;
  accountAddress: accountAddress;
}
