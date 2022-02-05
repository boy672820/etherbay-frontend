<script lang="ts">
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  // components
  import Product from '../components/Product.svelte';
</script>

<LayoutGrid>
  {#each Array(10) as _unused, i}
    <Cell span={3}>
      <Product />
    </Cell>
  {/each}
</LayoutGrid>
