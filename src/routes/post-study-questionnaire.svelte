<script>
  import { createForm } from "svelte-forms-lib";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  let submitted = false;
  let prolificReturnURl =
    "https://app.prolific.co/submissions/complete?cc=2FB2397B";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      awareR1: undefined,
      awareR2: undefined,
      veracityR1: undefined,
      veracityR2: undefined,
      notice: "",
      comments: ""
    },
    validationSchema: yup.object().shape({
      awareR1: yup.mixed().notRequired(),
      awareR2: yup.mixed().notRequired(),
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
      notice: yup.string().notRequired(),
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
      Prolific and recieve your reward, please answer the following questions.
      You are free to skip any question that you would not like to answer.
    </p>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="awareR1">
        Were you previously aware of the rumour that federal agents were
        kidnapping protestors?
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
        Were you previously aware of the rumour that law enforcement may be
        using contact tracing technology to track protestors?
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

      <label for="veracityR1">
        On a scale from 1-10, where 1 is completely false and 10 is completely
        true, how "true" do you think it is that Federal agents were kidnapping
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
        On a scale from 1-10, where 1 is completely false and 10 is completely
        true, how "true" do you think it is that law enforcement were using
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
