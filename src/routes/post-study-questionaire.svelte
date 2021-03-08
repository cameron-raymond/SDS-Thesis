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
      age: undefined
    },
    validationSchema: yup.object().shape({
      age: yup.number().notRequired()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
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
    <label for="age">Age</label>
    <input
      type="number"
      id="age"
      name="age"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.age} />
    {#if $errors.age}
      <small>{$errors.age}</small>
    {/if}

    <p class="subtitle">
      Thank you again for completing our study. Before you are redirected back to
      Prolific and recieve your reward, please answer the following questions.
      You are free to skip any question that you would not like to answer.
    </p>
    <button type="submit">Finish</button>
  </form>
</span>
