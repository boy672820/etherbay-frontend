<script lang="ts">
  import { onMount } from 'svelte';
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../../components/product/Product.svelte';
  // store
  import { user } from '../../store/user';
  import { productStore } from '../../store/product';

  const { signer, accountAddress } = user;
  const { isLoading, products } = productStore;

  $: {
    if ($signer && $accountAddress) {
      productStore.connect($signer).getProducts($accountAddress);
    }
  }

  $: console.log($products);
</script>

<svelte:head>
  <title>etherBay | 내 상품({$accountAddress})</title>
</svelte:head>

<LayoutGrid>
  <Cell span={3}>
    <Product />
  </Cell>
</LayoutGrid>
