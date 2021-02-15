<script>
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
  }
  .hide_link {
    position: absolute;
    visibility: hidden;
    bottom: 0;
    left: 0;
  }

  span {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 10px 10px 10px;
    height: 90px;
    width: 100vw;
    z-index: 2;
    display: flex;
  }
  .oii_blue_logo {
    background-image: url("/oii_logo.svg");
    width: 90px;
    height: 90px;
    margin-right: 12px;
  }
  .oxford_blue_logo {
    background-image: url("/oxford_logo.svg");
    width: 90px;
    height: 90px;
  }
  .buffer {
    height: 100px;
  }
  @media (max-width: 68rem) {
    span {
      background-color: white;
    }
  }
  @media (max-width: 40rem) {
    .oii_blue_logo {
      width: 70px;
      height: 70px;
      margin-right: 9px;
    }
    .oxford_blue_logo {
      width: 70px;
      height: 70px;
    }
    span {
      height: 70px;
    }
    .buffer {
      height: 80px;
    }
  }
</style>

<svelte:head>
  <title>OII Social Media Protest Experiment</title>
</svelte:head>

<div class="buffer" />

{#if !(segment === 'mock_environment')}
<span>
  <a href="https://www.oii.ox.ac.uk/">
    <div
      role="navigation"
      aria-label="Oxford Internet Institute"
      class="oii_blue_logo" />
  </a>
  <a href="https://www.ox.ac.uk/">
    <div
      role="navigation"
      aria-label="Oxford University"
      class="oxford_blue_logo" />
  </a>
</span>
{/if}
<main>
  <slot />
</main>

<a href="/mock_environment" class="hide_link" aria-label=" ">mock_env</a>
