<script lang="ts">
  import { page } from '$app/stores';
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../../components/product/Product.svelte';
  import DialogLoading from '../../components/DialogLoading.svelte';
  // store
  import { user } from '../../store/user';
  import { productStore } from '../../store/product';

  const { signer, accountAddress } = user;
  const { isLoading, products } = productStore;

  $: {
    if ($signer && $accountAddress) {
      productStore.connect($signer).getUserProducts($accountAddress);
    }
  }
</script>

<svelte:head>
  <title>etherBay | 내 상품</title>
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
