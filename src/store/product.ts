import axios from '$lib/axios';
import { derived, writable, type Writable } from 'svelte/store';
import type { Product } from '../@types/product';

class ProductStore {
  constructor(
    private readonly _isLoading: Writable<boolean> = writable(false),
    private readonly _error: Writable<any> = writable(null),
    private readonly _data: Writable<any> = writable({
      name: '',
      description: '',
      image: '',
      category: '',
      transactionHash: '',
      tokenId: ''
    })
  ) {}

  get isLoading() {
    return derived([this._isLoading], ([$isLoading]) => $isLoading);
  }

  get error() {
    return derived([this._error], ([$error]) => $error);
  }

  get data() {
    return derived([this._data], ([$data]) => $data);
  }

  private ready() {
    this._isLoading.set(true);
  }

  private done() {
    this._isLoading.set(false);
  }

  // -----------------------------------------------------------------------

  async createProduct({ name, description, image, category }: Product) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);

    this.ready();

    try {
      const response: { data: any } = await axios.post('/product', formData);

      this.done();

      return response.data;
    } catch (e) {
      this._error.set(e);
      this.done();

      throw new Error('상품 생성 중 문제가 발생했습니다.');
    }
  }
}

export const product = new ProductStore();
