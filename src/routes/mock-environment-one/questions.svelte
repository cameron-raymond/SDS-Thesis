<script>
  import { prefetch } from "@sapper/app";
  import { createForm } from "svelte-forms-lib";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      attentionCheck: [],
      awareR1: undefined
    },
    validationSchema: yup.object().shape({
      attentionCheck: yup
        .array()
        .max(1, "You can only select one option.")
        .notRequired(),
      awareR1: yup.mixed().notRequired()
    }),
    onSubmit: values => {
      const timeSubmitted = new Date().toISOString();
      let toSubmit = {
        PROLIFIC_PID: $PROLIFIC_PID,
        SESSION_ID: $SESSION_ID,
        STUDY_ID: $STUDY_ID,
        timeSubmitted: timeSubmitted,
        ...values
      };
      toSubmit["attentionCheck"] =
        toSubmit["attentionCheck"].length == 1
          ? toSubmit["attentionCheck"][0]
          : "DNA";

      const url = "/.netlify/functions/azure?collection=rumour-one-check";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(toSubmit),
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(err => {
        console.log("POST error", err.message);
      });
      goto("/mock-environment-one/env");
    }
  });
</script>

<style>
  button {
    display: flex;
    align-self: center;
    text-decoration: none;
    margin-top: 1.25rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<span class="container">
  <p class="subtitle">
    Please answer these questions before clicking "Next" at the bottom your
    screen and continuing to the next page.
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="attentionCheck">
      What did the video in the previous screen depict? Please select
      <strong>one option.</strong>
    </label>
    <span class="multiselect">
      <label>
        <input type="checkbox" bind:group={$form.attentionCheck} value="fail" />
        A protestor climbing a government building.
      </label>
      <label>
        <input type="checkbox" bind:group={$form.attentionCheck} value="pass" />
        A protestor being taken and driven away in an unmarked van.
      </label>
    </span>
    {#if $errors.attentionCheck}
      <small>{$errors.attentionCheck}</small>
    {/if}

    <label for="awareR1">
      Have you ever seen this video before, or been aware of its existence?
    </label>
    <select
      id="awareR1"
      name="awareR1"
      on:blur={handleChange}
      bind:value={$form.awareR1}>
      <option />
      <option value={true}>Yes</option>
      <option value={false}>No</option>
      <option value='unsure'>Not sure</option>

    </select>
    {#if $errors.awareR1}
      <small>{$errors.awareR1}</small>
    {/if}
    <button
      on:mouseover={() => prefetch(`/mock-environment-one/env`)}
      type="submit">
      Next
    </button>
  </form>
</span>
