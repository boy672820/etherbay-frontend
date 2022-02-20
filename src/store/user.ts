import { ethers } from 'ethers';
import type { accountAddress, isLogin, signer, UserState } from 'src/@types/user';
import { type Writable, writable, derived } from 'svelte/store';

class UserStore {
  constructor(
    private _isLogin: Writable<isLogin> = writable(false),
    private _accountAddress: Writable<accountAddress | null> = writable(null),
    private _signer: Writable<signer | null> = writable(null)
  ) {}

  get isLogin() {
    return derived([this._isLogin], ([$isLogin]) => $isLogin);
  }

  get accountAddress() {
    return derived([this._accountAddress], ([$accountAddress]) => $accountAddress);
  }

  get signer() {
    return derived([this._signer], ([$signer]) => $signer);
  }

  async init({ accountAddress, signer }: UserState) {
    this._accountAddress.set(accountAddress);
    this._signer.set(signer);
    this._isLogin.set(true);

    console.log('User initialization complete: ', accountAddress);
  }

  async connectMetamask() {
    if (typeof window === 'undefined') {
      return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    user.init({ accountAddress, signer });
  }

  async logout() {
    this._accountAddress.set(null);
    this._signer.set(null);
    this._isLogin.set(false);
  }

  async personalSign(message: string) {
    this.signer.subscribe(async (signer) => {
      if (!(signer instanceof ethers.providers.JsonRpcSigner)) {
        throw new Error('메타마스크 로그인 후 이용해주세요.');
      }

      const bytesMessage = '0x' + ethers.utils.id(message);
      const signature = await signer.signMessage(bytesMessage);

      console.log(signature);
    });
  }
}

export const user = new UserStore();
