import { derived, writable, type Writable } from 'svelte/store';
import { variables } from '$lib/variables';
import { getJsonRpcProvider } from '$lib/provider';
import type { Product } from 'src/@types/product';
import type { signer } from 'src/@types/user';
import { type Contract, ethers } from 'ethers';
import type {
  JsonRpcSigner,
  TransactionReceipt,
  TransactionResponse
} from '@ethersproject/providers';
import abi from '../abi/ProductOwnership.abi.json';

class ProductStore {
  constructor(
    private readonly _isLoading: Writable<boolean> = writable(false),
    private readonly _error: Writable<any> = writable(null),
    private readonly _receipt: Writable<null | TransactionReceipt> = writable(null)
  ) {
    this.contract = new ethers.Contract(variables.productAddress, abi);
  }

  private signer: null | JsonRpcSigner = null;
  private contract: null | Contract = null;

  get isLoading() {
    return derived([this._isLoading], ([$isLoading]) => $isLoading);
  }

  get error() {
    return derived([this._error], ([$error]) => $error);
  }

  get receipt() {
    return derived([this._receipt], ([$receipt]) => $receipt);
  }

  private ready() {
    this._isLoading.set(true);
  }

  private done() {
    this._isLoading.set(false);
  }

  private exception(error: string | Error | unknown) {
    let _error;
    if (typeof error === 'string') {
      _error = new Error(error);
      this._error.set(_error);
    } else {
      _error = error;
      this._error.set(_error);
    }

    return _error;
  }

  success() {
    this._isLoading.set(false);
    this._error.set(null);
    this._receipt.set(null);
  }

  connect(signer: signer): ProductStore {
    if (signer === null) {
      throw this.exception('디지털 지갑과 연결되지 않았습니다.');
    }

    this.signer = signer;

    return this;
  }

  createProduct({ name, category, description, image }: Product) {
    if (this.signer === null || this.contract === null) {
      throw this.exception('디지털 지갑과 연결되지 않았습니다.');
    }

    this.ready();

    const contract = this.contract.connect(this.signer);
    const handleTx = async (tx: TransactionResponse) => {
      const receipt = await tx.wait();
      this._receipt.set(receipt);
      this.done();
    };

    contract
      .createProduct(name, category, description, image)
      .then(handleTx)
      .catch(() => {
        this.done();
        this.exception('상품 생성에 실패했습니다.');
      });
  }

  async subscribe(
    eventName: string,
    callback: (args: Array<any>) => void,
    indexes?: Array<null | string>
  ) {
    if (this.contract === null) {
      throw this.exception('이더리움 블록체인과 연결 중 문제가 발생했습니다.');
    }

    try {
      const jsonRpcProvider = await getJsonRpcProvider();
      const contract = this.contract.connect(jsonRpcProvider);

      let eventFilter;

      if (indexes) {
        eventFilter = contract.filters[eventName](...indexes);
      } else {
        eventFilter = contract.filters[eventName]();
      }

      contract.on(eventFilter, (...args) => {
        console.log('Subscribed event:', eventName);
        callback(args);
      });
    } catch (e) {
      throw this.exception(e);
    }
  }
}

export const product = new ProductStore();
