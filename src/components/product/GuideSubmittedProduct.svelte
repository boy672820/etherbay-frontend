<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';

  export let open = false;
  export let isLoading = true;
  export let data: any = null;
</script>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="mandatory-title"
  aria-describedby="mandatory-content"
  surface$style="width: 500px; max-width: calc(100vw - 32px);"
>
  <Title id="mandatory-title">
    {#if isLoading}상품 등록 중 🤖{/if}
    {#if data !== null}상품 등록 성공 🔥{/if}
  </Title>
  <Content id="mandatory-content">
    {#if isLoading}
      <h3>이더리움 블록체인에 새로운 상품을 추가 중 입니다..</h3>
      <div class="loading-video-container">
        <video
          src="/mining-simpsons.mp4"
          autoplay
          loop
          muted
          playsInline
          webkit-playsInline
          class="loading-video"
        >
          <track kind="captions" />
        </video>
      </div>
    {/if}

    {#if data !== null}
      <h3 class="product-name">M1X Macbook pro 16inch, 2022</h3>
      <div class="product-image-container">
        <img
          src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1633657358000"
          alt="macbook"
          class="product-image"
        />
      </div>
      <p class="product-description">
        M1X Macbook pro 16inch, 2022 64Gb 8TB<br />Final cut pro, Logic pro
      </p>
    {/if}
  </Content>
  <Actions>
    <Button>
      <Label>내 상품으로 이동</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  .loading-video-container {
    display: flex;
    justify-content: center;
  }
  .loading-video {
    width: 400px;
  }
  .product-image-container {
    display: flex;
    justify-content: center;
  }
  .product-image {
    height: 160px;
  }
</style>
