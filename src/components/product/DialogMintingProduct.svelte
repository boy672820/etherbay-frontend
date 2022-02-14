<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';

  export let open = false;
</script>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="mandatory-title"
  aria-describedby="mandatory-content"
  surface$style="width: 500px; max-width: calc(100vw - 32px);"
>
  <Title id="mandatory-title">상품 등록 중 🤖</Title>
  <Content id="mandatory-content">
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
</style>
