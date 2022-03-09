const ROOT_URL = 'http://34.64.122.129';

export const routes = {
  unauthorized: `${ROOT_URL}/401`,
  index: `${ROOT_URL}/`,
  product: {
    my: `${ROOT_URL}/product/my`,
    create: `${ROOT_URL}/product/create`
  }
};
