<script lang="ts">
  import { onMount } from 'svelte';
  import axios from '$lib/axios';
  // @smui
  import Button from '@smui/button';
  import TopAppBar, { AutoAdjust, TopAppBarComponentDev } from '@smui/top-app-bar';
  import { Label } from '@smui/common';
  import { AppContent } from '@smui/drawer';
  // layouts
  import Sidebar from '../components/layouts/Sidebar.svelte';
  import HeaderBar from '../components/layouts/HeaderBar.svelte';
  // stores
  import { user } from '../store/user';

  let topAppBar: TopAppBarComponentDev;

  let open = true;

  const handleSignature = async (accountAddress: string) => {
    console.log('Signature call!');
    const nonce = await user.getNonce(accountAddress);
    const signature = await user.personalSign(nonce);

    const data = {
      username: accountAddress,
      password: signature
    };
    const jwt = await user.signIn(data);

    window.localStorage.setItem('accessToken', jwt);
    axios.defaults.headers.Authorization = `Bearer ${jwt}`;
  };

  onMount(async () => {
    const provider = await user.connectMetamask();
    const isAuth = user.setAuth();

    user.onAccountsChanged(handleSignature);

    if (!isAuth && provider) {
      const { accountAddress } = provider;

      handleSignature(accountAddress);
    }
  });
</script>

<TopAppBar bind:this={topAppBar} variant="fixed">
  <HeaderBar />
</TopAppBar>

<AutoAdjust {topAppBar}>
  <div class="drawer-container">
    <Sidebar {open} />
    <AppContent class="app-content">
      <main class="main-content">
        <Button on:click={() => (open = !open)}>
          <Label>전체메뉴 {open ? '닫기' : '열기'}</Label>
        </Button>
        <slot />
      </main>
    </AppContent>
  </div>
</AutoAdjust>

<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    height: calc(100vh - 64px);
    position: relative;
    display: flex;
    border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
</style>
