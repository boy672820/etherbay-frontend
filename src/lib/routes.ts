const ROOT_URL = 'http://127.0.0.1:3000';

export const routes = {
  index: `${ROOT_URL}/`,
  product: {
    my: (accountAddress: string) => `${ROOT_URL}/product/${accountAddress}`,
    create: `${ROOT_URL}/product/create`
  }
};
