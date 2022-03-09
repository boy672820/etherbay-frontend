<script lang="ts">
  // @smui
  import Drawer, { Content, Header, Title } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  // modules
  import { page } from '$app/stores';
  import { routes } from '$lib/routes';

  export let open = true;

  let menu = [
    { path: routes.index, name: '전체 상품' },
    { path: routes.product.my, name: '내 상품' },
  ];
</script>

<Drawer variant="dismissible" bind:open>
  <Header>
    <Title>전체 메뉴</Title>
  </Header>
  <Content>
    <List>
      {#each menu as { path, name }, _i}
        <Item href={path} activated={$page.url.pathname === path}>
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
