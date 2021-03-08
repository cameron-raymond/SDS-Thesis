<script context="module">
  export async function preload() {
    const posts = await this.fetch(`mock-environment.json`).then(r => r.json());
    return { posts };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import Header from "../../components/EnvNav.svelte";
  import Card from "../../components/Card.svelte";
  export let posts;
  const time = 60 * 2;
  let dataLoaded = false;
  let started = false;
  let finished = false;
  let timeLeft = time;
  onMount(async () => {
    const res = await fetch(
      "https://randomuser.me/api/?inc=gender,name,picture&nat=us&results=" +
        posts.length
    ).then(res => res.json());
    for (const [index, post] of posts.entries()) {
      const data = res.results[index];
      post.gender = data.gender;
      post.profileImage = data.picture.thumbnail;
      post.username = data.name.first + "" + data.name.last;
      post.name = data.name.first + " " + data.name.last;
      post.timestamp = Math.floor(Math.random() * 59) + 1;
    }
    posts = posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    dataLoaded = true;
  });
  // A reactive block
  $: if (started && finished) {
    let toSubmit = posts.map(post => {
      let { text, profileImage, username, name, gender, ...y } = post;
      y.mockGender = gender;
      return y;
    });
    // POST DATA
    // alert(JSON.stringify(toSubmit));
    setTimeout(() => {
      console.log("HIII")
      goto(`/post-study-questionaire`);
    }, 15000);
  }
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
          <!-- binds the reshare variable in the child component to the post.reshared subfield in our array -->
          <Card {post} bind:reshared={post.reshared} />
        {/each}
      </span>
    {/if}
  {:else}
    <p>Thank you! You took {time - timeLeft} seconds.</p>
    <p>
      You will be automatically redirected to the post-study questionnaire in 15
      seconds. If that does not happen, please click on this link:
      <a href="/post-study-questionaire">post-study questionnaire</a>
      , to continue.
    </p>
  {/if}
{/if}
