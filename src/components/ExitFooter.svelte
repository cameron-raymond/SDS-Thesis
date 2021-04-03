<script>
  import { consent, condition } from "../stores/local-store";
  const message = `Are you sure you want to withdraw consent and leave this study? \nIn doing so we will remove any data associated with your Prolific ID that is not stored locally.`;
  const finish = () => {
    if (confirm(message)) {
      consent.set(0);
      //   DELETE DATA AND REDIRECT
    }
  };
</script>

<style>
  button {
    position: fixed;
    bottom: 3em;
    right: 3em;
    background-color: var(--red);
    font-size: 11px;
    padding: 4px 8px;
    z-index: 1001;
  }
  button:hover:not(:disabled) {
    background-color: var(--red-dark);
  }
  h4 {
    position: fixed;
    bottom: 3em;
    left: 3em;
    z-index: 1001;
  }
</style>

<button on:click={finish}>Withdraw</button>
<h4>
  <input bind:value={$condition} />
</h4>
