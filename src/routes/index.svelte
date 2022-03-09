<script lang="ts">
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button, { Label, Icon } from '@smui/button';
  // components
  import Product from '../components/product/Product.svelte';
  import DialogLoading from '../components/DialogLoading.svelte';
  // store
  import { user } from '../store/user';
  import { productStore } from '../store/product';

  const { isLogin, signer } = user;
  const { isLoading, allProducts } = productStore;

  $: {
    if ($signer) {
      productStore.connect($signer).getProducts();
    }
  }
</script>

<svelte:head>
  <title>etherBay | 메인 페이지 상품목록</title>
</svelte:head>

{#if $isLogin}
  <h2>전체 상품 🔥</h2>
  <LayoutGrid>
    {#if $allProducts}
      {#each $allProducts as data}
        <Cell span={3}>
          <Product
            name={data.name}
            description={data.description}
            image={data.image}
            category={data.attributes[0].value}
          />
        </Cell>
      {/each}
    {/if}
  </LayoutGrid>

  <DialogLoading open={$isLoading} />
{:else}
  <div class="notification">
    <h1>메타마스크 로그인 후 이용해주세요 🙏</h1>
    <div>
      <Button variant="raised" on:click={user.connectMetamask}>
        <Label>메타마스크 로그인</Label>
      </Button>
    </div>
  </div>
{/if}

<style>
  .notification {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
