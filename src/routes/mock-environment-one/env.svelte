<script context="module">
  export function preload() {
    const url =
      "/.netlify/functions/R1?affirms=10&denies=10&neutral=4&questions=4";
    return this.fetch(url)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      })
      .catch(err => console.log(err));
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { fly } from "svelte/transition";
  import Header from "../../components/EnvNav.svelte";
  import Card from "../../components/Card.svelte";
  import InView from "../../components/LazyLoad.svelte";
  import CredibilityIndicator from "../../components/CredibilityIndicator.svelte";
  import { FaAngleDown } from "svelte-icons/fa";
  import {
    PROLIFIC_PID,
    SESSION_ID,
    STUDY_ID,
    condition
  } from "../../stores/local-store";
  export let posts;
  const time = 60 * 2;
  let dataLoaded = false;
  let started = false;
  let finished = false;
  let timeLeft = time;
  var seenPosts = false;
  onMount(async () => {
    // Add random attributes like user picture and timestamp
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
    // Add credibility indicators
    if ($condition === "treatment") {
      let highEvDen = posts
        .map((e, i) => (e.evidence === "high" && e.code === "denies" ? i : -1))
        .filter(x => x > -1);
      let numIndicators = Math.ceil(highEvDen.length * 0.75);
      let credIndicators = highEvDen
        .sort(() => 0.5 - Math.random())
        .slice(0, numIndicators);
      for (const i of credIndicators) {
        posts[i].warning = true;
      }
    }
    dataLoaded = true;
  });
  // A reactive block for posting the data to the server.
  $: if (started && finished) {
    goto(`/mock-environment-two/video`);
  }
</script>

<style>
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
    padding-bottom: 2.5rem;
  }
  .hidden {
    visibility: hidden;
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
    color: var(--orange);
    font-weight: bold;
    position: fixed;
    text-align: center;
    bottom: 9em;
    left: 50%;
    height: 3rem;
    width: 3rem;
    z-index: 1;
  }

  @media (max-width: 40rem) {
    .down-arrow {
      height: 2.5rem;
      width: 2.5rem;
    }
  }

  @media (max-width: 800px) {
    .cont {
      padding: 0;
    }
  }
</style>

<Header {time} bind:started bind:finished bind:timeLeft />
{#if !finished}
  <span class="container">
    <h1>Protest Scenario One (1/2)</h1>
    <div class="subtitle">
      <strong class:hidden={!started}>
        Scroll down, or
        <a href="mock-environment-one/env#feed">
          click here to jump to the social media feed
        </a>
      </strong>
      <p>Please read all of these instructions before pressing "Start".</p>
      <p>
        Now that you've watched the video from the previous screen, we would
        like you to interact with a simulated social media feed as if you were
        in the scenario described below.
      </p>
      <p>
        Your task will be to reshare social media posts that you would feel are
        relevant given the video you've watched and the scenario described
        below. You may do this by pressing the "reshare" button on the bottom
        right-hand corner of a post.
        <strong>
          You will be given two minutes to reshare posts, at which time you will
          move on to the next scenario.
        </strong>
      </p>
      <p>
        Please only reshare posts that you might consider sharing yourself in
        the described situation.
      </p>
      <p>
        You may end the study at any time without penalty. Please do not refer
        to outside sources during the study.
      </p>
      <p style="margin: 0 0 -0.5em 0;">
        <strong>Scenario:</strong>
      </p>
      <blockquote>
        <p>
          You are on your way to a protest when you see on your social media
          feed the video from the previous screen, which appears to show a
          protestor being taken and driven away in an unmarked van. You
          recognize the video's background as close to the place where your
          protest is being held.
        </p>
        <p>
          You check the news, but it's not being covered by your local news
          station when you check.
        </p>
        <p>
          As you scroll further through your social media feed, you see that
          this video is the main topic of conversation.
        </p>
        <strong>
          Please consider which of the following posts in your feed you might
          think that other protestors should be aware of.
        </strong>
      </blockquote>

      <p>
        Press the "Start" button at the bottom of your screen to start the timer
        and view your mock social media feed.
      </p>
      <strong class:hidden={!started}>
        Scroll down, or
        <a href="mock-environment-one/env#feed">
          click here to jump to the social media feed
        </a>
      </strong>

      {#if started && !seenPosts}
        <span class="down-arrow" in:fly={{ y: -100, duration: 325 }}>
          <small style="margin: 0 0 -8px;">Scroll Down</small>
          <FaAngleDown />
        </span>
      {/if}
    </div>
  </span>
{/if}
{#if started}
  {#if !finished}
    {#if dataLoaded}
      <span class="cont" id="feed">
        {#each posts as post, i}
          {#if i == 1}
            <!-- InView component keeps track of whether a post has come into view (useful for removing the down chevron indicator) -->
            <InView bind:hasBeenVisible={seenPosts}>
              <Card
                {post}
                bind:reshared={post.reshared}
                bind:clickedWarning={post.clickedWarning}
                warning={post.warning ? CredibilityIndicator : undefined}
                rumour="R1" />
            </InView>
          {:else}
            <!-- binds the reshare variable in the child component to the post.reshared subfield in our array -->
            <Card
              {post}
              bind:reshared={post.reshared}
              bind:clickedWarning={post.clickedWarning}
              warning={post.warning ? CredibilityIndicator : undefined}
              rumour="R1" />
          {/if}
        {/each}
      </span>
    {/if}
  {:else}
    <span class="container">
      <h1>Protest Scenario One (1/2)</h1>
      <p>
        You will automatically be redirected to the next protest scenario. If
        that does not happen, please click on this link:
        <a href="/mock-environment-two/video">mock-environment two,</a>
        to continue.
      </p>
    </span>
  {/if}
{/if}
