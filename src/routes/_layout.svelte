<script>
  import Nav from "../components/Nav.svelte";
  import AvatarButton from "../components/AvatarButton.svelte";

  export let segment;
</script>

<header>
  <div class="banner">
    <div class="branding">
      <svg
        class="placeholder-logo"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <div class="name">
        <span class="top-text">Activity</span>
        <span class="bottom-text">Tracker</span>
      </div>

    </div>

    <div>
      <Nav {segment} />
    </div>
    <div>
      <AvatarButton />
    </div>
  </div>
</header>

<main>
  <slot />
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
  .banner {
    display: flex;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    background-color: #fff5eb;
  }

  .branding {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .branding .name {
    font-family: "Permanent Marker", cursive;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    line-height: 0.8;
  }

  .branding .top-text {
    padding-left: 0.4rem;
    transform: rotate(5deg);
  }
  .branding .bottom-text {
    padding-left: 1.8rem;
    transform: rotate(-4deg);
  }

  .placeholder-logo {
    width: 3rem;
    transform: rotate(10deg);
    fill: #ffc394;
  }

  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
