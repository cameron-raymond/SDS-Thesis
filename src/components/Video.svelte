<script>
  import { Player, Video, DefaultUi } from "@vime/svelte";
  export let mp4;
  export let webm;
  export let vtt;
</script>

<Player theme="dark" loop=false >
  <Video crossOrigin>
    <source src={webm} type='video/webm' />
    <source src={mp4} type='video/mp4' /> 

    <track
      default
      kind="subtitles"
      src={vtt}
      srclang="en"
      label="English" />
  </Video>
  <DefaultUi />
</Player>
