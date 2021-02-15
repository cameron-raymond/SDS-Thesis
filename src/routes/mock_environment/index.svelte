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
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
  }
</style>

<h1>Social Media and Protests</h1>
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
