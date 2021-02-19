<script context="module">
  export function preload() {
    return this.fetch(`mock-environment.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import Header from "../../components/EnvNav.svelte";
  import Card from "../../components/Card.svelte";
  export let posts;
  const time = 60;
  let started = true;
  let finished = false;
  let timeLeft = time;
</script>

<style>
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
  }
  .cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    margin: 0px -2em 0px -2em;
    padding: 0px 0px 0px 8em;
    border-top: 1px solid var(--grey-light);
  }
  .posts {
    border-left: 1px solid var(--grey-light);
    border-right: 1px solid var(--grey-light);
    max-width: 600px;
  }
  @media (max-width: 800px) {
    .cont {
      padding: 0;
    }
  }
</style>

<Header {time} bind:started bind:finished bind:timeLeft />
<h1>Social Media and Protests</h1>
<div class="subtitle">
  <p>
    Explain the experiment... Lorem ipsum lorem ispum lorem ispum lorem ipsum
    lorem ipsum lorem ipsum...
  </p>
</div>
{#if started}
  {#if !finished}
    <span class="cont">
        {#each posts as post, i}
          <Card {post} />
        {/each}
    </span>
  {:else}
    <p>Thank you! You took {time - timeLeft} seconds.</p>
  {/if}
{/if}
