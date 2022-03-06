export type ProductFormData = {
  name: string;
  description: string;
  image: File;
  category: string;
};

type Attribute = {
  trait_type: string;
  value: string;
};

export type MintedProduct = {
  name: string;
  image: string;
  attributes: Attribute[];
  description: string;
  transactionHash: string;
  tokenId: string;
  ipfs: string;
};

export type Products = any;