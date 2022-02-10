<script lang="ts">
  // @smui
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Chip, { Set, Text } from '@smui/chips';
  import Button, { Label, Icon } from '@smui/button';
  import { user } from '../../store/user';
  import { product } from '../../store/product';

  const { signer } = user;
  const { isLoading, error } = product;

  let categories = ['IT/전자제품', '옷', '카메라', '소모품'];

  let name = '',
    description = '',
    image = '',
    category = categories[0];

  const handleSubmit = () => {
    product
      .connect($signer)
      .createProduct({ name, category, description, image })
      .catch((e) => console.log(e));
  };
</script>

<svelte:head>
  <title>etherBay | 상품 등록</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <div class="columns margins">
    <div>
      <Textfield
        class="shaped-outlined"
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="상품명"
        required
      >
        <HelperText slot="helper">상품명은 필수 입니다.</HelperText>
      </Textfield>
    </div>
    <div>
      <Textfield
        class="shaped-outlined"
        style="width: 100%; height: 140px;"
        variant="outlined"
        bind:value={description}
        label="설명"
        textarea
        required
      >
        <HelperText slot="helper">상품 설명은 필수 입니다.</HelperText>
      </Textfield>
    </div>
    <div>
      <Textfield
        class="shaped-outlined"
        style="width: 100%;"
        variant="outlined"
        bind:value={image}
        label="이미지"
        required
      >
        <HelperText slot="helper">이미지 링크를 올려주세요.</HelperText>
      </Textfield>
    </div>
    <div>
      <div>카테고리 선택*</div>
      <Set chips={categories} let:chip choice bind:selected={category}>
        <Chip {chip}>
          <Text>{chip}</Text>
        </Chip>
      </Set>
    </div>
    <div style="padding-top: 16px;">
      <Button variant="raised" class="button-shaped-round">
        <Icon class="material-icons">favorite</Icon>
        <Label>상품 추가하기</Label>
      </Button>
    </div>
  </div>
</form>

<style>
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
    max-width: calc(100% - 28px * 2);
  }
  *
    :global(.shaped-outlined.mdc-text-field--with-leading-icon:not(.mdc-text-field--label-floating)
      .mdc-floating-label) {
    left: 16px;
  }
  * :global(.shaped-outlined + .mdc-text-field-helper-line) {
    padding-left: 32px;
    padding-right: 28px;
  }
</style>
