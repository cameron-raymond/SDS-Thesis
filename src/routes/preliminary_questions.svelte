<script>
  function handleClick() {
    alert("clicked");
  }
</script>

<style>
  span {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }

  .button {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    max-width: 15rem;
    padding: 0.75rem 0.75rem 0.3rem 0.75rem;
    border: 1px solid #d1d5da;
    text-decoration: none;
    background-color: rgba(238, 238, 238, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  .button:hover {
    transform: translatey(-0.2em);
    transition: 0.3s;
    box-shadow: 2px 7px 7px 2px rgba(0, 0, 0, 0.12);
    color: initial;
  }
</style>

<!-- <svelte:head>
  <title>Sapper project template</title>
</svelte:head> -->

<span>
  <h1>We need your consent to proceed</h1>

  <form name="contact" method="POST" data-netlify="true">
    <p>
      <label>
        Your Name:
        <input type="text" name="name" />
      </label>
    </p>
    <p>
      <label>
        Your Role:
        <select name="role[]" multiple>
          <option value="leader">Leader</option>
          <option value="follower">Follower</option>
        </select>
      </label>
    </p>
    <p>
      <label>
        Message:
        <textarea name="message" />
      </label>
    </p>
    <p>
      <button type="submit">Send</button>
    </p>
  </form>

  <a href="/mock_environment" class="button">
    <h2>Begin Simulation</h2>
  </a>
</span>
