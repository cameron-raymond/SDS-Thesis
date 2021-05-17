<script>
  import FaRetweet from "svelte-icons/fa/FaRetweet.svelte";
  export let post;
  export let warning;
  export let reshared = false;
  export let clickedWarning = false;
  export let rumour = "R1";
</script>

<style>
  .profilePic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--grey-light);
    margin-right: 1.5rem;
  }
  .userinfo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .subtitle {
    padding: 0px 1.5rem 0rem 1rem;
  }
  .profilePic img {
    width: 50px;
    height: auto;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    width: 600px;
    border: 1px solid var(--grey-light);
    border-radius: 8px;
    transition: 0.3s;
    overflow: hidden;
  }
  .content {
    text-align: left;
    padding: 0 1.5rem 0 1.5rem;
  }
  .head {
    display: flex;
    align-self: stretch;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(238, 238, 238, 0.5);
    height: 4.6rem;
    padding: 0.3rem 1.5rem 0.1rem 1.5rem;
  }
  .username {
    text-decoration: underline;
    text-decoration-color: rgb(255, 62, 0);
  }
  .foot {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    padding: 0px 1.5rem 0.5rem 1rem;
  }
  .foot span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    border-radius: 50%;
    padding: 3px;
  }
  @media (hover: hover) {
    .foot span:hover {
      background-color: rgba(209, 213, 218, 0.2);
      color: var(--orange-dark);
      cursor: pointer;
      transition: 0.2s;
    }
  }
  .icon-text {
    margin: 0;
    padding: 0;
    font-size: smaller;
  }
  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .reshared {
    color: var(--orange);
  }

  @media (max-width: 800px) {
    .subtitle {
      padding: 0px 1.5rem 0px 0.5rem;
    }
    .card {
      width: 100%;
      align-self: center;
      border-radius: 0;
      margin: 0rem;
      border: none;
      padding-bottom: 1rem;
      box-shadow: 0 0 0 0;
    }
    .foot {
      height: 1rem;
    }
    .content {
      height: initial;
    }
  }
  @media (max-width: 30rem) {
    .icon {
      height: 1rem;
      width: 1rem;
    }
    .userinfo {
      margin-left: 0.5rem;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .subtitle {
      margin: 0;
      padding: 0;
    }
    .profilePic {
      margin-right: 0;
    }
  }
</style>

<div class="card">
  <div class="head">
    <div class="profilePic">
      <img src={post.profileImage} alt="Profile" />
    </div>
    <span class="userinfo">
      <strong>{post.name}</strong>
      <p class="subtitle">
        <span class="username">@{post.username}</span>
        - {post.timestamp}m ago
      </p>
    </span>
  </div>

  <p class="content">
    {@html post.text}
  </p>

  <span class="foot">
    {#if warning}
      <svelte:component this={warning} {rumour}  bind:clickedWarning />
    {:else}
      <div />
    {/if}
    <span
      on:click={() => {
        reshared = !reshared;
      }}
      class:reshared>
      <div class="icon">
        <FaRetweet class="icon" />
      </div>
      {#if !reshared}
        <p class="icon-text">Reshare</p>
      {:else}
        <p class="icon-text">Unshare</p>
      {/if}
    </span>
  </span>
</div>
