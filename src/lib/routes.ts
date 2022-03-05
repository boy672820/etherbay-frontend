const ROOT_URL = 'http://127.0.0.1:3000';

export const routes = {
  unauthorized: `${ROOT_URL}/401`,
  index: `${ROOT_URL}/`,
  product: {
    my: (accountAddress: string) => `${ROOT_URL}/product/${accountAddress}`,
    create: `${ROOT_URL}/product/create`
  }
};
