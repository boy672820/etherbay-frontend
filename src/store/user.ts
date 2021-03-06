import { browser } from '$app/env';
import axios from '$lib/axios';
import { ethers } from 'ethers';
import type {
  accountAddress,
  ConnectedMetamask,
  isLogin,
  LocalSign,
  signer,
  UserState
} from 'src/@types/user';
import { type Writable, writable, derived } from 'svelte/store';

class UserStore {
  constructor(
    private _isLogin: Writable<isLogin> = writable(false),
    private _isAuth: Writable<isLogin> = writable(false),
    private _accountAddress: Writable<accountAddress | null> = writable(null),
    private _signer: Writable<signer | null> = writable(null),
    private readonly _error: Writable<any> = writable(null)
  ) {}

  get isLogin() {
    return derived([this._isLogin], ([$isLogin]) => $isLogin);
  }

  get isAuth() {
    return derived([this._isAuth], ([$isAuth]) => $isAuth);
  }

  get accountAddress() {
    return derived([this._accountAddress], ([$accountAddress]) => $accountAddress);
  }

  get signer() {
    return derived([this._signer], ([$signer]) => $signer);
  }

  get error() {
    return derived([this._error], ([$error]) => $error);
  }

  private init({ accountAddress, signer }: UserState) {
    this._accountAddress.set(accountAddress);
    this._signer.set(signer);
    this._isLogin.set(true);

    console.log('User initialization complete: ', accountAddress);
  }

  async connectMetamask(): Promise<ConnectedMetamask | null> {
    if (!browser) {
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    user.init({ accountAddress, signer });

    return { signer, accountAddress };
  }

  async onAccountsChanged(callback: (accountAddress: string) => void) {
    if (!browser || !window?.ethereum) {
      return false;
    }

    window.ethereum.on('accountsChanged', async (accounts: string) => {
      const accountAddress = accounts[0];

      this._accountAddress.set(accountAddress);

      callback(accountAddress);
    });
  }

  logout() {
    this._accountAddress.set(null);
    this._signer.set(null);
    this._isLogin.set(false);
  }

  personalSign(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.signer.subscribe(async (signer) => {
        if (signer) {
          try {
            const signature = await signer.signMessage(message);
            resolve(signature);
          } catch (e) {
            this._error.set(e);
            reject('????????? ??????????????????.');
          }
        }
      });
    });
  }

  setAuth() {
    if (!browser) {
      throw new Error('Window ????????? ?????? ??? ??????');
    }

    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
      return false;
    }

    this._isAuth.set(true);
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

    return true;
  }

  async getNonce(accountAddress: string) {
    try {
      const data = { accountAddress };
      const response: { data: any } = await axios.post('/auth/nonce', data);

      return response.data;
    } catch (e) {
      this._error.set(e);
      throw new Error('???????????? ????????? ??????????????????.');
    }
  }

  async signIn(data: LocalSign) {
    try {
      const response: { data: any } = await axios.post('/auth', data);

      this._isAuth.set(true);

      return response.data;
    } catch (e) {
      this._error.set(e);
      throw new Error('???????????? ??????????????????.');
    }
  }
}

export const user = new UserStore();
