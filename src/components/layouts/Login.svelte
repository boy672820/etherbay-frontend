<script lang="ts">
  // @smui
  import IconButton, { Icon } from '@smui/icon-button';
  // libraries
  import { ethers } from 'ethers';
  // stores
  import { user } from '../../store/user';

  async function handleLogin() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    user.init({ accountAddress, signer });
  }

  $: if (typeof window !== 'undefined') {
    handleLogin();
  }
</script>

<IconButton on:click={handleLogin}>
  <Icon class="material-icons">login</Icon>
</IconButton>
