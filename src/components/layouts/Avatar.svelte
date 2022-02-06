<script lang="ts">
  // @smui
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Menu, { MenuComponentDev } from '@smui/menu';
  import { Anchor } from '@smui/menu-surface';
  import List, { Item, Text, Graphic } from '@smui/list';
  import { routes } from '../../config/routes';
  // store

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
        <Text><Button href={routes.product.create}><Label>상품 등록하기</Label></Button></Text>
      </Item>
    </List>
  </Menu>
</div>
