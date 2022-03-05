<script lang="ts">
  // @smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<div class="container">
  <div class="error-layout">
    <div class="error-code"><i>401</i></div>
    <div class="error-desc">
      <h1>인증되지 않은 사용자 😧</h1>
      <div>메타마스크 서명 후 이용해주세요.</div>
    </div>
  </div>
</div>

<style>
  .error-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .error-code {
    font-size: 8rem;
    font-weight: bold;
  }
  .error-desc {
    padding-left: 40px;
  }
</style>
