import { variables } from "$lib/variables";

const root = variables.rootUrl;

export const routes = {
  unauthorized: `${root}/401`,
  index: `${root}/`,
  product: {
    my: `${root}/product/my`,
    create: `${root}/product/create`
  }
};
