<script context="module">
  export async function preload() {
    const posts = await this.fetch(`mock-environment.json`).then(r => r.json());
    return { posts };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import Header from "../../components/EnvNav.svelte";
  import Card from "../../components/Card.svelte";
  export let posts;
  const time = 60;
  let dataLoaded = false;
  let started = false;
  let finished = false;
  let timeLeft = time;

  onMount(async () => {
    const res = await fetch(
      "https://randomuser.me/api/?inc=gender,name,picture&nat=us,ca,gb&results=" +
        posts.length
    ).then(res => res.json());
    for (const [index, post] of posts.entries()) {
      const data = res.results[index];
      post.gender = data.gender;
      post.profileImage = data.picture.thumbnail;
      post.username = data.name.first + "" + data.name.last;
      post.name = data.name.first + " " + data.name.last;
      post.timestamp = Math.floor(Math.random() * 60) + 1;
    }
    dataLoaded = true;
  });
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
    {#if dataLoaded}
      <span class="cont">
        {#each posts as post, i}
          <Card {post} />
        {/each}
      </span>
    {/if}
  {:else}
    <p>Thank you! You took {time - timeLeft} seconds.</p>
  {/if}
{/if}
