<script lang="ts">
  // @smui
  import Drawer, { Content, Header, Title } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  // modules
  import { page } from '$app/stores';

  export let open = true;

  const menu = [
    { id: '/', name: '전체 상품' },
    { id: '/my', name: '내 상품' }
  ];

  function setActive(value: string) {
    active = value;
  }
</script>

<Drawer variant="dismissible" bind:open>
  <Header>
    <Title>전체 메뉴</Title>
  </Header>
  <Content>
    <List>
      {#each menu as { id, name }, i}
        <Item
          href="javascript:void(0)"
          on:click={() => setActive(id)}
          activated={$page.url.pathname === id}
        >
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
