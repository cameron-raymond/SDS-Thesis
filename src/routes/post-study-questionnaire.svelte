<script>
  import { createForm } from "svelte-forms-lib";
  import {
    PROLIFIC_PID,
    SESSION_ID,
    STUDY_ID,
    condition
  } from "../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  let submitted = false;
  let prolificReturnURl =
    "https://app.prolific.co/submissions/complete?cc=2FB2397B";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      veracityR1: undefined,
      veracityR2: undefined,
      decisionProcess: "",
      interventionFactor: $condition === "treatment" ? "" : "control",
      issues: "",
      comments: ""
    },
    validationSchema: yup.object().shape({
      veracityR1: yup
        .number()
        .notRequired()
        .nullable(true)
        .typeError("Please enter a number from 1 to 10.")
        .transform((v, o) => (o === "" ? null : v))
        .max(10, "You can't input a number higher than 10.")
        .min(1, "You can't input a number less than 1."),
      veracityR2: yup
        .number()
        .notRequired()
        .nullable(true)
        .transform((v, o) => (o === "" ? null : v))
        .typeError("Please enter a number from 1 to 10.")
        .max(10, "You can't input a number higher than 10.")
        .min(1, "You can't input a number less than 1."),
      decisionProcess: yup.string().notRequired(),
      comments: yup.string().notRequired()
    }),
    onSubmit: values => {
      submitted = true;
      const timeSubmitted = new Date().toISOString();
      let toSubmit = {
        PROLIFIC_PID: $PROLIFIC_PID,
        SESSION_ID: $SESSION_ID,
        STUDY_ID: $STUDY_ID,
        timeSubmitted: timeSubmitted,
        ...values
      };
      const url = "/.netlify/functions/azure?collection=post-study-responses";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(toSubmit),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          goto(prolificReturnURl);
        })
        .catch(err => {
          console.log("POST error", err.message);
        });
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
  <h1>Post-study Questionnaire</h1>
  {#if submitted}
    <p class="subtitle">
      Thank you for completing our study. You will automatically be re-directed
      back to Prolific to collect your reward.
      <strong>
        If that does not happen click on this link:
        <a href={prolificReturnURl}>Prolific,</a>
        to be redirected to Prolific.
      </strong>
      Without returning to Prolific you will not be able to collect your reward.
    </p>
  {:else}
    <p class="subtitle">
      Thank you for completing our study. Before you are redirected back to
      Prolific and receive your reward, please answer the following questions.
      You are free to skip any question that you would not like to answer.
    </p>
    <form on:submit|preventDefault={handleSubmit}>

      <label for="veracityR1">
        On a scale from 1-10, where 1 is definitely false and 10 is definitely
        true, how likely do you think it is that Federal agents were kidnapping
        protestors?
      </label>
      <input
        type="number"
        id="veracityR1"
        name="veracityR1"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.veracityR1} />
      {#if $errors.veracityR1}
        <small>{$errors.veracityR1}</small>
      {/if}

      <label for="veracityR2">
        On a scale from 1-10, where 1 is definitely false and 10 is definitely
        true, how likely do you think it is that law enforcement were using
        contact tracing technology to track protestors?
      </label>
      <input
        type="number"
        id="veracityR2"
        name="veracityR2"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.veracityR2} />
      {#if $errors.veracityR2}
        <small>{$errors.veracityR2}</small>
      {/if}

      <label for="decisionProcess">
        How did you decide which, if any, posts to reshare?
      </label>
      <textarea
        id="decisionProcess"
        name="decisionProcess"
        on:change={handleChange}
        bind:value={$form.decisionProcess} />
      {#if $errors.decisionProcess}
        <small>{$errors.decisionProcess}</small>
      {/if}

      {#if $condition === 'treatment'}
        <label for="interventionFactor">
          How did the “others nearby disagree” tag factor into your decisions to
          reshare or not?
        </label>
        <textarea
          id="interventionFactor"
          name="interventionFactor"
          on:change={handleChange}
          bind:value={$form.interventionFactor} />
        {#if $errors.interventionFactor}
          <small>{$errors.interventionFactor}</small>
        {/if}
      {/if}

      <label for="issues">
        Did you encounter any issues completing the task?
      </label>
      <textarea
        id="issues"
        name="issues"
        on:change={handleChange}
        bind:value={$form.issues} />
      {#if $errors.issues}
        <small>{$errors.issues}</small>
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
        Thank you again for completing our study. Again, if you have any
        questions about this research, do not hesitate to contact Cameron
        Raymond at
        <a href="mailto:cameron.raymond@oii.ox.ac.uk" target="_blank">
          cameron.raymond@oii.ox.ac.uk.
        </a>
        If you have any questions about your rights or treatment as a
        participant in this research project, please contact the Oxford Internet
        Institute's Departmental Research Ethics Committee (DREC) at
        <a href="mailto:drec@oii.ox.ac.uk" target="_blank">
          drec@oii.ox.ac.uk.
        </a>
        If you are finished, please click the button below to be redirected back
        to Prolific.
      </p>
      <button type="submit">Finish</button>
    </form>
  {/if}
</span>
