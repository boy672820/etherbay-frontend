import { variables } from '$lib/variables';
import { Contract, ethers } from 'ethers';
import abi from '../abi/ProductOwnership.abi.json';

class ProductStore {
  constructor() {
    (async (_this) => {
      try {
        _this.isLoading = true;

        const provider = new ethers.providers.JsonRpcProvider(variables.rpcUrl);
        await provider.ready;

        const signer = new ethers.Wallet(variables.ownerPrivateKey, provider);

        const productContract = new ethers.Contract(variables.productAddress, abi, signer);

        _this.productContract = productContract;

        _this.isLoading = false;
      } catch (e) {
        _this.isLoading = false;
        _this.error = e;
      }
    })(this);
  }

  private isLoading = false;
  private error: null | unknown = null;
  private productContract: Contract | null = null;

  async ready() {
    return this.isLoading;
  }

  async createProduct() {
    this.productContract;
  }
}

export const product = new ProductStore();
