<script lang="ts">
  import { onMount } from 'svelte';
  // @smui
  import IconButton, { Icon } from '@smui/icon-button';
  // libraries
  import { ethers } from 'ethers';
  // stores
  import { user } from '../../store/user';

  async function handleLogin() {
    if (typeof window === 'undefined') {
      return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    user.init({ accountAddress, signer });
  }

  onMount(() => {
    handleLogin();
  });
</script>

<IconButton on:click={handleLogin}>
  <Icon class="material-icons">login</Icon>
</IconButton>
