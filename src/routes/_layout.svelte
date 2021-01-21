<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    /* max-width: 56em; */
    background-color: white;
    padding: 4em 2em 2em 2em;
    display: flex;
    flex-direction: column;
    position: relative;
    /* margin: 0 auto; */
    /* box-sizing: border-box; */
  }
</style>

<!-- <Nav {segment}/> -->

<main>
  <slot />
</main>
