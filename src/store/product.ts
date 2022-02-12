import { variables } from '$lib/variables';
import { type Contract, type EventFilter, ethers } from 'ethers';
import type { JsonRpcSigner } from '@ethersproject/providers';
import abi from '../abi/ProductOwnership.abi.json';
import type { Product } from 'src/@types/product';
import type { signer } from 'src/@types/user';
import { derived, writable, type Writable } from 'svelte/store';

class ProductStore {
  constructor(
    private readonly _isLoading: Writable<boolean> = writable(false),
    private readonly _error: Writable<any> = writable(null),
    private readonly _eventFilter: Writable<EventFilter | null> = writable(null)
  ) {
    this.contract = new ethers.Contract(variables.productAddress, abi);
  }

  public signer: null | JsonRpcSigner = null;
  private contract: Contract;

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

  private contractFilter(contract: Contract, method: string, topics: Array<any>) {
    const eventFilter = contract.filters[method](...topics);
    this._eventFilter.set(eventFilter);
  }

  connect(signer: signer) {
    if (signer === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      this.exception(error);
      throw error;
    }

    this.signer = signer;

    return this;
  }

  createProduct({ name, category, description, image }: Product): Contract {
    if (this.signer === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      throw this.exception(error);
    }

    this.ready();

    const contract = this.contract.connect(this.signer);

    const params = [name, category, description, image];

    contract
      .createProduct(...params)
      .then(() => this.done())
      .catch(() => {
        this.done();
        throw this.exception('상품을 블록체인에 생성 중 문제가 발생했습니다.');
      });

    // this.contractFilter(contract, 'createProduct', params);
    return contract;
  }

  async subscribe(eventName: string) {
    if (!this._eventFilter) {
      throw this.exception('확인할 컨트랙트 요청 정보가 없습니다.');
    }

    console.log(this._eventFilter);
  }
}

export const product = new ProductStore();
