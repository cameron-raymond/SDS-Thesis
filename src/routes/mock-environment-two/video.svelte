<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { fly } from "svelte/transition";
  import Video from "../../components/Video.svelte";
  import {
    PROLIFIC_PID,
    SESSION_ID,
    STUDY_ID,
    condition
  } from "../../stores/local-store";
</script>

<style>
  button {
    display: flex;
    align-self: center;
    text-decoration: none;
    margin-top: 1.25rem;
  }
  .video {
    margin-left: 0;
    width: 100%;
  }
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
  }
  .note {
    color: var(--red);
  }
</style>

<span class="container">
  <h1>Protest Scenario Two: Video</h1>

  <div class="subtitle">
    <p>
      UPDATE UPDATE UPDATE To begin we'd like you to watch a video, originally
      posted on social media, which appears to show a protestor being taken and
      driven away in an unmarked van.
      <strong class="note">
        Please do not participate if you anticipate that this content may cause
        you significant distress.
      </strong>
      This video created lots of discussion on social media, which you will
      later interact with.
    </p>
    <p>
      After watching the video click "next" at the bottom of your screen to be
      taken to the next page.
    </p>
  </div>
  <div class="video">
    <Video
      mp4="/R2-context.mp4"
      webm="/R2-context.webm"
      vtt="/R2-context.vtt" />
  </div>
  <button
    on:click={() => {
      goto('/mock-environment-two/questions');
    }}>
    Next
  </button>
</span>
