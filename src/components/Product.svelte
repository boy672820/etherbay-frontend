<script lang="ts">
  import Card, {
    Content,
    PrimaryAction,
    Media,
    Actions,
    ActionButtons,
    ActionIcons
  } from '@smui/card';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
</script>

<div class="card-container">
  <Card>
    <PrimaryAction>
      <Media class="card-media-16x9" aspectRatio="16x9" />
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">MacBook-pro M1X 16inch</h2>
        <p style="margin-top: 0;">
          MacBook-pro M1X 16inch, Space Gray, 64GB Memory, 8TB SSD Storage, Pre-Installed "Final Cut
          Pro" and "Logic Pro"
        </p>
        <h3 class="mdc-typography--subtitle2"   style="margin: 0 0 10px; color: #999;">
          7,980,000원
        </h3>
      </Content>
    </PrimaryAction>
  </Card>
</div>

<style>
  * :global(.card-media-16x9) {
    background-image: url(https://place-hold.it/320x180?text=16x9&fontsize=23);
  }
</style>
