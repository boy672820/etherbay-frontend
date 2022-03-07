<script lang="ts">
  import { page } from '$app/stores';
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../../components/product/Product.svelte';
  // store
  import { user } from '../../store/user';
  import { productStore } from '../../store/product';
  import DialogLoading from '../../components/DialogLoading.svelte';

  const { signer } = user;
  const { isLoading, products } = productStore;

  $: {
    if ($signer && $page.params.accountAddress) {
      productStore.connect($signer).getProducts($page.params.accountAddress);
    }
  }

  $: console.log($products);
</script>

<svelte:head>
  <title>etherBay | 내 상품({$page.params.accountAddress})</title>
</svelte:head>

<LayoutGrid>
  <Cell span={3}>
    {#if $products}
      {#each $products as data}
        <Product
          name={data.name}
          description={data.description}
          image={data.image}
          category={data.attributes[0].value}
        />
      {/each}
    {/if}
  </Cell>
</LayoutGrid>

<DialogLoading open={$isLoading} />
