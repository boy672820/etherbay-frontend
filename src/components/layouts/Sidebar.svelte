<script lang="ts">
  // @smui
  import Drawer, { Content, Header, Title } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  // modules
  import { page } from '$app/stores';
  import { routes } from '$lib/routes';
  // store
  import { user } from '../../store/user';

  const { accountAddress } = user;

  export let open = true;

  const menu = [{ path: routes.index, name: '전체 상품' }];

  accountAddress.subscribe(
    (accountAddress) =>
      accountAddress && menu.push({ path: routes.product.my(accountAddress), name: '내 상품' })
  );
</script>

<Drawer variant="dismissible" bind:open>
  <Header>
    <Title>전체 메뉴</Title>
  </Header>
  <Content>
    <List>
      {#each menu as { path, name }, i}
        <Item href={path} activated={$page.url.pathname === path}>
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
