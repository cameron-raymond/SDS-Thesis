<script>
  import { createForm } from "svelte-forms-lib";
  import Select from "svelte-select";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../stores/local-store";
  import { goto } from "@sapper/app";
  import * as yup from "yup";

  var localProlificPID = -1;
  var localSessionID = -1;
  var localStudyID = -1;
  var typedGender = "";
  var typedPolAffiliation = "";
  var typedAffiliatedMovements = "";

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
      age: undefined,
      gender: [],
      educationLevel: "",
      politicalAffiliation: undefined,
      attendsProtests: "",
      affiliatedMovements: []
    },
    validationSchema: yup.object().shape({
      age: yup
        .number()
        .notRequired()
        .nullable(true)
        .transform((v, o) => (o === "" ? null : v))
        .typeError("Please enter your age in years.")
        .max(120, "Are you sure you're over 120 years old?")
        .min(18, "You must be 18 or older to participate in this experiment."),
      gender: yup.mixed().notRequired(),
      educationLevel: yup.string().notRequired(),
      politicalAffiliation: yup.string().notRequired(),
      attendsProtests: yup
        .mixed()
        .notRequired(),
      affiliatedMovements: yup.mixed().notRequired()
    }),
    onSubmit: values => {
      // If the user typed in their own gender we will add that to the list and remove the "typedInput" value
      if ($form.gender.includes("typedInput")) {
        // If the user didn't actually type anything just keep the list as is
        $form.gender =
          typedGender === "" ? $form.gender : [typedGender, ...$form.gender];
        // Remove the typedInput button
        $form.gender = $form.gender.filter(e => e !== "typedInput");
      }
      if ($form.politicalAffiliation === "typedInput") {
        $form.politicalAffiliation = typedPolAffiliation;
      }
      // Same for the affiliated movements Q
      if ($form.affiliatedMovements.includes("typedInput")) {
        // If the user didn't actually type anything just keep the list as is
        $form.affiliatedMovements =
          typedAffiliatedMovements === ""
            ? $form.affiliatedMovements
            : [typedAffiliatedMovements, ...$form.affiliatedMovements];
        // Remove the typedInput button
        $form.affiliatedMovements = $form.affiliatedMovements.filter(
          e => e !== "typedInput"
        );
      }

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

<style>

</style>

<span class="container">
  <h1>Preliminary Questionnaire</h1>
  <p class="subtitle">
    Before entering the simulation please answer some of these basic questions
    about you and your social media habits. You are free to skip any question
    that you would not like to answer.
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

    <label for="gender">How would you describe your gender?</label>
    <span class="multiselect">
      <label>
        <input type="checkbox" bind:group={$form.gender} value="female" />
        Female
      </label>
      <label>
        <input type="checkbox" bind:group={$form.gender} value="intersex" />
        Intersex
      </label>
      <label>
        <input type="checkbox" bind:group={$form.gender} value="male" />
        Male
      </label>
      <label>
        <input type="checkbox" bind:group={$form.gender} value="nonBinary" />
        Non-binary
      </label>
      <label>
        <input type="checkbox" bind:group={$form.gender} value="transgender" />
        Transgender
      </label>
      <label>
        <input type="checkbox" bind:group={$form.gender} value="typedInput" />
        Let me type... (not listed)
      </label>
    </span>
    {#if $errors.gender}
      <small>{$errors.gender}</small>
    {/if}

    {#if $form.gender.includes('typedInput')}
      <label for="name">
        In addition to whatever you may have selected, how would you describe
        your gender?
      </label>
      <input id="gender" name="gender" bind:value={typedGender} />
    {/if}

    <label for="educationLevel">
      Which of these is the highest level of education you have completed?
    </label>
    <select
      id="educationLevel"
      name="educationLevel"
      on:blur={handleChange}
      bind:value={$form.educationLevel}>
      <option />
      <option value="none">No formal qualifications</option>
      <option value="secondary">Secondary education (e.g. GED/GCSE)</option>
      <option value="highSchool">High school diploma/A-levels</option>
      <option value="communityCollege">Technical/community college</option>
      <option value="undergrad">Undergraduate degree (BA/BSc/other)</option>
      <option value="graduateSchool">
        Graduate degree (MA/MSc/MPhil/other)
      </option>
      <option value="doctorate">Doctorate degree (PhD/other)</option>
      <option value="NA">Don't know / not applicable</option>
    </select>
    {#if $errors.educationLevel}
      <small>{$errors.educationLevel}</small>
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
      <option />
      <option value="left">Left</option>
      <option value="centreLeft">Centre-left</option>
      <option value="centre">Centre</option>
      <option value="centreRight">Centre-right</option>
      <option value="right">Right</option>
      <option value="none">None</option>
      <option value="typedInput">Let me type... (not listed)</option>
    </select>
    {#if $errors.politicalAffiliation}
      <small>{$errors.politicalAffiliation}</small>
    {/if}

    {#if $form.politicalAffiliation === 'typedInput'}
      <label for="name">
        In a word, how would you describe your political affiliation?
      </label>
      <input
        id="politicalAffiliation"
        name="politicalAffiliation"
        bind:value={typedPolAffiliation} />
      {#if $errors.politicalAffiliation}
        <small>{$errors.politicalAffiliation}</small>
      {/if}
    {/if}

    <label for="attendsProtests">
      Have you attended a protest in the past 2 years?
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

    <label for="affiliatedMovements">
      Select the social movements that you would or have protested in support
      of:
    </label>
    <span class="multiselect">
      <label>
        <input
          type="checkbox"
          bind:group={$form.affiliatedMovements}
          value="Movement A" />
        Movement A
      </label>
      <label>
        <input
          type="checkbox"
          bind:group={$form.affiliatedMovements}
          value="Movement B" />
        Movement B
      </label>
      <label>
        <input
          type="checkbox"
          bind:group={$form.affiliatedMovements}
          value="Movement C" />
        Movement C
      </label>
      <label>
        <input
          type="checkbox"
          bind:group={$form.affiliatedMovements}
          value="None" />
        None
      </label>
      <label>
        <input
          type="checkbox"
          bind:group={$form.affiliatedMovements}
          value="typedInput" />
        Let me type... (not listed)
      </label>
    </span>
    {#if $errors.affiliatedMovements}
      <small>{$errors.affiliatedMovements}</small>
    {/if}

    {#if $form.affiliatedMovements.includes('typedInput')}
      <label for="name">
        In addition to whatever you may have selected, what other social
        movements would or have you protested in support of?
      </label>
      <input
        id="affiliatedMovements"
        name="affiliatedMovements"
        bind:value={typedAffiliatedMovements} />
    {/if}

    <button type="submit">Submit</button>
  </form>
</span>
