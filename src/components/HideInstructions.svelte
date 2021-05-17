<script>
  export let hidden = true;
</script>

<style>
  .controls {
    display: flex;
    margin: 0 1em 0 0;
  }
  button {
    all: revert;
    margin: 0;
    cursor: pointer;
  }
</style>

{#if !hidden}
  <span class="controls">
    <button style="margin: 0 10px; 0 0;" disabled>Show Instructions</button>
    <button
      on:click={() => {
        hidden = true;
      }}>
      Hide Instructions
    </button>
  </span>
  <slot />
{:else}
  <span>
    <button
      on:click={() => {
        hidden = false;
      }}
      style="margin: 0 10px; 0 0;">
      Show Instructions
    </button>
    <button disabled>Hide Instructions</button>
  </span>
{/if}
