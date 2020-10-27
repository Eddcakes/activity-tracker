<script>
  export let segment;
  let innerWidth;
</script>

<svelte:window bind:innerWidth />

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
      <li>
        <a
          aria-current={segment === 'graffs' ? 'page' : undefined}
          href="graffs">
          graffs
        </a>
      </li>
    </ul>
  {:else}
    <ul class="bottom-nav">
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
              1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1
              0 001 1m-6 0h6" />
          </svg>
          <span>home</span>
        </a>
      </li>
      <li>
        <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>about</span>
        </a>
      </li>
      <li>
        <a
          aria-current={segment === 'graffs' ? 'page' : undefined}
          href="graffs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1
              1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span>graffs</span>
        </a>
      </li>
    </ul>
  {/if}
</nav>

<style>
  .top-nav {
    font-weight: 300;
  }

  /* clearfix */
  .top-nav::after {
    content: "";
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

  [aria-current] svg {
    color: rgb(255, 62, 0);
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: 0.8rem;
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
    z-index: 5;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 5em;
    box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff5eb;
  }

  .bottom-nav a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bottom-nav svg {
    width: 1.5rem;
  }
</style>
