<script>
  import userIcon from "../icons/userIcon.svg";

  let isOpen = false;

  const toggleMenu = () => (isOpen = !isOpen);

  const closeMenu = () => (isOpen = false);

  // this is pretty awesome 👀
  $: if (process.browser) document.body.style.overflow = isOpen ? "hidden" : "";
</script>

<div class="avatar-container">
  <button class="avatar-btn" type="button" on:click={toggleMenu}>
    <img src={userIcon} alt="Your avatar" />
  </button>
  {#if isOpen}
    <!-- may want to change to an action that detects click outside of menu rather than a btn -->
    <button class="hide-menu-btn" on:click={closeMenu} tabindex="-1" />
    <div class="menu-container">
      <ul>
        <li>
          <a href=".">Account</a>
        </li>
        <li>
          <button>theme</button>
        </li>
        <li>
          <button>Sign in</button>
        </li>
      </ul>
    </div>
  {/if}
</div>

<style>
  .avatar-container {
    position: relative;
  }

  .avatar-btn {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    border-width: 2px;
    border-color: #ff5b05; /* #ff3e00 */
    border-style: solid;
    padding: 0.75rem;
    overflow: hidden;
    margin: 0.25rem;
    z-index: 20;
  }

  .avatar-btn:hover {
    background-color: #ffc394;
  }

  .avatar-btn:focus {
    outline: none;
    border-color: #df4a06;
    background-color: #ffc394;
  }

  .avatar-btn:active {
    background-color: #ffa466;
  }

  img {
    object-fit: cover;
  }

  /* full screen overlay to hide menu */
  .hide-menu-btn {
    background-color: lightgray;
    opacity: 0.6;
    cursor: default;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    outline: 0;
  }

  .menu-container {
    position: absolute;
    right: 0;
    background-color: #ffdcbd; /*  #fff7f0 */
    border-radius: 0.5rem;
    width: 16rem;
    z-index: 20;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    color: #71240e;
  }

  li:hover {
    background-color: #ffc394;
  }

  li:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  li:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  li button,
  li a {
    text-decoration: none;
    display: inline-block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 100%;
    text-align: center;
  }
</style>
