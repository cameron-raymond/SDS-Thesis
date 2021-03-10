<script>
  import { createForm } from "svelte-forms-lib";
  import {
    PROLIFIC_PID,
    SESSION_ID,
    STUDY_ID,
    startTime
  } from "../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      awareR1: undefined,
      awareR2: undefined,
      notice: "",
      comments: ""
    },
    validationSchema: yup.object().shape({
      awareR1: yup.mixed().notRequired(),
      awareR2: yup.mixed().notRequired(),
      notice: yup.string().notRequired(),
      comments: yup.string().notRequired()
    }),
    onSubmit: values => {
      console.log(JSON.stringify(values));
      // UPDATE WITH CORRECT COMPLETION CODE
      goto("https://app.prolific.co/submissions/complete?cc=5297E3A5");
    }
  });
</script>

<style>

</style>

<span class="container">
  <h1>Post-study Questionnaire</h1>
  <p class="subtitle">
    Thank you for completing our study. Before you are redirected back to
    Prolific and recieve your reward, please answer the following questions. You
    are free to skip any question that you would not like to answer.
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="awareR1">
      Were you previously aware of the rumour that law enforcement may be using
      contact tracing application to track protestors?
    </label>
    <select
      id="awareR1"
      name="awareR1"
      on:blur={handleChange}
      bind:value={$form.awareR1}>
      <option />
      <option value={true}>Yes</option>
      <option value={false}>No</option>
    </select>
    {#if $errors.awareR1}
      <small>{$errors.awareR1}</small>
    {/if}

    <label for="awareR2">
      Were you previously aware of this other rumour that I'm still deciding on?
    </label>
    <select
      id="awareR2"
      name="awareR2"
      on:blur={handleChange}
      bind:value={$form.awareR2}>
      <option />
      <option value={true}>Yes</option>
      <option value={false}>No</option>
    </select>
    {#if $errors.awareR2}
      <small>{$errors.awareR2}</small>
    {/if}

    <label for="notice">
      Is there anything in particular about the study that you noticed?
    </label>
    <textarea
      id="notice"
      name="notice"
      on:change={handleChange}
      bind:value={$form.notice} />
    {#if $errors.notice}
      <small>{$errors.notice}</small>
    {/if}
    <label for="comments">
      Do you have any final comments that you would like to share?
    </label>
    <textarea
      id="comments"
      name="comments"
      on:change={handleChange}
      bind:value={$form.comments} />
    {#if $errors.comments}
      <small>{$errors.comments}</small>
    {/if}

    <p class="subtitle">
      Thank you again for completing our study. If you are finished, please
      click the button below to be redirected back to Prolific.
    </p>
    <button type="submit">Finish</button>
  </form>
</span>
