<script lang="ts">
  import IconButton, { Icon } from '@smui/icon-button';
  import Menu, { MenuComponentDev } from '@smui/menu';
  import { Anchor } from '@smui/menu-surface';
  import List, { Item, Text, Graphic } from '@smui/list';

  let menu: MenuComponentDev;
  let anchor: HTMLDivElement;
  let anchorClasses: { [k: string]: boolean } = {};
</script>

<div
  class={Object.keys(anchorClasses).join(' ')}
  use:Anchor={{
    addClass: (className) => {
      if (!anchorClasses[className]) {
        anchorClasses[className] = true;
      }
    },
    removeClass: (className) => {
      if (anchorClasses[className]) {
        delete anchorClasses[className];
        anchorClasses = anchorClasses;
      }
    }
  }}
  bind:this={anchor}
>
  <IconButton on:click={() => menu.setOpen(true)}>
    <Icon class="material-icons">account_circle</Icon>
  </IconButton>
  <Menu bind:this={menu} anchor={false} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
    <List dense>
      <Item>
        <Graphic class="material-icons">card_giftcard</Graphic>
        <Text>상품 등록하기</Text>
      </Item>
      <Item>
        <Graphic class="material-icons">assignment_ind</Graphic>
        <Text>내 정보 수정</Text>
      </Item>
    </List>
  </Menu>
</div>
