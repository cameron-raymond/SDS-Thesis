<script>
  import { stores } from "@sapper/app";
  import { onMount, onDestroy } from "svelte";
  import { PROLIFIC_PID, SESSION_ID, STUDY_ID } from "../stores/local-store";
  const { page } = stores();
  const valid_params =
    "PROLIFIC_PID" in $page.query &&
    "SESSION_ID" in $page.query &&
    "STUDY_ID" in $page.query;

  if (valid_params) {
    PROLIFIC_PID.set(parseInt($page.query.PROLIFIC_PID));
    SESSION_ID.set(parseInt($page.query.SESSION_ID));
    STUDY_ID.set(parseInt($page.query.STUDY_ID));
  }
</script>

<style>
  .button {
    display: flex;
    align-self: center;
    text-decoration: none;
    max-width: 4rem;
  }
</style>

<span class="container">
  <h1>We need your consent to proceed</h1>
  {#if !valid_params}
    <small>
      Did you come to this study from
      <a href="https://app.prolific.co/">Prolific</a>
      ? We had trouble getting your Prolific ID (it should be appended to the
      URL in the form
      <code>/?PROLIFIC_PID=YOUR_ID</code>
      ). Without this we have no means of ensuring you are paid for your time.
    </small>
  {/if}
  <p>
    This research is being conducted by Cameron Raymond, an MSc student at the
    University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss
    Wright, faculty members at the the University of the Arts London and the
    University of Oxford respectively - and in collaboration with Dr. Emma Spiro
    a faculty member at the University of Washington.
  </p>

  <p>
    This study takes approximately 10 minutes. If you agree to take part in the
    research, you will complete a study that involves answering a short survey,
    and interacting with a mock social media environment that simulates an
    ongoing protest. All of the information we obtain during the research will
    be kept confidential, and not associated with your name or social media
    accounts in any way, however, while the study is running it will be
    associated with your Prolific participant ID. We will publically release the
    data from this experiment, with Prolific IDs removed. Your participation in
    this research is voluntary. You are free to refuse to take part, and you may
    stop taking part at any time. You are free to discontinue participation in
    this study at any time with no penalty. If you have any questions about this
    research, do not hesitate to contact Cameron Raymond at
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
  <a href="/preliminary-questions" class="button">
    <button>Begin</button>
  </a>
</span>
