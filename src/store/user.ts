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
    if (typeof window === 'undefined') {
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    user.init({ accountAddress, signer });

    return { signer, accountAddress };
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
            reject('서명에 실패했습니다.');
          }
        }
      });
    });
  }

  async getNonce(accountAddress: string) {
    try {
      const data = { accountAddress };
      const response: { data: any } = await axios.post('/auth/nonce', data);

      return response.data;
    } catch (e) {
      this._error.set(e);
      throw new Error('넌스코드 조회에 실패했습니다.');
    }
  }

  async signIn(data: LocalSign) {
    try {
      const response: { data: any } = await axios.post('/auth', data);

      this._isAuth.set(true);

      return response.data;
    } catch (e) {
      this._error.set(e);
      throw new Error('로그인에 실패했습니다.');
    }
  }
}

export const user = new UserStore();
