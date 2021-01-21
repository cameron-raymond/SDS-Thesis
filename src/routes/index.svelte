<script>
  function handleClick() {
    alert("clicked");
  }
</script>

<style>
  span {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }

  .button {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  button {
    max-width: 4rem;
    padding: 0.75rem;
    border: 1px solid #d1d5da;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  .button:hover {
    transform: translatey(-0.2em);
    transition: 0.3s;
    box-shadow: 2px 7px 7px 2px rgba(0, 0, 0, 0.12);
  }
  button a:hover {
    color: initial;
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<span>
  <h1>We need your consent to proceed</h1>

  <p>
    This research is being conducted by Cameron Raymond, an MSc student at the
    University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss
    Wright, faculty members at the the University of the Arts London and the
    University of Oxford respectively - and in collaboration with Dr. Emma Spiro
    a faculty member at the University of Washington.
  </p>

  <p>
    This study takes approximately 10 minutes. If you agree to take part in the
    research, you will complete a study that involves answering a short survey
    about COVID-19 and social media. All of the information we obtain during the
    research will be kept confidential, and not associated with your name in any
    way, however, while the study is running it will be associated with your
    Prolific participant ID. We will publically release the data from this
    experiment, with Prolific IDs removed. Your participation in this research
    is voluntary. You are free to refuse to take part, and you may stop taking
    part at any time. You are free to discontinue participation in this study at
    any time with no penalty. If you have any questions about this research, do
    not hesitate to contact Cameron Raymond at
    <a href="mailto:cameron.raymond@oii.ox.ac.uk" target="_blank">
      cameron.raymond@oii.ox.ac.uk
    </a>
    . If you have any questions about your rights or treatment as a participant
    in this research project, please contact the Oxford Internet Institute's
    Departmental Research Ethics Committee (DREC) at
    <a href="mailto:drec@oii.ox.ac.uk" target="_blank">drec@oii.ox.ac.uk</a>
    . By consenting to participate, you acknowledge that you are 18 years or
    older, have read this consent form, agree to its contents, and agree to take
    part in this research.
  </p>

  <p>
    If you do not wish to consent you may close this page. If you would like to
    participate, press "Begin" now. Please do not access external information
    during the experiment.
  </p>
  <a href="/about" class="button">
    <button>
      <h2>Begin</h2>
    </button>
  </a>
</span>
