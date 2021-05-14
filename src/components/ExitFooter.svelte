<script>
  import { consent, PROLIFIC_PID } from "../stores/local-store";
  const message =
    `Are you sure you want to withdraw consent and leave this study? \nIn doing so we will remove any data associated with your Prolific ID (` +
    $PROLIFIC_PID +
    `) that is not stored locally.`;
  const finish = async () => {
    if (confirm(message)) {
      consent.set(0);
      const deletePackage = {
        method: "DELETE",
        body: JSON.stringify({ PROLIFIC_PID: $PROLIFIC_PID }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const collections = [
        "participants",
        "rumour-one-check",
        "rumour-one-results",
        "rumour-two-check",
        "rumour-two-results",
        "post-study-responses"
      ];
      for (const collection of collections) {
        const url = "/.netlify/functions/azure?collection=" + collection;
        fetch(url, deletePackage).catch(err => {
          console.log(url);
          console.log("DELETE error", err.message);
        });
      }
    }
  };
</script>

<style>
  button {
    position: fixed;
    bottom: 3em;
    right: 3em;
    background-color: var(--red);
    padding: 4px 8px;
    z-index: 1001;
  }
  button:hover:not(:disabled) {
    background-color: var(--red-dark);
  }
</style>

<button on:click={finish}>Withdraw</button>
