<script>
  export let post;
</script>

<style>
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--grey-light);
    margin-right: 1.5rem;
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
  p {
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
    text-align: right;
  }
  .head .title {
    text-align: right;
    font-size: 0.7rem;
  }
  .head h4 {
    font-size: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
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
    height: 2rem;
    padding: 0 0.5rem 0 1.5rem;
    width: calc(600px + 4em);
  }
  .foot span {
    display: flex;
    flex-wrap: wrap;
  }
  @media (max-width: 800px) {
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
    p {
      height: initial;
    }
  }
</style>

<div class="card">
  <div class="head">
    <img src={post.profileImage} alt="Profile" />
    <strong>
      {post.name}
    </strong>
    <p class="subtitle">
      <span class="username">@{post.username}</span>
      -
      {post.timestamp}m ago
    </p>
  </div>

  <p>
    {@html post.text}
  </p>

  <!-- WARNING GOES HERE -->
  <span />
</div>
