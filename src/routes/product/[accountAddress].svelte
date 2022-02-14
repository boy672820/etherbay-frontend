<script lang="ts">
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../../components/product/Product.svelte';
  // store
  import { user } from '../../store/user';

  const { accountAddress } = user;
</script>

<svelte:head>
  <title>etherBay | 내 상품({$accountAddress})</title>
</svelte:head>

<LayoutGrid>
  {#each Array(10) as _unused, i}
    <Cell span={3}>
      <Product />
    </Cell>
  {/each}
</LayoutGrid>
