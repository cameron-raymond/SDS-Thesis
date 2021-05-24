<script>
  import { prefetch } from "@sapper/app";
  import { createForm } from "svelte-forms-lib";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      attentionCheck: [],
      awareR2: undefined
    },
    validationSchema: yup.object().shape({
      attentionCheck: yup
        .array()
        .max(1, "You can only select one option.")
        .notRequired(),
      awareR2: yup.mixed().notRequired()
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

      const url = "/.netlify/functions/azure?collection=rumour-two-check";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(toSubmit),
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(err => {
        console.log("POST error", err.message);
      });
      goto("/mock-environment-two/env");
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
      What did the video in the previous screen depict? Please select one
      option.
    </label>
    <span class="multiselect">
      <label>
        <input type="checkbox" bind:group={$form.attentionCheck} value="pass" />
        An official discussing arrests made after a protest.
      </label>
      <label>
        <input type="checkbox" bind:group={$form.attentionCheck} value="fail" />
        An official discussing calls to defund the police.
      </label>
    </span>
    {#if $errors.attentionCheck}
      <small>{$errors.attentionCheck}</small>
    {/if}
    <label for="awareR2">
      Have you ever seen this video before, or been aware of its existence?
    </label>
    <select
      id="awareR2"
      name="awareR2"
      on:blur={handleChange}
      bind:value={$form.awareR2}>
      <option />
      <option value={true}>Yes</option>
      <option value={false}>No</option>
      <option value="unsure">Not sure</option>
    </select>
    {#if $errors.awareR2}
      <small>{$errors.awareR2}</small>
    {/if}
    <button
      on:mouseover={() => prefetch(`/mock-environment-two/env`)}
      type="submit">
      Next
    </button>
  </form>
</span>
