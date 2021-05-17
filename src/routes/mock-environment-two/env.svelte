<script context="module">
  export function preload() {
    // UPDATE
    const url =
      "/.netlify/functions/posts?affirms=10&denies=10&neutral=4&questions=4";
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
  import Video from "../../components/Video.svelte";
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
    if ($condition == "treatment") {
      let lowEvaffirms = posts
        .map((e, i) => (e.evidence === "low" && e.code === "affirms" ? i : -1))
        .filter(x => x > -1);
      let numIndicators = Math.ceil(lowEvaffirms.length * 0.75);
      let credIndicators = lowEvaffirms
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
    let simplePosts = posts.map(post => {
      let { text, profileImage, username, name, gender, ...y } = post;
      y.mockGender = gender;
      return y;
    });
    const timeSubmitted = new Date().toISOString();
    let toSubmit = {
      PROLIFIC_PID: $PROLIFIC_PID,
      SESSION_ID: $SESSION_ID,
      STUDY_ID: $STUDY_ID,
      condition: $condition,
      timeSubmitted: timeSubmitted,
      secondsTaken: time - timeLeft,
      posts: simplePosts
    };
    const url = "/.netlify/functions/azure?collection=rumour-two-results";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(toSubmit),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log("POST error", err.message);
    });
    goto(`/post-study-questionnaire`);
  }
</script>

<style>
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
    padding-bottom: 2.5rem;
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
    <h1>Protest Scenario Two: Mock Environment</h1>
    <div class="subtitle">
      <p>Please read all of these instructions before pressing "Start"</p>
      <p>
        Now that you've watched the video from the previous screen, we would
        like you to interact with a mock-social media feed as if you were in the
        scenario described below.
      </p>
      <p>
        Your task is to reshare social media posts that you would feel are
        relevant given the video you've watched and the scenario described
        below. You may do this by pressing the "reshare" button on the bottom
        right-hand corner of a post.
        <strong>
          You will be given two minutes to reshare posts, at which time you will
          move on to the next scenario.
        </strong>
      </p>
      <p>
        You may end the study at any time without penalty. Please do not refer
        to outside sources during the study.
      </p>
      <p style="margin: 0 0 -0.5em 0;">
        <strong>Scenario:</strong>
      </p>
      <blockquote>
        <p>UPDATE UPDATE UPDATE UPDATE</p>
      </blockquote>

      <p>
        Press the "Start" button at the top of your screen to enter the social
        media environment.
      </p>

      {#if started && !seenPosts}
        <span class="down-arrow" in:fly={{ y: -100, duration: 325 }}>
          <FaAngleDown />
        </span>
      {/if}
    </div>
  </span>
{/if}
{#if started}
  {#if !finished}
    {#if dataLoaded}
      <span class="cont">
        {#each posts as post, i}
          {#if i == 1}
            <!-- InView component keeps track of whether a post has come into view (useful for removing the down chevron indicator) -->
            <InView bind:hasBeenVisible={seenPosts}>
              <Card
                {post}
                bind:reshared={post.reshared}
                bind:clickedWarning={post.clickedWarning}
                warning={post.warning ? CredibilityIndicator : undefined}
                rumour="R2" />
            </InView>
          {:else}
            <!-- binds the reshare variable in the child component to the post.reshared subfield in our array -->
            <Card
              {post}
              bind:reshared={post.reshared}
              bind:clickedWarning={post.clickedWarning}
              warning={post.warning ? CredibilityIndicator : undefined}
              rumour="R2" />
          {/if}
        {/each}
      </span>
    {/if}
  {:else}
    <span class="container">
      <h1>Protest Scenario Two: Mock Environment</h1>
      <p>
        You will automatically be redirected to the next protest scenario. If
        that does not happen, please click on this link:
        <a href="/post-study-questionnaire">post-study questionnaire,</a>
        to continue.
      </p>
    </span>
  {/if}
{/if}
