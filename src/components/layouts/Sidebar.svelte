<script lang="ts">
  import Drawer, { Content, Header, Title } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';

  export let open = true;

  const menu = [
    { id: 'products', name: '전체 상품' },
    { id: 'my', name: '내 상품' }
  ];

  let active = 'products';

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
        <Item href="javascript:void(0)" on:click={() => setActive(id)} activated={active === id}>
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
