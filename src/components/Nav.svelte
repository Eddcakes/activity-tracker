<script>
  export let segment;
  let innerWidth;
</script>

<svelte:window bind:innerWidth/>

<nav>
  {#if innerWidth > 640}
  <ul class="top-nav">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>
  </ul>
  {:else}
  <ul class="bottom-nav">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>
    <li>
      {innerWidth}
    </li>
</ul>
{/if}
</nav>

<style>
  .top-nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  /* clearfix */
  .top-nav::after {
    content: '';
    display: block;
    clear: both;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .bottom-nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    z-index: 20;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 5em;
    box-shadow: 0 -10px 10px rgba(0,0,0,0.2);
  }
</style>