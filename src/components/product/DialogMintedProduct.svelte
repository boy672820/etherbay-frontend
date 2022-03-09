<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label, Icon } from '@smui/button';
  import Tooltip, { Wrapper } from '@smui/tooltip';
  import { goto } from '$app/navigation';
  import { routes } from '$lib/routes';
  import type { MintedProduct } from '../../@types/product';

  export let open: boolean = false,
    accountAddress: string | null = null,
    data: MintedProduct | null = null,
    handleClose = () => {};

  const handleGoto = () => {
    handleClose();

    if (accountAddress) {
      goto(routes.product.my);
    }
  };
</script>

{#if data}
  <Dialog
    bind:open
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="mandatory-title"
    aria-describedby="mandatory-content"
    surface$style="width: 500px; max-width: calc(100vw - 32px);"
  >
    <Title id="mandatory-title">상품 등록 성공 🔥</Title>
    <Content id="mandatory-content">
      <h3 class="product-name">{data.name}</h3>
      <div class="product-image-container">
        <img src={data.image} alt={data.name} class="product-image" />
      </div>
      <p class="product-description">
        {data.description}
      </p>
      <p class="product-description">
        <Wrapper>
          <Button
            color="secondary"
            variant="outlined"
            class="button-shaped-round"
            href={`https://rinkeby.etherscan.io/tx/${data.transactionHash}`}
            target="_blank"
          >
            <Label>
              {data.transactionHash.substring(0, 7)}...{data.transactionHash.substring(
                data.transactionHash.length - 3,
                data.transactionHash.length
              )}
            </Label>
            <Icon class="material-icons">verified</Icon>
          </Button>
          <Tooltip xPos="center">Etherscan에서 확인하기</Tooltip>
        </Wrapper>
      </p>
    </Content>
    <Actions>
      {#if accountAddress}
        <Button on:click={handleClose}>
          <Label>확인</Label>
        </Button>
        <Button on:click={handleGoto}>
          <Label>내 상품으로 이동</Label>
        </Button>
      {/if}
    </Actions>
  </Dialog>
{/if}

<style>
  .product-image-container {
    display: flex;
    justify-content: center;
  }
  .product-image {
    height: 160px;
  }
</style>
