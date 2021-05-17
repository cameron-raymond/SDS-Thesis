<script>
  import { FaInfoCircle, FaAngleRight } from "svelte-icons/fa";
  import { IoIosCloseCircleOutline } from "svelte-icons/io";
  export let rumour = "R1";
  export let clickedWarning = false;
  let showModal = false;
</script>

<style>
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(209, 213, 218, 0.4);
    z-index: 1001;
    cursor: pointer;
    /* this is what centers your element in the fixed wrapper*/
    display: flex;
    flex-flow: column nowrap;
    justify-content: center; /* aligns on vertical for column */
    align-items: center; /* aligns on horizontal for column */
  }
  .modal-card {
    width: 600px;
    position: relative;
    cursor: initial;
    /* Just for styling */
    background-color: var(--white);
    padding: 2rem;
    border: 1px solid var(--grey-light);
    border-radius: 8px;
    overflow: hidden;
    min-width: 20rem;
  }
  .credibilityIndicator {
    background-color: var(--red);
    margin: 0.2rem 0.4rem 0.2rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1.2rem;
    padding: 0.1rem 0.4rem;
    font-size: 0.8rem;
    border-radius: 8px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    transition: 0.2s;
  }
  .credibilityIndicator:hover {
    background-color: var(--red-dark);
    transition: 0.2s;
  }
  .icon {
    display: inline-block;
    height: 0.85rem;
    width: 0.85rem;
    margin: 0 0.2rem 0 0;
    cursor: pointer;
  }
  .icon-text {
    margin: 3px;
    padding: 0;
    font-size: smaller;
  }
  .close {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    border-radius: 50%;
    padding: 3px;
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
  .close-button {
    margin: 0 0 0 0;
  }
  @media (hover: hover) {
    .close:hover {
      background-color: rgba(209, 213, 218, 0.2);
      color: var(--orange-dark);
      cursor: pointer;
      transition: 0.2s;
    }
  }
  @media (max-width: 800px) {
    .modal-card {
      width: 85%;
    }
  }
  @media (max-width: 40rem) {
    .modal-card {
      padding: 1rem;
    }
    .credibilityIndicator {
      font-size: 0.7rem;
    }
    .icon-text {
      padding: 1px;
    }
    .close-button {
      margin: 0 0 -0.3rem 0;
      height: 0.7rem;
      width: 0.7rem;
    }
  }
</style>

<div
  class="credibilityIndicator"
  on:click={() => {
    clickedWarning = true;
    showModal = true;
  }}>
  <span class="icon">
    <FaInfoCircle />
  </span>
  <div>Others nearby disagree</div>
  <!-- Want the margin on the other side for the open arrow -->
  <span class="icon" style="margin: 0 0 0 0.1rem;">
    <FaAngleRight />
  </span>
</div>

{#if showModal}
  <div
    class="modal"
    on:click={() => {
      showModal = false;
    }}>
    <div class="modal-card" on:click|stopPropagation={() => {}}>
      {#if rumour === 'R1'}
        <p>UPDATE</p>
        <ul>
          <li>UPDATE</li>
          <li>UPDATE</li>
        </ul>
        <p>Please stay safe and think before you reshare.</p>
      {:else}
        <p>
          Others nearby have recently disputed this claim. Please be careful
          with what you share as it is easy to misinterpret events. Rather than
          using contact tracing apps to track protestors, others have said that:
        </p>
        <ul>
          <li>
            This was a poorly worded metaphor by law enforcment and is not to be
            taken literally.
          </li>
          <li>
            Law enforcment do not have access to data from contact tracing apps.
          </li>
        </ul>
        <p>Please stay safe and think before you reshare.</p>
      {/if}
      <span
        class="close"
        on:click={() => {
          showModal = false;
        }}>
        <span class="icon close-button">
          <IoIosCloseCircleOutline />
        </span>
        <p class="icon-text">Close</p>
      </span>
    </div>
  </div>
{/if}
