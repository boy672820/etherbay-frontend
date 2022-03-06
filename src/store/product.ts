import axios from '$lib/axios';
import { variables } from '$lib/variables';
import type { JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ethers } from 'ethers';
import { derived, writable, type Writable } from 'svelte/store';
import type { MintedProduct, ProductFormData, Products } from '../@types/product';
import abi from '../abi/EtherbayProduct.abi.json';

class ProductStore {
  constructor(
    private contract: Contract,
    private readonly _isLoading: Writable<boolean> = writable(false),
    private readonly _error: Writable<any> = writable(null),
    private readonly _product: Writable<MintedProduct | null> = writable(null),
    private readonly _products: Writable<Products[] | null> = writable(null)
  ) {}

  get isLoading() {
    return derived([this._isLoading], ([$isLoading]) => $isLoading);
  }

  get error() {
    return derived([this._error], ([$error]) => $error);
  }

  get product() {
    return derived([this._product], ([$product]) => $product);
  }

  get products() {
    return derived([this._products], ([$products]) => $products);
  }

  private ready() {
    this._isLoading.set(true);
  }

  private done() {
    this._isLoading.set(false);
  }

  connect(wallet: JsonRpcSigner) {
    const contract = this.contract.connect(wallet);
    this.contract = contract;
    return this;
  }

  // -----------------------------------------------------------------------

  async createProduct({ name, description, image, category }: ProductFormData) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);

    this.ready();

    try {
      const response: { data: any } = await axios.post('/product', formData);

      this._product.set(response.data);
      this.done();

      return response.data;
    } catch (e) {
      this._error.set(e);
      this.done();

      throw new Error('상품 생성 중 문제가 발생했습니다.');
    }
  }

  async initProduct() {
    this._product.set(null);
  }

  async getProducts(accountAddress: string) {
    this.ready();

    const bigNumber = await this.contract.balanceOf(accountAddress);

    // Token ID 가져오기

    const balance = bigNumber.toNumber();
    const indexPromises: Array<Promise<any>> = [];

    for (let i = 0; balance > i; i += 1) {
      const promise = this.contract.tokenOfOwnerByIndex(accountAddress, i);
      indexPromises.push(promise);
    }

    const tokenIds = await Promise.all(indexPromises);

    // Token URI 가져오기

    const uriReduceInit: Array<string> = [];
    const uriPromises = tokenIds.reduce((result, tokenId) => {
      const promise = this.contract.tokenURI(tokenId);

      result.push(promise);

      return result;
    }, uriReduceInit);

    const tokenUris = await Promise.all(uriPromises);

    // 상품 IPFS 정보 가져오기

    const productReduceInit: Array<any> = [];
    const productPromises = tokenUris.reduce((result, uri) => {
      const ipfsHash = uri.substring(21);
      const promise = this.getIpfs(ipfsHash);

      result.push(promise);

      return result;
    }, productReduceInit);

    const products = await Promise.all(productPromises);

    this._products.set(products);
    this.done();

    return tokenIds;
  }

  async getIpfs(ipfsHash: string) {
    try {
      const response: { data: any } = await axios.get(`/pinata/ipfs/${ipfsHash}`);

      return response.data;
    } catch (e) {
      this._error.set(e);
      this.done();

      throw new Error('IPFS 정보를 가져오는 중 문제가 발생했습니다.');
    }
  }
}

const etherbayProduct = new ethers.Contract(variables.productAddress, abi);

export const productStore = new ProductStore(etherbayProduct);
