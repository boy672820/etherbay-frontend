import { variables } from '$lib/variables';
import { type Contract, ethers } from 'ethers';
import type { JsonRpcSigner } from '@ethersproject/providers';
import abi from '../abi/ProductOwnership.abi.json';
import type { Product } from 'src/@types/product';
import type { signer } from 'src/@types/user';
import { derived, writable, type Writable } from 'svelte/store';

class ProductStore {
  constructor(private readonly _isLoading: Writable<boolean> = writable(false)) {
    this.contract = new ethers.Contract(variables.productAddress, abi);
  }

  public signer: null | JsonRpcSigner = null;
  public error: null | unknown = null;
  private contract: Contract;
  private running: any;

  get isLoading() {
    return derived([this._isLoading], ([$isLoading]) => $isLoading);
  }

  private ready() {
    this._isLoading.set(true);
  }

  private done() {
    this._isLoading.set(false);
  }

  private exception(error: string | Error | unknown) {
    if (typeof error === 'string') {
      this.error = new Error(error);
    } else {
      this.error = error;
    }
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

  async createProduct({ name, category, description, image }: Product) {
    if (this.signer === null) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');
      this.exception(error);
      throw error;
    }

    this.ready();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // try {
    //   const contract = this.contract.connect(this.signer);

    //   this.running = await contract.createProduct(name, category, description, image);
    // } catch (e) {
    //   this.exception('상품을 블록체인에 생성 중 문제가 발생했습니다.');
    //   throw e;
    // }

    this.done();
  }

  async eventNewProduct() {
    const receipt = await this.running.wait();
    const events = receipt.events.filter((x) => {
      return x.event == 'NewProduct';
    });
    const lastEvent = events.pop();
    const product = lastEvent.args;

    return product;
  }
}

export const product = new ProductStore();
