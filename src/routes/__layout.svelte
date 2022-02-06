<script lang="ts">
  // @smui
  import Button from '@smui/button';
  import TopAppBar, { AutoAdjust, TopAppBarComponentDev } from '@smui/top-app-bar';
  import { Label } from '@smui/common';
  import { AppContent } from '@smui/drawer';
  // layouts
  import Sidebar from '../components/layouts/Sidebar.svelte';
  import HeaderBar from '../components/layouts/HeaderBar.svelte';

  let topAppBar: TopAppBarComponentDev;

  let open = true;
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
