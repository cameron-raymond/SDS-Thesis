<script>
  export let post;
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
  .subtitle {
    padding: 0px 1.5rem 0px 1rem;
  }

  .foot span {
    display: flex;
    flex-wrap: wrap;
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
    p {
      height: initial;
    }
  }
  @media (max-width: 30rem) {
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

  <p>
    {@html post.text}
  </p>

  <!-- WARNING GOES HERE -->
  <span />
</div>
