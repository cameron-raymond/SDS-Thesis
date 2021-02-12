<script>

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
  }
    a{
    position: absolute;
    visibility: hidden;
    bottom: 0;
    left: 0;
  }
</style>

<svelte:head>
  <title>OII Social Media Protest Experiment</title>
</svelte:head>

<main>
  <slot />
</main>

<a href="/mock_environment" aria-label=" ">mock_env</a>