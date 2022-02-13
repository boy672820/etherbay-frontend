<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  
  export let open = true;
  export let name = '요청 실패 😵';
  export let message = '요청 처리 중 문제가 발생했습니다.';
</script>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="mandatory-title"
  aria-describedby="mandatory-content"
  surface$style="max-width: calc(100vw - 32px);"
>
  <Title id="mandatory-title">{name}</Title>
  <Content id="mandatory-content">
    <p>{message}</p>
  </Content>
  <Actions>
    <Button>
      <Label>닫기</Label>
    </Button>
  </Actions>
</Dialog>
