<script lang="ts">
  import Card, { Content, PrimaryAction, Media } from '@smui/card';

  export let name = 'MacBook-pro M1X 16inch';
  export let description = 'MacBook-pro M1X 16inch';
  export let image = 'https://place-hold.it/320x180?text=16x9&fontsize=23';
  export let category = '전자제품/IT';

  $: console.log(image);
</script>

<div class="card-container">
  <Card>
    <PrimaryAction>
      <Media class="card-media-16x9" aspectRatio="16x9" style={`background-image: url(${image})`} />
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">{name}</h2>
        <p style="margin-top: 0;">
          {description}
        </p>
        <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #999;">
          {category}
        </h3>
      </Content>
    </PrimaryAction>
  </Card>
</div>

<style>
</style>
