import { variables } from '$lib/variables';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export const getJsonRpcProvider = async (): Promise<JsonRpcProvider> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(variables.rpcUrl);
    await provider.ready;

    return provider;
  } catch (error) {
    throw new Error('블록체인 서버에 연결할 수 없습니다.');
  }
};
