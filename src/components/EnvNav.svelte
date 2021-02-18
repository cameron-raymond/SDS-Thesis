<script>
  import Timer from "./Timer.svelte";
  export let time;
  export let timeLeft;
  export let started = false;
  export let finished = false;
  const start = () => {
    started = true;
    console.log("hi");
  };
  const finish = () => {
    if (confirm("Are you sure you want to finish?")) {
      finished = true;
    }
  };
</script>

<style>
  .controls {
    display: flex;
  }
  .margin {
    margin-right: 10px;
  }
  .header {
    position: fixed;
    top: 0em;
    left: 0em;
    width: calc(100vw - 4em);
    padding: 2em;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background-color: white;
    border-bottom: 1px solid var(--grey-light);
  }
  .buffer {
    height: 100px;
  }
  @media (max-width: 40rem) {
	button {
		font-size: 11px;
		padding: 4px 8px;
	}
}

</style>

<div class="buffer">
  <span class="header">
    <span class="controls">
      {#if !started}
        <button class="margin" on:click={start}>Start</button>
        <button disabled>I'm Done</button>
      {:else if !finished}
        <button class="margin" disabled>Start</button>
        <button on:click={finish}>I'm Done</button>
      {:else}
        <button class="margin" disabled>Start</button>
        <button disabled>I'm Done</button>
      {/if}
    </span>

    {#if started}
      <Timer {time} bind:finished bind:timeLeft/>
    {/if}
  </span>
</div>
