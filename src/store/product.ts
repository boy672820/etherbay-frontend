import { variables } from '$lib/variables';
import { type Contract, ethers } from 'ethers';
import type { JsonRpcSigner } from '@ethersproject/providers';
import abi from '../abi/ProductOwnership.abi.json';
import type { Product } from 'src/@types/product';

class ProductStore {
  constructor() {
    this.contract = new ethers.Contract(variables.productAddress, abi);
  }

  public isLoading = false;
  public error: null | unknown = null;
  private contract: Contract;

  private ready() {
    this.isLoading = true;
  }

  private done() {
    this.isLoading = false;
  }

  private exception(error: string | Error | unknown) {
    if (typeof error === 'string') {
      this.error = new Error(error);
    } else {
      this.error = error;
    }
  }

  async createProduct(
    signer: JsonRpcSigner | null,
    { name, category, description, image }: Product
  ) {
    if (!signer) {
      const error = new Error('디지털 지갑과 연결되지 않았습니다.');

      this.exception(error);

      throw error;
    }

    this.ready();

    try {
      const contract = this.contract.connect(signer);

      await contract.createProduct(name, category, description, image);
    } catch (e) {
      this.exception('상품을 블록체인에 생성 중 문제가 발생했습니다.');

      throw e;
    }

    this.done();
  }
}

export const product = new ProductStore();
