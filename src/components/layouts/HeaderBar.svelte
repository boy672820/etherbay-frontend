<script lang="ts">
  // @smui
  import IconButton, { Icon } from '@smui/icon-button';
  import { Row, Section } from '@smui/top-app-bar';
  // components
  import Avatar from './Avatar.svelte';
  import Login from './Login.svelte';
  // config
  import { routes } from '$lib/routes';
  // store
  import { user } from '../../store/user';

  const { isLogin } = user;

  let lightTheme =
    typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: dark)').matches;

  function switchTheme() {
    lightTheme = !lightTheme;

    let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = 'theme';
    }

    themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;

    document.head
      .querySelector<HTMLLinkElement>('link[href="/smui-dark.css"]')
      ?.insertAdjacentElement('afterend', themeLink);
  }
</script>

<Row>
  <Section toolbar>
    <a sveltekit:prefetch href={routes.index}>
      <img src="/logo.png" alt="etherbay" class="logo" />
    </a>
  </Section>
  <Section align="end" toolbar>
    {#key $isLogin}
      {#if $isLogin}
        <Avatar />
      {:else}
        <Login />
      {/if}
    {/key}

    <IconButton on:click={switchTheme}>
      <Icon class="material-icons">{lightTheme ? 'mode_night' : 'wb_sunny'}</Icon>
    </IconButton>
  </Section>
</Row>

<style>
  .logo {
    height: 32px;
    padding: 0 8px;
  }
</style>
