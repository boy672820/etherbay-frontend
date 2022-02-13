import { variables } from '$lib/variables';
import { type Contract, ethers } from 'ethers';
import type { JsonRpcSigner } from '@ethersproject/providers';
import abi from '../abi/ProductOwnership.abi.json';
import type { Product } from 'src/@types/product';
import type { signer } from 'src/@types/user';
import { derived, writable, type Writable } from 'svelte/store';

class ProductStore {
  constructor(
    private readonly _isLoading: Writable<boolean> = writable(false),
    private readonly _error: Writable<any> = writable(null)
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

  connect(signer: signer): ProductStore {
    if (signer === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      throw this.exception(error);
    }

    this.signer = signer;

    return this;
  }

  createProduct({ name, category, description, image }: Product) {
    if (this.signer === null || this.contract === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      throw this.exception(error);
    }

    this.ready();

    const contract = this.contract.connect(this.signer);

    contract
      .createProduct(name, category, description, image)
      .then(() => this.done())
      .catch((e: any) => {
        this.done();
        this.exception(e);
        throw new Error('상품 생성에 실패했습니다.');
      });
  }

  subscribe(
    eventName: string,
    callback: (args: Array<any>) => void,
    indexes?: Array<null | string>
  ) {
    if (this.signer === null || this.contract === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      throw this.exception(error);
    }

    const contract = this.contract.connect(this.signer);

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
  }
}

export const product = new ProductStore();
