<script context="module">
  export function preload() {
    return this.fetch(`mock_environment.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import Card from "../../components/Card.svelte";
  export let posts;
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
  }
  .title {
    display: flex;
    flex-direction: row;
  }
  .title h2 {
    margin-left: 0.7rem;
  }
  h1 {
    margin-top: 4rem;
    max-width: 58rem;
  }
  .tags {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .postFilter {
    margin-bottom: 3rem;
  }
  .tags span {
    display: flex;
  }
  @media (max-width: 40rem) {
    .title h2 {
      margin-left: 0.4rem;
    }
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>
<h1>COVID-19 and Social Media</h1>
<div class="subtitle">
  <p>
    Explain the experiment... Lorem ipsum lorem ispum lorem ispum lorem ipsum
    lorem ipsum lorem ipsum...
  </p>
</div>
<span class="content">
  {#each posts as post, i}
    <Card {post} />
  {/each}
</span>
