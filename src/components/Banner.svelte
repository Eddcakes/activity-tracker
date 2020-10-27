<script>
  import AvatarButton from './AvatarButton.svelte'
</script>

<div class="banner">
  <div>icon/branding</div>
  <div>theme toggle</div>
  <div>
    <AvatarButton />
  </div>
</div>

<style>
  .banner {
    display: flex;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    align-items: center;
    justify-content: space-evenly;
    padding: 0 1em;
  }
</style>

