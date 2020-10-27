<script>
  import Banner from "../components/Banner.svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<header>
  <Banner />
  <Nav {segment} />
</header>

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
