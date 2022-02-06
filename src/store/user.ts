import type { accountAddress, isLogin, signer, UserState } from 'src/@types/user';
import { type Writable, writable, derived } from 'svelte/store';

class UserStore {
  constructor(
    private _isLogin: Writable<isLogin> = writable(false),
    private _accountAddress: Writable<accountAddress | null> = writable(null),
    private _signer: Writable<signer | null> = writable(null)
  ) {}

  async init({ accountAddress, signer }: UserState) {
    this._accountAddress.set(accountAddress);
    this._signer.set(signer);
    this._isLogin.set(true);
  }

  async logout() {
    this._accountAddress.set(null);
    this._signer.set(null);
    this._isLogin.set(false);
  }

  get isLogin() {
    return derived([this._isLogin], ([$isLogin]) => $isLogin);
  }

  get accountAddress() {
    return derived([this._accountAddress], ([$accountAddress]) => $accountAddress);
  }

  get signer() {
    return derived([this._signer], ([$signer]) => $signer);
  }
}

export const user = new UserStore();
