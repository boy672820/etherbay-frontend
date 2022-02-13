<script lang="ts">
  // @smui
  import IconButton, { Icon } from '@smui/icon-button';
  // store
  import { user } from '../../store/user';
</script>

<IconButton on:click={user.loginMetamask}>
  <Icon class="material-icons">login</Icon>
</IconButton>
