<script lang="ts">
  import CircularProgress from '@smui/circular-progress';
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
  surface$style="max-width: calc(100vw - 32px);"
>
  <Title id="mandatory-title">로딩 중 입니다 🙏</Title>
  <Content id="mandatory-content">
    <div style="display: flex; justify-content: center">
      <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
  </Content>
  <Actions>
    <Button disabled>
      <Label>닫기</Label>
    </Button>
  </Actions>
</Dialog>
