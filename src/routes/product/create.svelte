<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { routes } from '$lib/routes';
  // @smui
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Chip, { Set, Text } from '@smui/chips';
  import Button, { Label, Icon } from '@smui/button';
  // stores
  import { user } from '../../store/user';
  import { productStore } from '../../store/product';
  // components
  import DialogException from '../../components/DialogException.svelte';
  import DialogMintingProduct from '../../components/product/DialogMintingProduct.svelte';
  import DialogMintedProduct from '../../components/product/DialogMintedProduct.svelte';
  // libraries
  import * as Yup from 'yup';

  const { isAuth, accountAddress } = user;
  const { isLoading, error, product } = productStore;

  // 인증 정보가 없을 경우, 비인증 안내 페이지로 이동
  $: if (browser && !$isAuth) {
    goto(routes.unauthorized);
  }

  let categories = ['IT/전자제품', '옷', '카메라', '소모품'];

  let name: string = '',
    description: string = '',
    image: FileList | null = null,
    category: string = categories[0];

  const schema = Yup.object().shape({
    name: Yup.string().required('상품명을 입력해주세요.'),
    description: Yup.string().required('상품 설명을 입력해주세요.'),
    image: Yup.mixed().required('상품 이미지를 선택해주세요.'),
    category: Yup.string().required('카테고리를 선택해주세요.')
  });

  const handleSubmit = async () => {
    if (!image) {
      return;
    }

    const data = { name, description, image: image[0], category };

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (e: any) {
      const errors = e.inner.reduce((acc: any, err: any) => ({ ...acc, [err.path]: err.message }));

      alert(errors.message);
    }

    productStore.createProduct(data);
  };

  const handleClose = () => {
    productStore.initProduct();
  };
</script>

<svelte:head>
  <title>etherBay | 상품 등록</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <div class="columns margins">
    <div>
      <div>카테고리 선택*</div>
      <Set chips={categories} let:chip choice bind:selected={category}>
        <Chip {chip}>
          <Text>{chip}</Text>
        </Chip>
      </Set>
    </div>

    <div style="padding-top: 16px;">
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

    <div class="hide-file-ui">
      <Textfield
        type="file"
        class="shaped-outlined"
        style="width: 100%;"
        variant="outlined"
        bind:files={image}
        label="이미지"
        required
      />
    </div>

    <div style="padding-top: 16px;">
      <Button variant="raised" class="button-shaped-round" disabled={$isLoading}>
        <Icon class="material-icons">favorite</Icon>
        <Label>
          {#if $isLoading}상품 등록 중{:else}상품 추가하기{/if}
        </Label>
      </Button>
    </div>
  </div>
</form>

<DialogMintingProduct open={$isLoading} accountAddress={$accountAddress} />
<DialogMintedProduct
  open={!!$product}
  data={$product}
  accountAddress={$accountAddress}
  {handleClose}
/>
<DialogException open={!!$error} message={$error?.message} />

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

  .hide-file-ui :global(input[type='file']::file-selector-button) {
    display: none;
  }
  .hide-file-ui :global(:not(.mdc-text-field--label-floating) input[type='file']) {
    color: transparent;
  }
</style>
