<script lang="ts">
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../components/Product.svelte';
</script>

<svelte:head>
  <title>etherBay | 메인 페이지, 상품목록</title>
</svelte:head>

<LayoutGrid>
  {#each Array(10) as _unused, i}
    <Cell span={3}>
      <Product />
    </Cell>
  {/each}
</LayoutGrid>
