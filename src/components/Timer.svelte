<script>
  import { tweened } from "svelte/motion";
  export let time = 5 * 60; // TYPE NUMBER OF SECONDS HERE
  export let finished = false;
  export let timeLeft = time;

  setInterval(() => {
    if (timeLeft > 0) {
      if (!finished) timeLeft--;
    } else {
      finished = true;
    }
  }, 1000);

  $: minutes = Math.floor(timeLeft / 60);
  $: minname = minutes > 1 ? "minutes" : "minute";
  $: seconds = Math.floor(timeLeft - minutes * 60);
</script>

<style>
  .green {
    color: var(--primary);
  }
  .yellow {
    color: var(--yellow);
  }
  .red {
    color: var(--red);
  }
</style>

<h3>
  Time Left:
  <br/>
  <span
    class={timeLeft > time / 2 ? 'green' : timeLeft > time / 3 ? 'yellow' : 'red'}>
    {#if minutes > 0}
      <span>{minutes}</span>min
      
    {/if}
    {#if seconds >= 0}
      <span>{seconds}</span>s
    {/if}
  </span>
</h3>
