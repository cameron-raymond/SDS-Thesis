<script>
  import { consent, PROLIFIC_PID } from "../stores/local-store";
  const message = `Are you sure you want to withdraw consent and leave this study? \nIn doing so we will remove any data associated with your Prolific ID (`+$PROLIFIC_PID+`) that is not stored locally.`;
  const finish = () => {
    if (confirm(message)) {
      consent.set(0);
      const deletePackage = {
        method: "DELETE",
        body: JSON.stringify({ "PROLIFIC_PID": $PROLIFIC_PID }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const par = "/.netlify/functions/participants";
      fetch(par, deletePackage)
        .then(r => r.json())
        .then(r => console.log(r))
        .catch(err => {
          console.log("POST error", err.message);
        });
      const res = "/.netlify/functions/experimental-results";
      fetch(res, deletePackage)
        .then(r => r.json())
        .then(r => console.log(r))
        .catch(err => {
          console.log("POST error", err.message);
        });
      const post = "/.netlify/functions/post-study-responses";
      fetch(post, deletePackage)
        .then(r => r.json())
        .then(r => console.log(r))
        .catch(err => {
          console.log("POST error", err.message);
        });
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