<script>
  import { createForm } from "svelte-forms-lib";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";
  var localProlificPID = -1;
  var localSessionID = -1;
  var localStudyID = -1;

  // Make sure we're running on the client
  if (process.browser) {
    PROLIFIC_PID.useLocalStorage();
    SESSION_ID.useLocalStorage();
    STUDY_ID.useLocalStorage();
    localProlificPID = parseInt(localStorage.getItem("PROLIFIC_PID"));
    localSessionID = parseInt(localStorage.getItem("SESSION_ID"));
    localStudyID = parseInt(localStorage.getItem("STUDY_ID"));
  }

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
      age: 18,
      politicalAffiliation: "None",
      attendsProtests: "",
      num_protests: 0
    },
    validationSchema: yup.object().shape({
      title: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup
        .string()
        .email()
        .notRequired(),
      age: yup
        .number()
        .notRequired()
        .typeError("Please enter your age in years.")
        .max(120, "Are you sure you're over 120 years old?")
        .min(18, "You must be 18 or older to participate in this experiment."),
      politicalAffiliation: yup.string().notRequired(),
      attendsProtests: yup.mixed().notRequired().oneOf(["",true,false])
    }),
    onSubmit: values => {
      let toSubmit = {
        PROLIFIC_PID: localProlificPID,
        SESSION_ID: localSessionID,
        STUDY_ID: localStudyID,
        ...values
      };
      alert(JSON.stringify(toSubmit));
      goto(`/mock_environment`);
    }
  });
</script>

<span class="container">
  <h1>Preliminary Questionnaire</h1>
  <p class="subtitle">
    Before entering the simulation please answer some of these basic questions
    about you and your social media habits. You are free to skip any question
    that you would not like to answer.
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="title">Title</label>
    <select
      id="title"
      name="title"
      on:blur={handleChange}
      bind:value={$form.title}>
      <option />
      <option>Mr.</option>
      <option>Mrs.</option>
      <option>Mx.</option>
    </select>
    {#if $errors.title}
      <small>{$errors.title}</small>
    {/if}

    <label for="name">Name</label>
    <input
      id="name"
      name="name"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.name} />
    {#if $errors.name}
      <small>{$errors.name}</small>
    {/if}

    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.email} />
    {#if $errors.email}
      <small>{$errors.email}</small>
    {/if}
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

    <label for="politicalAffiliation">
      Some people describe political affiliation on a left to right spectrum.
      Please indicate where you believe your political ideology lies on this
      spectrum.
    </label>
    <select
      id="politicalAffiliation"
      name="politicalAffiliation"
      on:blur={handleChange}
      bind:value={$form.politicalAffiliation}>
      <option>None</option>
      <option>Left</option>
      <option>Centre-Left</option>
      <option>Centre</option>
      <option>Centre-Right</option>
      <option>Right</option>
      <option>Other (Please Enter)</option>
    </select>
    {#if $errors.politicalAffiliation}
      <small>{$errors.politicalAffiliation}</small>
    {/if}

    {#if !['Left', 'Centre-Left', 'Centre', 'Centre-Right', 'Right', 'None'].includes($form.politicalAffiliation)}
      <label for="name">
        In a word, how would you describe your political affiliation?
      </label>
      <input
        id="politicalAffiliation"
        name="politicalAffiliation"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.politicalAffiliation} />
      {#if $errors.politicalAffiliation}
        <small>{$errors.politicalAffiliation}</small>
      {/if}
    {/if}

    <label for="attendsProtests">
      Have you attended at protest in the past 2 years?
    </label>
    <select
      id="attendsProtests"
      name="attendsProtests"
      on:blur={handleChange}
      bind:value={$form.attendsProtests}>
      <option />
      <option value={true}>Yes</option>
      <option value={false}>No</option>
    </select>
    {#if $errors.attendsProtests}
      <small>{$errors.attendsProtests}</small>
    {/if}

    <button type="submit">Submit</button>
  </form>
</span>
