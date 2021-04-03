<script context="module">
  export async function preload() {
    const posts = await this.fetch(`mock-environment.json`).then(r => r.json());
    return { posts };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import { fly } from "svelte/transition";
  import Header from "../../components/EnvNav.svelte";
  import Card from "../../components/Card.svelte";
  import CredibilityIndicator from "../../components/CredibilityIndicator.svelte"
  import { FaAngleDown } from "svelte-icons/fa";
  import {
    PROLIFIC_PID,
    SESSION_ID,
    STUDY_ID,
    condition
  } from "../../stores/local-store";
  export let posts;
  const time = 60 * 10;
  let treatment = Math.random() > 0.5 ? true : false;
  let dataLoaded = false;
  let started = false;
  let finished = false;
  let timeLeft = time;
  let y = 0;
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
    let simplePosts = posts.map(post => {
      let { text, profileImage, username, name, gender, ...y } = post;
      y.mockGender = gender;
      return y;
    });
    let toSubmit = {
      PROLIFIC_PID: $PROLIFIC_PID,
      SESSION_ID: $SESSION_ID,
      STUDY_ID: $STUDY_ID,
      treatment: treatment,
      secondsTaken: time - timeLeft,
      posts: simplePosts
    };
    // POST DATA
    console.log(JSON.stringify(toSubmit));
    setTimeout(() => {
      goto(`/post-study-questionnaire`);
    }, 15000);
  }

  $: if (dataLoaded && $condition == "treatment") {
    let lowEvaffirms = posts.map((e, i) =>  e.evidence === "low" && e.code === "affirms" ? i : -1).filter(x => x > -1);
    let numIndicators = Math.ceil(lowEvaffirms.length / 2)
    let credIndicators = lowEvaffirms.sort(() => .5 - Math.random()).slice(0,numIndicators)
    for (const i of credIndicators){
      posts[i].warning = true;
    }
  } else {
    posts = posts.map(post => {
      post.warning = false;
      return post
    });
  }
</script>

<style>
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
    padding-bottom: 2.5rem;
  }
  .note {
    color: var(--red);
  }
  .cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    margin: 0px -2em 0px -2em;
    padding: 0px 0px 0px 8em;
    border-top: 1px solid var(--grey-light);
    background-color: white;
    z-index: 2;
  }
  .down-arrow {
    display: inline-block;
    position: fixed;
    bottom: 3em;
    left: 50%;
    color: var(--orange);
    height: 2.5rem;
    width: 2.5rem;
    z-index: 1;
  }
  @media (max-width: 40rem) {
    .down-arrow {
      height: 1.75rem;
      width: 1.75rem;
    }
  }

  @media (max-width: 800px) {
    .cont {
      padding: 0;
    }
  }
</style>

<svelte:window bind:scrollY={y} />

<Header {time} bind:started bind:finished bind:timeLeft />
<h1>Social Media and Protests</h1>
{#if !finished}
  <div class="subtitle">
    <p>
      In this study, we will describe the context of a particular protest
      scenario. We will then ask you to participate in a simulated social media
      environment as if you were in the scenario described. Specifically, we
      would like you to share information that you feel is relevant for other
      demonstrators to be aware of given the protest scenario. You can reshare
      information by pressing the "reshare" button on the bottom right-hand
      corner of a post.
    </p>
    <p>
      This task involves a description of a scenario and real content from
      social media activity during recent protests.
      <span class="note">
        Please do not particate if you anticipate that this content may cause
        you significant distress.
      </span>
      You may end the experiment at any time without penalty. Please do not
      refer to outside sources during the experiment. You will have two minutes
      in the environment to reshare information. If you finish choosing what
      posts to reshare early, you can press the "I'm Done" button at the top of
      your screen.
    </p>
    <p>Press the "START" button at the top of your screen to begin.</p>
    {#if started && y < 100}
      <span class="down-arrow" in:fly={{ y: -50, duration: 300 }}>
        <FaAngleDown />
      </span>
    {/if}
  </div>
{/if}
{#if started}
  {#if !finished}
    {#if dataLoaded}
      <span class="cont">
        {#each posts as post, i}
          <!-- binds the reshare variable in the child component to the post.reshared subfield in our array -->
          <Card {post} bind:reshared={post.reshared} warning={post.warning ? CredibilityIndicator : undefined}/>
        {/each}
      </span>
    {/if}
  {:else}
    <p>Thank you! You took {time - timeLeft} seconds.</p>
    <p>
      You will be automatically redirected to the post-study questionnaire in 15
      seconds. If that does not happen, please click on this link:
      <a href="/post-study-questionnaire">post-study questionnaire</a>
      , to continue.
    </p>
  {/if}
{/if}
